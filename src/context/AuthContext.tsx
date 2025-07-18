'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, PropsWithChildren } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Para indicar que estamos verificando o status

    const checkAuthStatus = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3003/auth/status', {
                method: 'GET',
                credentials: 'include', // Importantíssimo para enviar os cookies de sessão
            });
            const data = await response.json();
            if (response.ok && data.loggedIn) {
                setLoggedIn(true);
                setUser(data.user);
            } else {
                setLoggedIn(false);
                setUser(null);
            }
        } catch (error) {
            console.error('Erro ao verificar status de autenticação:', error);
            setLoggedIn(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3003/auth/logout', {
                method: 'POST', // Logout deve ser POST para proteção CSRF (se você adicionar)
                credentials: 'include',
            });
            if (response.ok) {
                setLoggedIn(false);
                setUser(null);
                // Opcional: Redirecionar para a página inicial ou de login
                // window.location.href = '/auth/login';
            } else {
                console.error('Falha ao fazer logout:', await response.json());
            }
        } catch (error) {
            console.error('Erro de rede ao fazer logout:', error);
        }
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]); // Roda apenas uma vez no mount

    // Você pode adicionar uma função de login aqui também
    const login = useCallback(async (email, password) => {
        // Aqui você faria a requisição de login
        // Após o sucesso, chame checkAuthStatus() novamente
        // Exemplo:
        // const response = await fetch('http://localhost:3003/auth/signin', { ... });
        // if (response.ok) {
        //   await checkAuthStatus();
        // }
    }, [checkAuthStatus]);


    return (
        <AuthContext.Provider value={{ loggedIn, user, loading, checkAuthStatus, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};