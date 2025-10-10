'use client'
import NavbarAdmin from "@/components/NavbarAdmin/NavbarAdmin"
import PainelCard from "@/components/PainelCard/PainelCard"
import { useEffect, useState } from "react"
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
                console.error("Erro ao buscar a sessão:", response.statusText)
                setSession(false)
            }
        } catch (error) {
            console.error("Erro na requisição:", error)
            setSession(false)
        }
    }

    fetchSession()
    }, [])


    if (!session) {
        redirect('/')
    }

    return(
        <div className="w-screen min-h-[630px] flex flex-col items-center bg-zinc-900">
            <NavbarAdmin />
            <div className="pt-[85px]" />
            <PainelCard />
        </div>
    )
}