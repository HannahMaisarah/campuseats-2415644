import { Link } from 'react-router'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'
import { useCart } from '../hooks/useCart.js'
import { lineKey } from '../utils/lineKey.js'

function CartPage() {
  const { cart, total, changeQty, removeFromCart } = useCart()

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
          {cart.map((line) => (
            <CartItem
            key={lineKey(line)}
            line={line}
            onChangeQty={changeQty}
            onRemove={removeFromCart}
            />
          ))}
        </ul>
        <p className="cart-total">Total: RM {total.toFixed(2)}</p>
      </div>
      <CheckoutForm />
    </div>
  )
}

export default CartPage