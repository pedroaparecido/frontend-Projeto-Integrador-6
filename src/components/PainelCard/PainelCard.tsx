/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from "react"
import CatRowCard from "../CatRowCard/CatRowCard"
import DelCatRowCard from "../DelCatRowCard.tsx/DelCatRowCard"
import DelRowCard from "../DelRowCard/DelRowCard"
import EditRowCard from "../EditRowCard/EditRowCard"
import RowCard from "../RowCard/RowCard"

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
                console.error('Resposta da API de categorias inválida:', data)
                setCategories([])
            }
        } catch (err) {
            console.error('Erro ao buscar categorias:', err)
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

            if (response) {
                alert('Produto adicionado com sucesso!')
                setTitle('')
                setDescription('')
                setPrice('')
                setSelectedCategory('')
            }
        } catch (err) {
            console.error('Erro ao adicionar produto:', err)
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
                alert('Categoria adicionada com sucesso!')
                setNewCategoryName('')
                setSelectedParentCategory('')
                fetchCategories()
        } catch (err) {
            console.error('Erro ao adicionar categoria:', err)
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
            console.error('Erro ao buscar produtos:', err)
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
            
            if (response.ok)
                alert('Edição dos produtos com sucesso!')
            setIsEditing(false)
            setSelectedProduct(null)
            fetchProducts()
        } catch (err) {
            console.log(err)
        }
    }
    
    const parentCategories = categories.filter(cat => !cat.parent)
        
    const subCategories = (parentId: any) => categories.filter(cat => cat.parent === parentId)

    return (
        <div className="flex flex-col items-center w-[1200px] h-[500px] bg-zinc-800 shadow-2xl rounded-xl overflow-y-scroll border-solid border-5 border-zinc-700">
            <h1 className="text-2xl pt-[15px] p-[5px] w-full text-center shadow-xl rounded-xl bg-zinc-900 text-white">Painel de Administração</h1>
            <form onSubmit={handleAddProduct} className="flex flex-col items-center w-full h-[500px] bg-zinc-800 text-white">
                <h1 className="text-xl mt-[50px]">Adicionar produto</h1>
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
                <button type="submit" className="p-[20px] hover:bg-zinc-900 hover:border-solid hover:border-white hover:border-8 hover:cursor-pointer hover:text-white bg-white text-zinc-900 rounded-xl shadow-2xl mt-[50px] w-[90%] mb-[30px]">
                    Adicionar
                </button>
            </form>
            <div className="flex flex-col items-center w-full h-[500px] bg-zinc-800 text-white">
                <h1 className="flex flex-col text-xl mt-[50px] mb-[30px] w-full items-center">Edição de Produtos</h1>
                {isEditing ? (
                    <form onSubmit={handleEdit} className="flex flex-col items-center w-full h-[500px] rounded-xl bg-zinc-900">
                        <EditRowCard product={selectedProduct} input1={e => setTitle(e.target.value)} input2={e => setDescription(e.target.value)} input3={e => setPrice(e.target.value)} />
                        <button type="submit" className="p-[20px] hover:bg-zinc-800 hover:border-solid hover:border-white hover:border-8 hover:cursor-pointer hover:text-white bg-white text-zinc-900 rounded-xl shadow-2xl w-[90%] z-20">Editar</button>
                    </form>
                ) : (
                    <div className="grid grid-cols-4 gap-[10px] w-full h-[500px] text-white overflow-y-scroll">
                        {products.map(product => (
                            <div key={product._id} className="flex flex-col items-center justify-start w-[250px] h-[250px] bg-zinc-900 mt-[30px] rounded-2xl shadow-2xl" onClick={() => handleProductSelect(product)}>
                                <img src={product.image} alt="beer" className="object-cover shadow-2xl" />
                                <h3>Título: {product.title}</h3>
                                <p>Descrção: {product.description}</p>
                                <p>Preço: {product.price}</p>
                                <button className="w-[90%] bg-yellow-400 hover:bg-orange-400 hover:text-white hover:border-solid hover:border-3 hover:border-yellow-400 p-[5[4px] shadow-xl mt-[10px]">Editar</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <h1 className="text-center text-xl pt-[50px] text-white bg-zinc-900 w-full h-full">Exclusão de produtos</h1>
            <DelRowCard />
            <h1 className="text-xl pt-[50px] bg-zinc-900 text-white w-full text-center">Adicionar Categoria</h1>
            <form onSubmit={handleAddCategory} className="flex flex-col items-center w-full h-[500px] bg-zinc-800 text-white">
                <CatRowCard
                    newCategoryName={newCategoryName}
                    selectedParentCategory={selectedParentCategory}
                    categories={categories}
                    onNewCategoryChange={(e) => setNewCategoryName(e.target.value)}
                    onParentCategoryChange={setSelectedParentCategory}
                />
                <button type="submit" className="p-[20px] hover:bg-black hover:border-solid hover:border-white hover:border-8 hover:cursor-pointer hover:text-white bg-white text-black rounded-xl shadow-2xl mt-[50px] w-[90%] mb-[30px]">
                    Adicionar
                </button>
            </form>
            
            <h1 className="text-xl pt-[50px] bg-zinc-900 text-white w-full text-center">
                Categorias e Subcategorias Existentes
            </h1>
            <div className="pt-4 bg-zinc-800 w-full text-center text-white">
                {parentCategories.map(parentCat => (
                    <div key={parentCat._id} className="pt-4 bg-zinc-800 w-full text-center text-white">
                        <p className="font-bold">{parentCat.nome}</p>
                        <div className="ml-4">
                            {subCategories(parentCat._id).map(subCat => (
                                <p key={subCat._id} className="ml-4">- {subCat.nome}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <h1 className="text-xl bg-zinc-900 text-white w-full text-center">Exclusão de Categoria</h1>
            <DelCatRowCard />
            <div className="mt-[50px]"></div>
        </div>
    )
}