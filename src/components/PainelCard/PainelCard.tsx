/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from "react"
import CatRowCard from "../CatRowCard/CatRowCard"
import DelCatRowCard from "../DelCatRowCard.tsx/DelCatRowCard"
import DelRowCard from "../DelRowCard/DelRowCard"
import EditRowCard from "../EditRowCard/EditRowCard"
import RowCard from "../RowCard/RowCard"
import toast, { Toaster } from "react-hot-toast"
import { redirect } from "next/navigation"

interface Category {
    _id: string
    nome: string
    parent: string | null
}

interface Product {
        _id: string
        title: string
        description: string
        image?: string
        categoria: string
    }

export default function PainelCard() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [newCategoryName, setNewCategoryName] = useState('')
    const [selectedParentCategory, setSelectedParentCategory] = useState('')
    const [categories, setCategories] = useState<Category[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isEditing, setIsEditing] = useState(false)

        const fetchCategories = async () => {
        try {
            const responsePromise: Promise<Response> = fetch('http://localhost:3003/categories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const response: Response = await responsePromise
            const data: any = await response.json()
            
            if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('_id')) {
                setCategories(data)
            } else {
                toast.error('Resposta da API de categorias inválida:', data)
                setCategories([])
            }
        } catch (err) {
            toast.error(`Erro ao buscar categorias: ${err}`)
            setCategories([])
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleAddProduct = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        try {
            const productData = {
                title,
                description,
                price,
                categoriaNome: selectedCategory,
            }
            const response = await fetch('http://localhost:3003/product/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({productData})
            })

            if (response.status === 404) redirect('/error/404')

            if (response) {
                toast('Produto adicionado com sucesso!')
                setTitle('')
                setDescription('')
                setPrice('')
                setSelectedCategory('')
            }
        } catch (err) {
            toast.error('Erro ao adicionar produto:', err)
        }
    }

    const handleAddCategory = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        try {
            const categoryData = {
                nome: newCategoryName,
                parentId: selectedParentCategory
            }

            const response = await fetch('http://localhost:3003/categories/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    nome: newCategoryName,
                    parentId: selectedParentCategory
                 })
            })

            if (response.ok)
                toast.success('Categoria adicionada com sucesso!')
                setNewCategoryName('')
                setSelectedParentCategory('')
                fetchCategories()
        } catch (err) {
            toast.error('Erro ao adicionar categoria:', err)
        }
    }

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3003/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            const newResp = await response.json()

            if (Array.isArray(newResp))
                setProducts(newResp)
        } catch (err) {
            toast.error('Erro ao buscar produtos:', err)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleProductSelect = (products: SetStateAction<Product | null>) => {
        setSelectedProduct(products)
        setIsEditing(true)
    }

    const handleEdit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        try {
            const response = await fetch(`http://localhost:3003/product/edit/${selectedProduct?._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description})
            })
            
            if (response.status === 404) redirect('/error/404')
            
            if (response.ok) toast.success('Edição dos produtos com sucesso!')
            
            setIsEditing(false)
            setSelectedProduct(null)
            fetchProducts()
        } catch (err) {
            toast.error(`${err}`)
        }
    }
    
    const parentCategories = categories.filter(cat => !cat.parent)
        
    const subCategories = (parentId: any) => categories.filter(cat => cat.parent === parentId)

 return (
        // Container principal: Responsividade e max-width
        // w-[1200px] foi substituído por w-full max-w-7xl para ser responsivo
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto bg-zinc-800 shadow-2xl rounded-xl overflow-y-auto border-4 border-zinc-700 p-4 sm:p-6">
            <Toaster />

            {/* Título do Painel */}
            <h1 className="text-xl sm:text-2xl py-4 px-2 w-full text-center shadow-lg rounded-xl bg-zinc-900 text-white font-bold mb-6">
                Painel de Administração
            </h1>

            {/* Seção: Adicionar Produto */}
            <form onSubmit={handleAddProduct} className="flex flex-col items-center w-full bg-zinc-800 text-white p-4 rounded-xl shadow-inner mb-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-6">Adicionar Produto</h2>
                <RowCard
                    title={title}
                    description={description}
                    selectedCategory={selectedCategory}
                    price={price}
                    onTitleChange={(e) => setTitle(e.target.value)}
                    onDescriptionChange={(e) => setDescription(e.target.value)}
                    onCategoryChange={setSelectedCategory}
                    onPriceChange={(e) => setPrice(e.target.value)}
                    categories={categories}
                />
                <button 
                    type="submit" 
                    className="w-full max-w-sm p-3 mt-8 bg-white text-zinc-900 font-bold rounded-xl shadow-lg 
                               hover:bg-zinc-900 hover:text-white hover:border-4 hover:border-white transition-all duration-200"
                >
                    Adicionar Produto
                </button>
            </form>

            {/* Seção: Edição de Produtos */}
            <div className="flex flex-col items-center w-full bg-zinc-800 text-white p-4 sm:p-6 mb-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-8 w-full text-center">Edição de Produtos</h2>
                
                {isEditing ? (
                    /* Formulário de Edição */
                    <form onSubmit={handleEdit} className="flex flex-col items-center w-full bg-zinc-900 p-6 rounded-xl shadow-xl">
                        <EditRowCard 
                            product={selectedProduct} 
                            input1={e => setTitle(e.target.value)} 
                            input2={e => setDescription(e.target.value)} 
                            input3={e => setPrice(e.target.value)} 
                        />
                        <button 
                            type="submit" 
                            className="w-full max-w-sm p-3 mt-6 bg-white text-zinc-900 font-bold rounded-xl shadow-lg 
                                       hover:bg-zinc-800 hover:text-white hover:border-4 hover:border-white transition-all duration-200 z-20"
                        >
                            Salvar Edição
                        </button>
                         <button 
                            type="button" 
                            onClick={() => setIsEditing(false)}
                            className="w-full max-w-sm p-3 mt-3 bg-red-600 text-white font-bold rounded-xl shadow-lg 
                                       hover:bg-red-700 transition-all duration-200 z-20"
                        >
                            Cancelar
                        </button>
                    </form>
                ) : (
                    /* Visualização de Produtos em Cards (Responsivo Grid) */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-h-[500px] overflow-y-auto p-2">
                        {products.map(product => (
                            <div 
                                key={product._id} 
                                className="flex flex-col items-center justify-start bg-zinc-900 rounded-xl shadow-2xl p-4 cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:shadow-yellow-500/50" 
                                onClick={() => handleProductSelect(product)}
                            >
                                {/* O card agora usa 'w-full' para ocupar o espaço do grid */}
                                <div className="w-full h-32 mb-3 overflow-hidden rounded-lg">
                                    <img 
                                        src={product.image} 
                                        alt={product.title} 
                                        className="object-cover w-full h-full shadow-lg" 
                                    />
                                </div>
                                <h3 className="text-base font-semibold truncate w-full text-center mb-1">{product.title}</h3>
                                <p className="text-xs text-gray-400 text-center mb-1 line-clamp-2">{product.description}</p>
                                <p className="text-sm font-bold text-yellow-400 mb-3">R$ {product.price || 'N/A'}</p>
                                
                                <button className="w-full p-2 bg-yellow-400 text-zinc-900 font-semibold rounded-lg shadow-xl hover:bg-orange-400 hover:text-white transition-colors">
                                    Editar
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Seção: Exclusão de Produtos */}
            <h2 className="text-xl py-4 bg-zinc-900 text-white w-full text-center mt-8 font-bold">Exclusão de Produtos</h2>
            <DelRowCard /> {/* Componente de exclusão precisa ser responsivo internamente */}

            {/* Seção: Adicionar Categoria */}
            <h2 className="text-xl py-4 mt-8 bg-zinc-900 text-white w-full text-center font-bold">Adicionar Categoria</h2>
            <form onSubmit={handleAddCategory} className="flex flex-col items-center w-full bg-zinc-800 text-white p-4 rounded-xl shadow-inner mb-8">
                <CatRowCard
                    newCategoryName={newCategoryName}
                    selectedParentCategory={selectedParentCategory}
                    categories={categories}
                    onNewCategoryChange={(e) => setNewCategoryName(e.target.value)}
                    onParentCategoryChange={setSelectedParentCategory}
                />
                <button 
                    type="submit" 
                    className="w-full max-w-sm p-3 mt-8 bg-white text-black font-bold rounded-xl shadow-lg 
                               hover:bg-black hover:text-white hover:border-4 hover:border-white transition-all duration-200"
                >
                    Adicionar Categoria
                </button>
            </form>
            
            {/* Seção: Categorias Existentes */}
            <h2 className="text-xl py-4 bg-zinc-900 text-white w-full text-center font-bold">
                Categorias e Subcategorias Existentes
            </h2>
            <div className="pt-4 bg-zinc-800 w-full text-center text-white p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {parentCategories.map(parentCat => (
                        <div key={parentCat._id} className="bg-zinc-700 p-4 rounded-lg shadow-md">
                            <p className="font-bold text-lg mb-2 text-yellow-300">{parentCat.nome}</p>
                            <div className="flex flex-col items-start pl-2">
                                {subCategories(parentCat._id).map(subCat => (
                                    <p key={subCat._id} className="text-sm text-gray-300 ml-4 border-l border-gray-500 pl-2">
                                        - {subCat.nome}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Seção: Exclusão de Categoria */}
            <h2 className="text-xl py-4 bg-zinc-900 text-white w-full text-center mt-8 font-bold">Exclusão de Categoria</h2>
            <DelCatRowCard /> {/* Componente de exclusão precisa ser responsivo internamente */}
            
            {/* Espaço no final */}
            <div className="h-12"></div>
        </div>
    )
}