import React, { useState } from 'react'

export default function DelCatRowCard() {
    const [categoryName, setCategoryName] = useState('')

    const handleDeleteCategory = async (event: { preventDefault: () => void }) => {
        event.preventDefault()

        if (!categoryName) {
            alert('Por favor, insira o nome da categoria para exclusão.')
            return
        }

        try {
            const response = await fetch('http://localhost:3003/category/del', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },              
                body: JSON.stringify({ nome: categoryName }),
            })

            if (response.ok) {
                alert('Categoria excluída com sucesso!')
                setCategoryName('')
            } else {
                const errorData = await response.json()
                alert(`Erro ao excluir: ${errorData.message}`)
            }
        } catch (error) {
            console.error('Erro na requisição:', error)
            alert('Erro de conexão com o servidor.')
        }
    }

    return (
        <form onSubmit={handleDeleteCategory} className="pt-[70px] flex flex-row justify-center w-full bg-zinc-800 text-white">
            <div className="flex flex-col justify-center items-center w-full">
                <label htmlFor="categoryName" className="text-white">Nome da categoria:</label>
                <input
                    id="categoryName"
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
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