/* eslint-disable @typescript-eslint/no-explicit-any */
'client component'

import { FaTrash } from 'react-icons/fa'
import moment from 'moment'
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"

interface APICategory {
    _id: string
    id?: string
    nome: string 
    parent: string | null 
}

interface NavCategory {
    id: string
    name: string
    slug: string
    subcategories: NavCategory[]
}

const organizeCategories = (flatCategories: APICategory[]): NavCategory[] => {
    const allNavCategories: NavCategory[] = flatCategories
        .map(cat => {
            const categoryId = cat._id 
            
            if (!categoryId) return null 

            return {
                id: categoryId,
                name: cat.nome,
                slug: `/categoria/${categoryId}`,
                subcategories: [] as NavCategory[]
            }
        })
        .filter((cat): cat is NavCategory => cat !== null)

    const categoryMap: Record<string, NavCategory> = {}
    const primaryCategories: NavCategory[] = []

    allNavCategories.forEach(navCat => {
        categoryMap[navCat.id] = navCat
    })

    flatCategories.forEach(cat => {
        const categoryId = cat._id
        const navCat = categoryMap[categoryId] 

        if (navCat) {
            if (cat.parent === null || cat.parent === 'null') {
                if (!primaryCategories.some(p => p.id === navCat.id)) {
                    primaryCategories.push(navCat)
                }
            } else {
                const parentId = cat.parent
                const parentCategory = categoryMap[parentId]

                if (parentCategory) {
                    if (!parentCategory.subcategories.some(items => items.id === navCat.id)) {
                        parentCategory.subcategories.push(navCat)
                    }
                }
            }
        }
    })

    return primaryCategories
}

export default function NavbarAdmin() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { loggedIn, user, loading, logout } = useAuth()
    const [categories, setCategories] = useState<NavCategory[]>([])
    const [order, setOrder] = useState([])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [visivel, setVisivel] = useState(false)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch('http://localhost:3003/orders')
                
                const data = await response.json()

                setOrder(data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchOrder()

    },)

    useEffect(() => {
        const fetchAndOrganizeCategories = async () => {
                try {
                    const response = await fetch('http://localhost:3003/categories') 
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`)
                    }
                    
                    const data: APICategory[] = await response.json() 
                    
                    const organizedCategories = organizeCategories(data)
                    
                    setCategories(organizedCategories)
    
                } catch (err) {
                    console.error("Erro ao carregar categorias:", err)
            }    
    }

    fetchAndOrganizeCategories()
}, [])    

    async function handleDelete(body: any) {
        const response = await fetch('http://localhost:3003/order/del', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        
        if (response.ok) alert('Pedido excluido com sucesso!')
    }

    const dropdownItemClasses = "text-sm p-[10px] text-black hover:bg-black hover:text-white whitespace-nowrap"

    if (loading) {
        return (
            <div className="flex justify-center items-center gap-[20px] font-bold bg-white text-black p-[20px] w-[90%] mt-[20px] text-center rounded-xl">
                Carregando...
            </div>
        )
    }

    return(
        <div className="flex fixed z-50 w-full">
            <div className="flex justify-start items-center gap-[20px] font-bold bg-white text-black m-[10px] mr-[-10px] pl-[20px] w-full rounded-xl">
                <Link className="hover:text-black hover:bg-black hover:border-solid hover:border-white text-black hover:text-white rounded-xl p-[15px]" href="/">Home</Link>
                {loggedIn ? (
                    <>
                        {user && <Link className="hover:text-black hover:bg-black hover:border-solid h0ver:text-white hover:border-black text-black hover:border-2 rounded-xl p-[15px]" href="#">Olá, {user.email || user.id}</Link>}
                        <button onClick={logout} className="text-black hover:underline cursor-pointer">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link className="hover:text-black hover:bg-black text-black hover:text-white rounded-xl p-[15px]" href="http://localhost:3000/auth/login">Sign in</Link>
                        <Link className="hover:text-black hover:bg-black text-black hover:text-white rounded-xl p-[15px]" href="http://localhost:3000/auth/register">Sign up</Link>
                    </>
                )}
            </div>
            <div className="flex justify-end items-center w-full gap-[20px] bg-white rounded-r-xl text-gray-800 h-[54px] mt-[10px] mr-[10px]">
                <div className="group flex flex-row h-full items-center text-base px-6 hover:bg-black hover:text-white relative transition-colors duration-200">
                    Pedidos
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                    <div className="absolute hidden group-hover:block z-20 top-full w-full left-0 right-0">
                        <div className="flex flex-col bg-white rounded-b-lg shadow-lg max-h-96 overflow-y-auto">
                            {order.map((items: any) =>
                                (<div key={items._id}>
                                    <div 
                                        className="flex text-black justify-between items-center p-3 hover:bg-black hover:text-white"
                                    >
                                        <div className="flex flex-col"> 
                                            <span className="font-medium">{items.title}</span>
                                            <span className="text-sm  mt-1">
                                                {moment(items.date).format('LT')}
                                            </span>
                                        </div>
                                        <button
                                            className="p-1 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                            onClick={() => handleDelete(items)} 
                                            aria-label={`Excluir pedido ${items.title}`}
                                        >
                                            <FaTrash size={14} />
                                        </button>

                                    </div>
                                    <hr className="border-gray-200" />
                                </div>)
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}