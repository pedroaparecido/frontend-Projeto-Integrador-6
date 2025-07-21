'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, PropsWithChildren } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3003/auth/status', {
                method: 'GET',
                credentials: 'include',
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const login = useCallback(async (email: any, password: any) => {
        setLoading(true); // Opcional: mostrar carregamento durante o login
        try {
            // Primeiro, obtenha o token CSRF
            const csrfResponse = await fetch('http://localhost:3003/csrf-token');
            const csrfData = await csrfResponse.json();
            const csrfToken = csrfData.csrfToken;

            const response = await fetch('http://localhost:3003/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-csrf-token': csrfToken, // Envie o token CSRF no cabeçalho
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include', // Essencial para o Express-session gerenciar a sessão
            });

            const data = await response.json();

            if (response.ok) {
                // Se o login for bem-sucedido, force a verificação do status de autenticação
                await checkAuthStatus();
                return { success: true, message: data.message, user: data.user };
            } else {
                console.error('Falha no login:', data.message);
                setLoggedIn(false);
                setUser(null);
                return { success: false, message: data.message || 'Erro desconhecido ao fazer login.' };
            }
        } catch (error) {
            console.error('Erro de rede ao fazer login:', error);
            setLoggedIn(false);
            setUser(null);
            return { success: false, message: 'Erro de rede ao fazer login.' };
        } finally {
            setLoading(false);
        }
    }, [checkAuthStatus]);


    const logout = useCallback(async () => {
        try {
            // Para o logout, também é recomendável enviar o token CSRF, pois é uma requisição POST
            const csrfResponse = await fetch('http://localhost:3003/csrf-token');
            const csrfData = await csrfResponse.json();
            const csrfToken = csrfData.csrfToken;

            const response = await fetch('http://localhost:3003/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-csrf-token': csrfToken, // Envie o token CSRF no cabeçalho
                },
                credentials: 'include',
            });
            if (response.ok) {
                setLoggedIn(false);
                setUser(null);
            } else {
                console.error('Falha ao fazer logout:', await response.json());
            }
        } catch (error) {
            console.error('Erro de rede ao fazer logout:', error);
        }
    }, []);

    useEffect(() => {
        checkAuthStatus();
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