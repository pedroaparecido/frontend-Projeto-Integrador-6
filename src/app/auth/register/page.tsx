'use client'

import Button from "@/components/Button/Button"
import Input from "@/components/Input/Input"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"

export default function Register() {
    const [ csrfToken, setCsrfToken ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ name, setName ] = useState('')
    const [ password, setPassword ] = useState('')

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

    const successMessage = () => {
        toast.success('Cadastrado com sucesso')
        setTimeout(() => {}, 5000)
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (!csrfToken) {
            toast.error('Token CSRF não disponível. Por favor, aguarde ou recarregue a página.')
            return
        }
        
        const response = await fetch('http://localhost:3003/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify({ name, email, password }),
        })

        if (response.status === 400) {
            toast.error('Todos os campos são obriatórios!!')
        } else if (response.status === 409) {
            toast.error('Email já cadastrado!')
        } else if (response.status === 500) {
            const errorData = await response.json()
            toast.error(`Erro ao cadastrar: ${errorData.message || response.statusText}`)
        } else if (response.ok) {
            successMessage()
            redirect('/auth/login')
        }
    }

    return(
        <div className="flex flex-col justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center border-1 border-solid p-[40px] rounded-xl gap-[20px] w-full max-w-sm md:max-w-md">
                <Toaster />
                <h1 className="font-bold text-xl">Formulário de Registro</h1>
                <Input tipo="text" holder="Nome" name="name" change={(e: { target: HTMLInputElement }) => setName(e.target.value)} />
                <Input tipo="email" holder="Email" name="email" change={(e: { target: HTMLInputElement }) => setEmail(e.target.value)} />
                <Input tipo="password" holder="Password" name="password" change={(e: { target: HTMLInputElement }) => setPassword(e.target.value)} />
                <Button className="bg-gray-300 hover:bg-gray-400 cursor-pointer p-[20px] rounded-xl w-full text-center" >Cadastrar</Button>
                <span>Já tem uma conta? <Link className="text-indigo-600 underline hover:text-indigo-800 font-semibold" href="/auth/login">Entrar</Link></span>
                <Link className="text-sm text-indigo-600 underline hover:text-indigo-800 font-semibold" href="/">Voltar ao nício</Link>
            </form>
        </div>
    )
}