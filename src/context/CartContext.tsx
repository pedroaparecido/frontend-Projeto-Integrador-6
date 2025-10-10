'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useContext } from 'react'

interface Product {
  _id: any
  image: string
  title: string
  description: string
  categoria: any
  price: number
  quantity: number
}

interface CartContextType {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
}

const CartContext = createContext<CartContextType | null>(null)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}

export const CartProvider = ({ children }: any) => {
  const [cartItems, setCartItems] = useState<Product[]>([])

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item._id === product._id)
    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item._id !== productId))
  }

  // O valor que será disponibilizado
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
