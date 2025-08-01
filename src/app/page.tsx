'use client'
import Navbar from "@/components/Navbar/Navbar"
import PageCard from "@/components/PageCard/PageCard"
import { redirect } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function Home() {
    const { loggedIn, loading } = useAuth()

    if (loading) {
        return <p>Verificando sessão...</p>;
    }

    if (!loggedIn) {
        redirect('/auth/login');
    }

    return (
        <div className="h-full">
            <Navbar />
            <PageCard />
        </div>
    );
}