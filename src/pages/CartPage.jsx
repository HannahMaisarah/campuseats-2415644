
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import { lineKey } from '../utils/lineKey.js'
import { placeOrders } from '../services/orders.js'

function CartPage() {
  const {
    cart,
    total,
    changeQty,
    removeFromCart,
    clearCart
  } = useCart()

  const { user } = useAuth()
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handlePlaceOrder(details) {
    setError('')
    setSubmitting(true)

    try {
      // Save the order to Firestore
      await placeOrders(user, cart, details)

      // Clear the cart only after the Firestore write succeeds
      clearCart()

      // Navigate to the Orders page
      navigate('/orders')
    } catch (err) {
      console.error('Order placement failed:', err)
      setError(err.message || 'Unable to place your order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="card">
        <p className="muted">Your cart is empty.</p>
        <Link to="/">Pick something from a menu</Link>
      </div>
    )
  }

  return (
    <div className="cart-layout">
      <div className="card">
        <h2 className="section-title">Your cart</h2>

        <ul className="cart-list">
          {cart.map(line => (
            <CartItem
              key={lineKey(line)}
              line={line}
              onChangeQty={changeQty}
              onRemove={removeFromCart}
            />
          ))}
        </ul>

        <p className="cart-total">
          Total: RM {total.toFixed(2)}
        </p>
      </div>

      <CheckoutForm
        defaultName={user?.displayName || ''}
        onPlaceOrder={handlePlaceOrder}
      />

      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default CartPage
