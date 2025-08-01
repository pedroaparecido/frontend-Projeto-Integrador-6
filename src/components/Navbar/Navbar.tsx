// src/components/Navbar/Navbar.js (ou .tsx)
'use client'; // Marcar como Client Component

import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // Ajuste o caminho conforme sua estrutura
import { redirect } from "next/navigation";

export default function Navbar() {
    const { loggedIn, user, loading, logout } = useAuth();

    // Se estiver carregando, você pode mostrar um spinner ou nada
    if (loading) {
        return (
            <div className="flex justify-end items-center gap-[20px] font-bold bg-gray-500 p-[20px]">
                Carregando...
            </div>
        );
    }

    return(
        <div className="flex justify-end items-center gap-[20px] font-bold bg-gray-500 p-[20px]">
            <Link href="/">Home</Link>
            {loggedIn ? (
                <>
                    {user && <Link href="#">Olá, {user.email || user.id}</Link>}
                    <button onClick={logout} className="text-white hover:underline cursor-pointer">
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link href="auth/login">Sign in</Link>
                    <Link href="auth/register">Sign up</Link>
                </>
            )}
        </div>
    )
}