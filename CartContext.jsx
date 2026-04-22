import { useState } from 'react'
import { CartContext } from './CartContextObject'   // 👈 import from new file

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id)

      if (exists) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }

      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (id) =>
    setCart(prev => prev.filter(i => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id)

    setCart(prev =>
      prev.map(i => (i.id === id ? { ...i, qty } : i))
    )
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((sum, i) => {
    const price = parseInt(i.price.replace(/[^\d]/g, '')) || 0
    return sum + price * i.qty
  }, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        total,
        user,
        setUser
      }}
    >
      {children}
    </CartContext.Provider>
  )
}