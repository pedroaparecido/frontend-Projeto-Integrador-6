/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, PropsWithChildren } from 'react'
import toast, { Toaster } from 'react-hot-toast'

// 1. DEFINIÇÃO DA INTERFACE DO CONTEXTO
interface AuthContextType {
    loggedIn: boolean;
    user: any; 
    loading: boolean;
    logout: () => Promise<void>;
    login: (email: any, password: any) => Promise<any>;
    cartItems: any[];
    setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
}

// 2. CRIAÇÃO DO CONTEXTO COM O TIPO ADEQUADO
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    // ... Seu estado aqui ...
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(null) as any
    const [cartItems, setCartItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const login = useCallback(async (email: any, password: any) => {
        setLoading(true)
        try {
            const csrfResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/csrf-token`)
            const csrfData = await csrfResponse.json()
            const csrfToken = csrfData.csrfToken

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            })

            const data = await response.json()

            if (response.ok) {
                // Atualiza o estado diretamente após o sucesso do login
                setLoggedIn(true)
                setUser(data.user)
                return { success: true, message: data.message, user: data.user }
            } else {
                toast.error('Falha no login:', data.message)
                setLoggedIn(false)
                setUser(null)
                return { success: false, message: data.message || 'Erro desconhecido ao fazer login.' }
            }
        } catch (error) {
            toast.error(`Erro de rede ao fazer login: ${error}`)
            setLoggedIn(false)
            setUser(null)
            return { success: false, message: 'Erro de rede ao fazer login.' }
        } finally {
            setLoading(false)
        }
    }, [])

    // Função de logout que se comunica com o backend
    const logout = useCallback(async () => {
        try {
            const csrfResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/csrf-token`)
            const csrfData = await csrfResponse.json()
            const csrfToken = csrfData.csrfToken

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                credentials: 'include',
            })
            if (response.ok) {
                setLoggedIn(false)
                setUser(null)
            } else {
                toast.error('Falha ao fazer logout:', await response.json())
            }
        } catch (error) {
            toast.error(`Erro de rede ao fazer logout: ${error}`)
        }
    }, [])

    // O useEffect agora só chama a função de verificação na montagem inicial
    useEffect(() => {
        const checkAuthStatus = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/status`, {
                    method: 'GET',
                    credentials: 'include',
                })
                const data = await response.json()
                if (response.ok && data.loggedIn) {
                    setLoggedIn(true)
                    setUser(data.user)
                } else {
                    setLoggedIn(false)
                    setUser(null)
                }
            } catch (error) {
                toast.error(`Erro ao verificar status de autenticação: ${error}`)
                setLoggedIn(false)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        checkAuthStatus()
    }, [])

    return (
        <AuthContext.Provider value={{ loggedIn, user, loading, logout, login, cartItems, setCartItems }}>
            <Toaster />
            {children}
        </AuthContext.Provider>
    )
}

// 3. HOOK useAuth CORRIGIDO
export const useAuth = () => {
    const context = useContext(AuthContext)
    
    if (context === null) { // Verifica se o valor é null
        // Lança erro se o hook for chamado fora do Provider
        throw new Error('useAuth deve ser usado dentro de um AuthProvider') 
    }
    
    // Retorna o contexto, agora garantido pelo TypeScript como AuthContextType
    return context
}