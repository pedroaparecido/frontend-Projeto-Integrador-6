/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, PropsWithChildren } from 'react'

const AuthContext = createContext(null) as any

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(null) as any
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)

    // Função de login que se comunica com o backend
    const login = useCallback(async (email: any, password: any) => {
        setLoading(true)
        try {
            const csrfResponse = await fetch('http://localhost:3003/csrf-token')
            const csrfData = await csrfResponse.json()
            const csrfToken = csrfData.csrfToken

            const response = await fetch('http://localhost:3003/auth/signin', {
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
                console.error('Falha no login:', data.message)
                setLoggedIn(false)
                setUser(null)
                return { success: false, message: data.message || 'Erro desconhecido ao fazer login.' }
            }
        } catch (error) {
            console.error('Erro de rede ao fazer login:', error)
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
            const csrfResponse = await fetch('http://localhost:3003/csrf-token')
            const csrfData = await csrfResponse.json()
            const csrfToken = csrfData.csrfToken

            const response = await fetch('http://localhost:3003/auth/logout', {
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
                console.error('Falha ao fazer logout:', await response.json())
            }
        } catch (error) {
            console.error('Erro de rede ao fazer logout:', error)
        }
    }, [])

    // O useEffect agora só chama a função de verificação na montagem inicial
    useEffect(() => {
        const checkAuthStatus = async () => {
            setLoading(true)
            try {
                const response = await fetch('http://localhost:3003/auth/status', {
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
                console.error('Erro ao verificar status de autenticação:', error)
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
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth deve ser usado no AuthProvider')
    }
    return context
}
