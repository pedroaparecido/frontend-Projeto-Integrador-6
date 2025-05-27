'use client'

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