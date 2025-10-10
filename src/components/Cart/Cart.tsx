/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useCart } from "@/context/CartContext"
import CartItem from "../CartItem/CartItem"

export default function CardCart() {
    const { cartItems } = useCart()
    
    return(
        <section className="grid grid-cols-7 w-[200px] h-[200px] gap-[10px]">
            {cartItems.length > 0 ? (
                cartItems.map((cartItem: any) => (
                    <CartItem key={cartItem._id} data={cartItem} />
                ))
            ) : (
                <div className="text-white">Seu carrinho está vazio.</div>
            )}
        </section>
    )
}