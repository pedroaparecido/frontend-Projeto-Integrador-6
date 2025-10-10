/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useEffect, useState } from "react"

interface Category {
    id: number
    name: string
    imageUrl: string
    parentId: number | null
}

export default function CardCarousel() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3003/categories')
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                
                const mainCategories = data.filter((cat: any) => cat.parent)

                setCategories(mainCategories)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError("An unknown error occurred")
                }
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    if (loading) {
        return <div className="flex justify-center items-center h-40">Carregando categorias...</div>
    }

    if (error) {
        return <div className="flex justify-center items-center h-40 text-red-600">Erro ao carregar categorias: {error}</div>
    }

    const images = [
        'gemini6.png',
        'gemini5.png',
        'gemini7.png',
        'gemini8.png',
        'gemini9.png',
        'gemini10.png',
    ]

    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl tracking-tight leading-tight text-center pb-[30px] text-gray-800">Explore Nossas Categorias</h1>
            <Swiper
                className="w-full h-full"
                slidesPerView={1}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    1280: {
                        slidesPerView: 6,
                        spaceBetween: 30,
                    },
                }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                modules={[Navigation, Pagination, Autoplay]}
            >
                {categories.length > 0 ? (
                    categories.map((category, indice) => (
                        <SwiperSlide key={category.id}>
                            <div className="relative group overflow-hidden rounded-lg shadow-lg">
                                {/* eslint-disable-next-line @next/next/no-img-element, react/jsx-key */}
                                <img src={images[indice]} alt={category.name} className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    <p className="text-white text-lg font-semibold text-center">{category.name}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <div className="flex justify-center items-center p-8 text-gray-600">Nenhuma categoria encontrada.</div>
                )}
            </Swiper>
        </div>
    )
}