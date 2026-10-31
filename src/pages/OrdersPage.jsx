import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import { lineKey } from '../utils/lineKey.js'
import { describeLine } from '../utils/spice.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <div className="card">
        <p className="muted">You have not placed any orders yet.</p>
        <Link to="/">Browse vendors</Link>
      </div>
    )
  }

  return (
    <section>
      <h2 className="section-title">Your orders</h2>
      {orders.map((order) => (
        <article key={order.id} className="card order">
          <h3>
            Order for {order.name}{' '}
            <span className="muted">
              · {new Date(order.placedAt).toLocaleString('en-MY')}
            </span>
          </h3>
          <p className="muted">
            Pickup {order.pickupTime} at Mahallah {order.mahallah}
          </p>
          <ul className="order-items">
            {order.items.map((line) => (
              <li key={lineKey(line)}>
                <span>
                  {line.qty} × {line.item.name}
                  {describeLine(line) && (
                    <em className="muted"> · {describeLine(line)}</em>
                  )}
                </span>
                <span>RM {(line.item.price * line.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: RM {order.total.toFixed(2)}</p>
        </article>
      ))}
    </section>
  )
}

export default OrdersPage