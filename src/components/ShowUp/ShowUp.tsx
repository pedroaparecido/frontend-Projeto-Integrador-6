/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, SetStateAction } from 'react'
import CardProduct from "../CardProduct/CardProduct"
import { useCart } from "@/context/CartContext"

export default function ShowUp({ categoryId, visivel, setVisivel, onSelectProduct }: any) {
    const { addToCart } = useCart()
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (!categoryId) {
            setProducts([]) 
            console.log('ShowUp: categoryId não disponível, pulando busca.')
            return 
        }

        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3003/product/categoryId/${categoryId}`)
                
                if (response.ok) {
                    const data: any = await response.json()
                    if (Array.isArray(data)) {
                        setProducts(data as SetStateAction<never[]>)
                    } else {
                        console.warn('API retornou um dado não-array. Retornando array vazio.')
                        setProducts([])
                    }

                } else {
                    console.error('Falha ao buscar produtos:', response.statusText)
                    setProducts([])
                }
            } catch (error) {
                console.error('Erro de rede ao buscar produtos:', error)
                setProducts([])
            }
        }
        
        fetchProducts()
    }, [categoryId]) 

    const isLoading = products.length === 0 && categoryId

    if (!visivel) return null

    return (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex justify-center items-center">
            <div className="relative w-[80%] max-w-[900px] h-[85vh] bg-white rounded-xl shadow-2xl p-6 flex flex-col">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-800">Busca Rápida de Produtos</h2>
                    <button 
                        onClick={() => setVisivel(false)}
                        className="p-2 text-xl font-bold text-red-500 hover:text-red-700 transition duration-150 rounded-full hover:bg-red-50"
                        aria-label="Fechar Painel"
                    >
                        &times;
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto mt-4 pr-2">
                    {products.length === 0 ? (
                        <p className="text-center text-gray-500 p-10">
                            {categoryId ? 'Nenhum produto encontrado nesta categoria.' : 'Carregando produtos ou sem categoria selecionada...'}
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product: any) => (
                                <CardProduct
                                    key={product._id}
                                    product={product}
                                    addToCart={addToCart}
                                    onSelectProduct={onSelectProduct}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}