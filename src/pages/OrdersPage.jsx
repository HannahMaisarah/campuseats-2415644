
import { Link } from 'react-router'

import { useMyOrders } from '../hooks/useMyOrders.js'
import { Loading } from '../components/Status.jsx'
import OrderStatus from '../components/OrderStatus.jsx'
import OrderActions from '../components/OrderActions.jsx'

function OrdersPage() {
  const {
    orders = [],
    loading,
    error
  } = useMyOrders()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="card">
        <p className="field-error">{error}</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="card">
        <p className="muted">
          You have not placed any orders yet.
        </p>

        <Link to="/">
          Browse vendors
        </Link>
      </div>
    )
  }

  return (
    <section>
      <h2 className="section-title">
        Your orders
      </h2>

      {orders.map(order => (
        <article
          key={order.id}
          className="card order"
        >
          <h3>
            Order for {order.studentName}

            <span className="muted">
              {' · '}
              {order.createdAt?.toDate
                ? order.createdAt
                    .toDate()
                    .toLocaleString('en-MY')
                : 'Just placed'}
            </span>
          </h3>

          <p className="muted">
            Vendor: {order.vendorName}
          </p>

          <p className="muted">
            Pickup {order.pickupTime} at Mahallah {order.mahallah}
          </p>

          <OrderStatus status={order.status} />

          {/* B5: Show actions only while order is Received */}
          {order.status === 'Received' && (
            <OrderActions order={order} />
          )}

          <ul className="order-items">
            {order.items.map((line, index) => (
              <li key={line.itemId || index}>
                <span>
                  {line.qty} × {line.name}
                </span>

                <span>
                  RM {(line.price * line.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <p className="cart-total">
            Total: RM {order.total.toFixed(2)}
          </p>
        </article>
      ))}
    </section>
  )
}

export default OrdersPage