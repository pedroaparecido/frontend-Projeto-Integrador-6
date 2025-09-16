'use client'
import Button from "@/components/Button/Button"
import Input from "@/components/Input/Input"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"

export default function Register() {
    const [ csrfToken, setCsrfToken ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ name, setName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [session, setSession] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

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
                    throw new Error(`Erro ao buscar CSRF token: ${response.statusText}`)
                }
            } catch (error) {
                console.error('Erro ao buscar CSRF token:', error)
                console.log('Falha ao carregar o formulário. Tente novamente.')
            }
        }

        fetchCsrfToken()
    }, [])

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (!csrfToken) {
            console.log('Token CSRF não disponível. Por favor, aguarde ou recarregue a página.')
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

        if (response.ok) {
            console.log('Cadastro realizado com sucesso!')
            redirect('/auth/login')
        } else {
            const errorData = await response.json()
            console.log(`Erro ao cadastrar: ${errorData.message || response.statusText}`)
        }
    }
    
    useEffect(() => {
    const fetchSession = async () => {
        try {
        const response = await fetch('http://localhost:3003/auth/status', {
            method: 'GET',
            credentials: 'include',
        })

        if (response.ok) {
            const data = await response.json()
            setSession(data.loggedIn)
        } else {
            console.error("Erro ao buscar a sessão:", response.statusText)
            setSession(false)
        }
        } catch (error) {
        console.error("Erro na requisição:", error);
        setSession(false)
        } finally {
        setIsLoading(false)
        }
    };

    fetchSession()
    }, [])


    if (isLoading) {
    return <div>Carregando...</div>
    }

    if (session) {
    redirect('/')
}

    return(
        <div className="flex flex-col justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center border-1 border-solid p-[40px] rounded-xl gap-[20px] w-xl">
                <h1 className="font-bold text-xl">Formulário de Registro</h1>
                <Input tipo="text" holder="Nome" name="name" change={(e: { target: HTMLInputElement }) => setName(e.target.value)} />
                <Input tipo="email" holder="Email" name="email" change={(e: { target: HTMLInputElement }) => setEmail(e.target.value)} />
                <Input tipo="password" holder="Password" name="password" change={(e: { target: HTMLInputElement }) => setPassword(e.target.value)} />
                <Button type="submit">Cadastrar</Button>
                <span>Já tem uma conta? <Link className="text-indigo-600 underline hover:text-indigo-800 font-semibold" href="/auth/login">Entrar</Link></span>
                <Link className="text-indigo-600 underline hover:text-indigo-800 font-semibold" href="/">Início</Link>
            </form>
        </div>
    )
}