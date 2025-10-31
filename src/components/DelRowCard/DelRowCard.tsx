import { redirect } from 'next/navigation'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function DelRowCard() {
    const [productTitle, setProductTitle] = useState('')

    const handleDeleteProduct = async (event: { preventDefault: () => void }) => {
        event.preventDefault()

        if (!productTitle) {
            toast('Por favor, insira o nome do produto para exclusão.')
            return
        }

        try {
            const response = await fetch('http://localhost:3003/product/del', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: productTitle }),
            })

            if (response.status === 404) redirect('/error/404')

            if (response.ok) {
                toast('Produto excluído com sucesso!')
                setProductTitle('')
            } else {
                const errorData = await response.json()
                toast(`Erro ao excluir: ${errorData.message}`)
            }
        } catch (error) {
            toast.error('Erro na requisição:', error)
            toast('Erro de conexão com o servidor.')
        }
    }

    return (
        <form onSubmit={handleDeleteProduct} className="pt-[70px] flex flex-row justify-center w-full bg-zinc-800 text-white">
            <Toaster />
            <div className="flex flex-col justify-center items-center w-full">
                <label htmlFor="productName">Nome do produto:</label>
                <input
                    id="productName"
                    type="text"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    className="outline-none bg-zinc-900 text-white w-[80%] rounded shadow-xl"
                />
                <hr className="p-[10px] w-[80%] shadow-2xl bg-zinc-700" />
                <button
                    type="submit"
                    className="p-[20px] hover:bg-zinc-900 hover:border-solid hover:border-white hover:border-8 hover:cursor-pointer hover:text-white bg-white text-black rounded-xl shadow-2xl mt-[50px] w-[90%] mb-[30px]"
                >
                    Excluir
                </button>
            </div>
        </form>
    )
}