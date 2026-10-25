import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import CartPage from './components/CartPage.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
  // Fetched data
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  // UI state
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([]) // lines of { item, qty }
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null)

  // Fetch vendors from the mock API, with cleanup.
  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setVendors(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])

  function handleRetry() {
    setError(null)
    setLoading(true)
    setReloadKey((k) => k + 1)
  }

  // Derived: selected vendor, falling back to the first one once data arrives.
  const selectedVendor =
    vendors.find((v) => v.id === selectedVendorId) ?? vendors[0] ?? null

  // Cart handlers
  function handleAddToCart(item) {
    setCart((prev) => {
      const exists = prev.some((line) => line.item.id === item.id)
      if (exists) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        )
      }
      return [...prev, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0),
    )
  }

  function handleRemove(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  // Derived: badge shows total quantity
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

  let content
  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2>Order placed</h2>
        {lastOrder && (
          <>
            <p>
              Thank you, <strong>{lastOrder.name}</strong>! Please collect your order
              at <strong>{lastOrder.pickupTime}</strong> (Mahallah {lastOrder.mahallah}).
            </p>
            <p className="cart-total">Total: RM {lastOrder.total.toFixed(2)}</p>
          </>
        )}
        <button type="button" className="btn" onClick={() => setView('menu')}>
          Back to vendors
        </button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={handleRetry} />
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={selectedVendor?.id === vendor.id}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App