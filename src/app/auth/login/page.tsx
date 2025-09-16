'use client'
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
    const [ csrfToken, setCsrfToken ] = useState('')
    const [ email, setEmail ] = useState('')
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

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()

        if (!csrfToken) {
            console.log('Token CSRF não disponível. Por favor, aguarde ou recarregue a página.')
            return
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

        if (response.ok) {
            console.log('Cadastro realizado com sucesso!')
            window.location.href = '/'
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
                <h1 className="font-bold text-xl">Formulário de login</h1>
                <Input tipo="email" holder="Email" name="email" change={(e: { target: HTMLInputElement }) => setEmail(e.target.value)} />
                <Input tipo="password" holder="Password" name="password" change={(e: { target: HTMLInputElement }) => setPassword(e.target.value)} />
                <Button>Entrar</Button>
                <span>Não tem uma conta? <Link className="text-indigo-600 underline hover:text-indigo-800 font-semibold" href="/auth/register">Registre-se</Link></span>
                <Link className="text-indigo-600 underline hover:text-indigo-800 font-semibold" href="/">Início</Link>
            </form>
        </div>
    )
}