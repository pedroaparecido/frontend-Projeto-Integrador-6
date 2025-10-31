/* eslint-disable @typescript-eslint/no-unused-vars */
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
import toast, { Toaster } from "react-hot-toast"

export default function Categories({ visivel }: any) {
    const [csrfToken, setCsrfToken] = useState('')
    const [categories, setCategories] = useState([])
    const [currentProduct, setCurrentProduct] = useState(null)
    const [pixData, setPixData] = useState(null)
    const [orderData, setOrderData] = useState(null)
    const [showUpVisible, setShowUpVisible] = useState(false)
    const [showPanel, setShowPanel] = useState(false)
    const { cartItems, removeFromCart } = useCart()
    const [isCartVisible, setIsCartVisible] = useState(false)

    const params = useParams()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3003/categories')
                const data = await response.json()
                
                setCategories(data)
            } catch (err) {
                toast.error(`${err}`)
            }
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
                    toast.error(`Erro ao buscar CSRF token: ${response.statusText}`)
                }
            } catch (error) {
                toast.error(`Erro ao buscar CSRF token: ${error}`)
                toast('Falha ao carregar o formulário. Tente novamente.')
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
        // Container principal: Flex-col em telas pequenas, min-h-screen
        <div className="flex flex-col md:flex-row min-h-screen bg-amber-100 w-full">
            <Toaster />
            
            {/* Navbars e Modais */}
            <ProductNavbar visivel={visivel} setVisivel={setShowUpVisible} toggleCart={() => setIsCartVisible(!isCartVisible)} cartCount={cartItems.length} />
            <ShowUp
                visivel={showUpVisible}
                setVisivel={setShowUpVisible}
                onSelectProduct={handleSelectProduct}
                categoryId={params.id}
            />
            {/* Assumindo que Nav é a navegação lateral que pode ser oculta em mobile */}
            <Nav visivel={visivel} /> 

            {/* Conteúdo Principal (Ocupa o espaço restante) */}
            <div className={`flex-1 p-4 md:p-8 pt-[85px] md:pt-[85px] ${isCartVisible ? 'pb-24' : 'pb-4'}`}> {/* Padding bottom extra para o carrinho mobile */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Nossas Categorias:</h1>
                
                {/* Grid de Categorias: Mais colunas em telas maiores */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {
                        catFilt.map((items: any) =>
                        subCat(items._id)
                        .map((subCat: any) => (
                            <Link 
                                key={subCat._id} 
                                href={`http://localhost:3000/categoria/${subCat._id}`} 
                                className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 
                                           flex flex-col items-center justify-center text-center h-24 sm:h-36 font-semibold text-gray-700 hover:bg-amber-200"
                            >
                                {subCat.nome}
                            </Link>
                        ))
                        )
                    }
                </div>
            </div>

            {/* BARRA LATERAL DO CARRINHO (WIDGET) */}
            
            {/* 1. Carrinho para Desktop/Tablet (Sidebar) */}
            <div className="hidden md:flex justify-end p-4 md:pt-[85px] md:pr-4">
                <div className="bg-white sticky top-[85px] h-[calc(100vh-100px)] p-4 rounded-xl shadow-2xl w-[300px] border border-amber-200 flex flex-col">
                    <h2 className="text-xl font-bold mb-4 text-amber-600 border-b border-amber-300 pb-2">Seu Pedido</h2>
                    
                    {/* Lista de Itens (Altura ajustada) */}
                    <div className="flex-1 overflow-y-scroll space-y-3 pr-2">
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
                                        className="text-red-600 hover:text-red-800 text-lg p-1"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    
                    {/* Total e Botão Finalizar */}
                    <div className="mt-4 pt-4 border-t border-amber-300 flex-shrink-0">
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

            {/* 2. Carrinho para Mobile (Flutuante na Base) */}
            <div 
                className={`fixed inset-x-0 bottom-0 z-40 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
                    isCartVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
            >
                <div className="p-4 flex flex-col h-[70vh] rounded-t-xl border-t-4 border-amber-400">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-amber-600">Seu Pedido</h2>
                        <button onClick={() => setIsCartVisible(false)} className="text-gray-600 hover:text-gray-800 text-3xl font-light">
                            &times;
                        </button>
                    </div>
                    
                    {/* Lista de Itens (Ocupa o espaço central) */}
                    <div className="flex-1 overflow-y-scroll space-y-3 pr-2 border-b border-amber-200 pb-4">
                        {cartItems.length === 0 ? (
                            <p className="text-gray-500 italic text-center pt-8">O carrinho está vazio.</p>
                        ) : (
                            cartItems.map((item: any) => (
                                <div key={item._id} className="flex justify-between items-center text-sm border-b last:border-b-0 pb-1 border-amber-200">
                                    <div className="flex-1 pr-2">
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-gray-600">Qtd: {item.quantity} x R$ {item.price?.toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-600 hover:text-red-800 text-lg p-1"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Total e Botão Finalizar (Fixo na parte inferior) */}
                    <div className="mt-4 pt-4 flex-shrink-0">
                        <div className="flex justify-between font-bold text-lg mb-4">
                            <span>Total:</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleOrder}
                            disabled={cartItems.length === 0}
                            className={`w-full py-3 rounded-lg font-bold text-white transition duration-200 ${
                                cartItems.length > 0
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Finalizar Pedido
                        </button>
                    </div>
                </div>
                {/* Overlay de fundo (opcional, se você quiser fechar clicando fora) */}
                {isCartVisible && <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setIsCartVisible(false)}></div>}
            </div>

            {/* Modal de Loading/Pix */}
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