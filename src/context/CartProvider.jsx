import { useMemo } from 'react'
import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { useAuth } from '../hooks/useAuth.js'

export function CartProvider({ children }) {
  const { user, loading } = useAuth()

  // Setiap pengguna mempunyai troli dan sejarah pesanan sendiri.
  const cartKey = user?.uid
    ? `ce-cart-${user.uid}`
    : 'ce-cart-guest'

  const ordersKey = user?.uid
    ? `ce-orders-${user.uid}`
    : 'ce-orders-guest'

  const [cart, setCart] = useLocalStorage(cartKey, [])
  const [orders, setOrders] = useLocalStorage(ordersKey, [])

  // Tambah produk ke dalam troli.
  function addToCart(item) {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (line) => line.item.id === item.id
      )

      if (existingItem) {
        return previousCart.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...previousCart, { item, qty: 1 }]
    })
  }

  // Ubah kuantiti produk dalam troli.
  function changeQty(itemId, delta) {
    setCart((previousCart) =>
      previousCart
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  // Buang produk daripada troli.
  function removeFromCart(itemId) {
    setCart((previousCart) =>
      previousCart.filter((line) => line.item.id !== itemId)
    )
  }

  // Bentuk pesanan berdasarkan kandungan troli.
  function placeOrder(details) {
    const order = {
      id: `order-${Date.now()}`,
      items: cart,
      total: cart.reduce(
        (sum, line) => sum + line.item.price * line.qty,
        0
      ),
      ...details,
      placedAt: new Date().toISOString(),
    }

    setOrders((previousOrders) => [...previousOrders, order])
    setCart([])

    return order
  }

  // Kira jumlah unit dalam troli.
  const count = cart.reduce(
    (sum, line) => sum + line.qty,
    0
  )

  // Kira jumlah harga semua produk.
  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  )

  const contextValue = useMemo(
    () => ({
      cart: user ? cart : [],
      orders: user ? orders : [],
      count: user ? count : 0,
      total: user ? total : 0,
      addToCart,
      changeQty,
      removeFromCart,
      placeOrder,
    }),
    [user, cart, orders, count, total]
  )

  // Tunggu Firebase menentukan status pengguna sebelum memaparkan data troli.
  if (loading) {
    return null
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}