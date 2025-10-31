'use client'
import Button from "@/components/Button/Button"
import Input from "@/components/Input/Input"
import Link from "next/link"
import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"

export default function Login() {
    const [ csrfToken, setCsrfToken ] = useState('')
    const [ email, setEmail ] = useState('')
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
                toast.error(`Erro ao buscar CSRF token:' ${error}`)
                toast('Falha ao carregar o formulário. Tente novamente.')
            }
        }

        fetchCsrfToken()
    }, [])

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()

        if (!csrfToken) {
            toast.error('Token CSRF não disponível. Por favor aguarde ou recarregue a página..')
            window.location.href = '/auth/login'
        }
        
        const response = await fetch('http://localhost:3003/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        })
        
        if (response.status === 400) {
            toast.error('Todos os campos são obriatórios!!')
        } else if (response.status === 401) {
            toast.error('Credenciais inválidas')
        } else if (response.status === 500) {
            const errorData = await response.json()
            toast.error(`Erro ao logar: ${errorData.message || response.statusText}`)
        } else if (response.ok) {
            toast.success('Logado com sucesso!')
            redirect('/')
        }
    }

    return(
        <div className="flex flex-col justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center border-1 border-solid p-[40px] rounded-xl gap-[20px] w-full max-w-sm md:max-w-md">
               <Toaster />
                <h1 className="font-bold text-xl">Formulário de login</h1>
                <Input tipo="email" holder="Email" name="email" change={(e: { target: HTMLInputElement }) => setEmail(e.target.value)} />
                <Input tipo="password" holder="Password" name="password" change={(e: { target: HTMLInputElement }) => setPassword(e.target.value)} />
                <Button>Entrar</Button>
                <span>Não tem uma conta? <Link className="text-indigo-600 underline hover:text-indigo-800 font-semibold" href="/auth/register">Registre-se</Link></span>
                <Link className="text-sm text-indigo-600 underline hover:text-indigo-800 font-semibold" href="/">Voltar ao início</Link>
            </form>
        </div>
    )
}