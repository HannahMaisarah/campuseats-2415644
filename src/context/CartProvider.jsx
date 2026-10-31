import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { lineKey } from '../utils/lineKey.js'

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])
  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  function addToCart(item, choice = {}) {
    const newLine = { item, qty: 1, ...choice }
    const key = lineKey(newLine)
    setCart((prev) => {
      const exists = prev.some((line) => lineKey(line) === key)
      if (exists) {
        return prev.map((line) =>
          lineKey(line) === key ? { ...line, qty: line.qty + 1 } : line,
        )
      }
      return [...prev, newLine]
    })
  }

  function changeQty(key, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          lineKey(line) === key ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0),
    )
  }

  function removeFromCart(key) {
    setCart((prev) => prev.filter((line) => lineKey(line) !== key))
  }

  function placeOrder(details) {
    const order = {
      id: Date.now(),
      placedAt: new Date().toISOString(),
      items: cart,
      total,
      ...details,
    }
    setOrders((prev) => [order, ...prev])
    setCart([])
  }

  const value = {
    cart,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    placeOrder,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}