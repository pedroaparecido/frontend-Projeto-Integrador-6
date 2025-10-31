/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"

export default function ProductCard({ product, addToCart }: any) {
    if (!product) {
        return <div className="text-black text-center text-xl font-bold"></div>
    }

    const [hover1, setHover1] = useState(false)
    const [hover2, setHover2] = useState(false)
    const [hover3, setHover3] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    const imgStyle1 = { backgroundColor: hover1 ? 'red' : 'white' }
    const imgStyle2 = { backgroundColor: hover2 ? 'green' : 'white' }
    const imgStyle3 = { backgroundColor: hover3 ? 'rgb(250, 204, 21)' : 'white' }

    return (
        <div className="flex flex-col items-center justify-center">
            
            <div className="flex flex-row items-start bg-yellow-400 p-4 rounded-xl pb-[40px] shadow-2xl w-[600px]">
                <div className="flex flex-col w-[417px] object-cover">
                    <img src={product.source} alt={product.title} className="rounded-lg mb-2" />
                    <div className="text-white p-2">
                        <h3 className="text-xl font-bold">{product.title}</h3>
                        <p className="text-sm">{product.description}</p>
                        <span className="text-lg font-bold">Valor: R${product.price}</span>
                    </div>
                </div>
                <div className="flex flex-col-reverse items-center justify-end divide-y-4 divide-y-reverse divide-black w-[80px] border-solid border-1">
                     <img className="w-full h-full object-cover cursor-pointer rounded-b-lg" src="https://placehold.co/80x80/FF0000/FFFFFF?text=-" alt="menos" style={imgStyle1} onMouseEnter={() => setHover1(true)} onMouseLeave={() => setHover1(false)} />
                     <img className="w-full h-full object-cover cursor-pointer" src="https://placehold.co/80x80/FFC107/000000?text=🛒" alt="carrinho" style={imgStyle3} onMouseEnter={() => setHover3(true)} onMouseLeave={() => setHover3(false)} onClick={() => addToCart(product)} />
                     <img className="w-full h-full object-cover cursor-pointer rounded-t-lg" src="https://placehold.co/80x80/008000/FFFFFF?text=+" alt="mais" style={imgStyle2} onMouseEnter={() => setHover2(true)} onMouseLeave={() => setHover2(false)} />
                </div>
            </div>
        </div>
    )
}