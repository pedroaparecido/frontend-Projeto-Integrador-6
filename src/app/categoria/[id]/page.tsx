/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Nav from "@/components/Nav/Nav"
import ProductNavbar from "@/components/ProductNavbar/ProductNavbar"
import ProductCard from "@/components/ProductCard/ProductCard"

/**
import { useParams } from "next/navigation"

export default function RotasDinamicas() {
    const params = useParams()
    
    return(
        <div>
            <h1>Rotas dinamicas</h1>
            <h1>{params.id}</h1>
        </div>
    )
}
     */
export default function Products({ visivel }: any) {

    return(
        <div className="flex min-h-[90vh] bg-gradient-to-b from-orange-400 via-orange-50 to-white w-screen">
            <ProductNavbar />
            <Nav visivel={visivel} />
            <ProductCard />
        </div>
    )
}