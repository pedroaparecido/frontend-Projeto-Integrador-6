'client component'

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { useState, useEffect } from "react"

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

    // 1. Popula o mapa para acesso rápido
    allNavCategories.forEach(navCat => {
        categoryMap[navCat.id] = navCat
    })

    // 2. Constrói a hierarquia
    flatCategories.forEach(cat => {
        const categoryId = cat._id
        const navCat = categoryMap[categoryId] 

        if (navCat) {
            // Se parent é null ou 'null', é uma categoria principal
            if (cat.parent === null || cat.parent === 'null') {
                if (!primaryCategories.some(p => p.id === navCat.id)) {
                    primaryCategories.push(navCat)
                }
            } else {
                // Se tem um pai, tenta anexar
                const parentId = cat.parent
                const parentCategory = categoryMap[parentId]

                if (parentCategory) {
                    if (!parentCategory.subcategories.some(sub => sub.id === navCat.id)) {
                        parentCategory.subcategories.push(navCat)
                    }
                }
            }
        }
    })

    return primaryCategories
}

export default function Navbar() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { loggedIn, user, loading: authLoading, logout } = useAuth()
    
    const [categories, setCategories] = useState<NavCategory[]>([])
    const [dataLoading, setDataLoading] = useState(true)

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
            } finally {
                setDataLoading(false)
            }
        }

        fetchAndOrganizeCategories()
    }, [])

    const isLoading = authLoading || dataLoading

    const navLinkClasses = "hover:text-white hover:bg-orange-500  rounded-xl transition-colors duration-200 p-[8px]"
    const dropdownItemClasses = "text-sm p-[10px] text-white hover:bg-orange-500 whitespace-nowrap"


    if (isLoading) {
        return (
            <div className="flex justify-start items-center gap-[20px] font-bold bg-amber-400 rounded-xl text-gray-800 fixed z-50 w-full p-[20px]">
                Carregando...
            </div>
        )
    }

    return(
        <div className="flex fixed z-50 w-full justify-center">
            <div className="flex justify-start items-center gap-[20px] font-bold bg-amber-400 text-black m-[10px] mr-[-10px] pl-[20px] w-full rounded-xl p-[10px]">
                <Link className={navLinkClasses} href="/">Home</Link>
                {loggedIn ? (
                    <>
                        {user && <Link className={navLinkClasses} href="#">Olá, {user.email || user.id}</Link>}
                        <button onClick={logout} className="text-white hover:underline cursor-pointer transition-colors duration-200">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link className={navLinkClasses} href="http://localhost:3000/auth/login">Sign in</Link>
                        <Link className={navLinkClasses} href="http://localhost:3000/auth/register">Sign up</Link>
                    </>
                )}
            </div>
            <div className="flex justify-end items-center w-full gap-[20px] bg-amber-400 rounded-r-xl text-gray-800 h-[60px] mt-[10px]">
            {categories.map((category) => (
                <div key={category.id} className="group flex flex-row h-full items-center text-sm px-3 hover:bg-orange-500 hover:text-white cursor-pointer relative transition-colors duration-200">
                    {category.name} 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                    <div className="absolute hidden group-hover:block z-20 top-full p-[10px]">
                        <div className="flex flex-col bg-amber-500 rounded-b-lg overflow-hidden shadow-lg">
                            {category.subcategories.length > 0 ? (
                                category.subcategories.map(sub => (
                                    <Link 
                                        key={sub.id}
                                        href={sub.slug}
                                        className={dropdownItemClasses}
                                    >
                                        {sub.name}
                                    </Link>
                                ))
                                ) : (
                                    <Link 
                                        href={category.slug} 
                                        className={dropdownItemClasses} 
                                    >
                                        Sem categorias
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}