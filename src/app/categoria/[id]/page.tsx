/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Nav from "@/components/Nav/Nav"
import ProductNavbar from "@/components/ProductNavbar/ProductNavbar"
import ShowUp from "@/components/ShowUp/ShowUp"
import { useEffect, useState } from "react"
import { useCart } from "@/context/CartContext"
import LoadingPainel from "@/components/LoadingPainel/LoadingPainel"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function Products({ visivel }: any) {
    const [csrfToken, setCsrfToken] = useState('')
    const [categories, setCategories] = useState([])
    const [currentProduct, setCurrentProduct] = useState(null)
    const [pixData, setPixData] = useState(null)
    const [orderData, setOrderData] = useState(null)
    const [showUpVisible, setShowUpVisible] = useState(false)
    const [showPanel, setShowPanel] = useState(false)
    const { cartItems, removeFromCart } = useCart()

    const params = useParams()

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('http://localhost:3003/categories')
            const data = await response.json()
            
            setCategories(data)
        }

        fetchCategories()
    }, [])

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch('http://localhost:3003/csrf-token', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json()
                setCsrfToken(data.csrfToken)
                if (!response.ok) {
                    throw new Error(`Erro ao buscar CSRF token: ${response.statusText}`)
                }
            } catch (error) {
                console.error('Erro ao buscar CSRF token:', error)
                console.log('Falha ao carregar o formulário. Tente novamente.')
            }
        }
        fetchCsrfToken()
    }, [])

    const handleOpenPanel = () => {
        setShowPanel(true)
        setPixData(null)
    }

    const handleClosePanel = () => {
        setShowPanel(false)
    }

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

    const handleSelectProduct = (product: any) => {
        setTimeout(() => {
            setCurrentProduct(product)
            setShowUpVisible(false)
        }, 0)
    }

    const handleOrder = async () => {
        try {
            
            const orderItems = cartItems.map(item => ({
                productId: item._id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                total: total
            }))
            
            handleOpenPanel()

            try {
                const payResponse = await fetch('http://localhost:3003/gateway/pay', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify({
                        total: cartItems.reduce((acumulador) => acumulador),
                        description: 'Pagamento de Pedido na Loja'
                    })
                })

                if (payResponse.ok) {
                    const orderResponse = await fetch('http://localhost:3003/order/new', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({orderItems})
                    })

                    const data = await orderResponse.json()
                    setOrderData(data)

                if (!payResponse.ok) {
                    const errorData = await payResponse.json()
                    throw new Error(errorData.message || 'Falha ao criar pagamento Pix.')
                }
                
                const pixPaymentData = await payResponse.json()
                
                setPixData(pixPaymentData)
            }
            } catch (err: any) {
                throw new Error(err)
            }
        } catch (err: any) {
            throw new Error(err)
        }}

    const catFilt =  categories.filter((items: any) => !items.parent)

    const subCat = (parentId: any) => categories.filter((cat: any) => cat.parent === parentId)

    return (
        <div className="flex flex-row min-h-[90vh] bg-amber-100 w-screen">
            <ProductNavbar visivel={visivel} setVisivel={setShowUpVisible} />
            <ShowUp
                visivel={showUpVisible}
                setVisivel={setShowUpVisible}
                onSelectProduct={handleSelectProduct}
                categoryId={params.id}
            />
            <Nav visivel={visivel} />
            <div className="flex-1 p-4 pt-[85px]">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Nossas Categorias:</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {
                        catFilt.map((items: any) =>
                        subCat(items._id)
                        .map((subCat: any) => <Link key={subCat._id} href={`http://localhost:3000/categoria/${subCat._id}`} className="bg-white p-6 rounded-xl shadow-lg h-48 flex items-center justify-center">{subCat.nome}</Link>    
                        ))
                    }
                </div>
            </div>
            <div className="flex justify-end pr-4">
                <div className="bg-white h-[78vh] p-4 rounded-xl shadow-2xl w-[300px] mt-[85px] border border-amber-200">
                    <h2 className="text-xl font-bold mb-4 text-amber-600 border-b border-amber-300 pb-2">Seu Pedido</h2>
                    <div className="max-h-64 overflow-y-scroll space-y-3 pr-2">
                        {cartItems.length === 0 ? (
                            <p className="text-gray-500 italic">O carrinho está vazio.</p>
                        ) : (
                            cartItems.map((item: any) => (
                                <div key={item._id} className="flex justify-between items-center text-sm border-b last:border-b-0 pb-1 border-amber-200">
                                    <div className="flex-1 pr-2">
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-gray-600">Qtd: {item.quantity} x R$ {item.price?.toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-600 hover:text-red-800 text-lg"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-amber-300">
                        <div className="flex justify-between font-bold text-lg mb-4">
                            <span>Total:</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleOrder}
                            disabled={cartItems.length === 0}
                            className={`w-full py-2 rounded-lg font-bold text-white transition duration-200 ${
                                cartItems.length > 0
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Finalizar Pedido
                        </button>
                    </div>
                </div>
            </div>
            {showPanel && 
            <LoadingPainel
                onClose={handleClosePanel}
                pixData={pixData}
                orderData={orderData}
            />
            }
        </div>
    )
}