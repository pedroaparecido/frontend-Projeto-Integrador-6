'use client'
import NavbarAdmin from "@/components/NavbarAdmin/NavbarAdmin"
import PainelCard from "@/components/PainelCard/PainelCard"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { redirect } from "react-router-dom"

export default function PainelAdmin() {
    const [session, setSession] = useState(false)

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
                toast.error(`Erro ao buscar a sessão: ${response.statusText}`)
                setSession(false)
            }
        } catch (error) {
            toast.error(`Erro na requisição: ${error}`)
            setSession(false)
        }
    }

    fetchSession()
    }, [])


    if (!session) {
        redirect('/')
    }

    return(
        <div className="w-screen min-h-[630px] flex flex-col items-center bg-zinc-900 p-4 sm:p-6">
            <Toaster />
            <NavbarAdmin />
            <main className="w-full max-w-7xl mt-20 sm:mt-24">
                <PainelCard />
            </main>
        </div>
    )
}