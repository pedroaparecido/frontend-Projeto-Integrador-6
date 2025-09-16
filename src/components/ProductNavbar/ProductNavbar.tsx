'client component';

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import ShowUp from "../ShowUp/ShowUp";
import { useState } from "react";

export default function ProductNavbar() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { loggedIn, user, loading, logout } = useAuth();
    const [visivel, setVisivel] = useState(false)

    if (loading) {
        return (
            <div className="flex justify-start items-center gap-[20px] font-bold bg-gradient-to-b from-orange-500 to-orange-400 p-[20px] rounded-xl">
                Carregando...
            </div>
        )
    }

    return(
        <div className="flex fixed z-20 w-full">
            <div className="flex justify-start items-center gap-[20px] font-bold bg-yellow-400 m-[10px] mr-[-10px] p-[20px] w-full rounded-xl">
                <ShowUp visivel={visivel} setVisivel={setVisivel} />
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
                        <Link href="http://localhost:3000/auth/login">Sign in</Link>
                        <Link href="http://localhost:3000/auth/register">Sign up</Link>
                    </>
                )}
            </div>
            <div className="relative flex justify-end gap-[20px] bg-yellow-400 m-[10px] ml-[-10px] p-[20px] w-full rounded-xl">
                <div className="group flex flex-row text-sm px-3 hover:bg-orange-400 hover:text-white cursor-pointer relative">
                    Categorias
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                    <div className="absolute hidden group-hover:block z-20 top-full left-0 w-full">
                        <div className="flex flex-col-reverse divide-y-5 divide-y-reverse divide-black bg-yellow-500 w-[105px] w-full">
                            <Link href="#" className="w-full text-sm px-3 py-1 hover:bg-orange-400 hover:text-white" >Cerveja</Link>
                            <Link href="#" className="w-full text-sm px-3 py-1 hover:bg-orange-400 hover:text-white" >Sem Álcool</Link>
                            <Link href="#" className="w-full text-sm px-3 py-1 hover:bg-orange-400 hover:text-white" >Destilados</Link>
                            <Link href="#" className="w-full text-sm px-3 py-1 hover:bg-orange-400 hover:text-white" >Drinks</Link>
                        </div>
                    </div>
                </div>
                <div className="group flex flex-row text-sm px-3 hover:bg-orange-400 hover:text-white cursor-pointer relative w-[177px]">
                    Serv-Festa (Aluguel)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                    <div className="absolute hidden group-hover:block z-20 top-full left-0 w-full">
                        <div className="flex flex-col-reverse divide-y-5 divide-y-reverse divide-black bg-yellow-500">
                            <Link href="#" className="w-full text-sm px-3 py-1 hover:bg-orange-400 hover:text-white" >Mesa/Cadeiras</Link>
                            <Link href="#" className="w-full text-sm px-3 py-1 hover:bg-orange-400 hover:text-white whitespace-nowrap" >Caixa Térmica</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}