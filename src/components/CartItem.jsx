import { lineKey } from '../utils/lineKey.js'
import { describeLine } from '../utils/spice.js'

function CartItem({ line, onChangeQty, onRemove }) {
  const { item, qty } = line
  const key = lineKey(line)
  const choice = describeLine(line)

  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>
        {choice && <p className="choice">{choice}</p>}
        <p className="muted">RM {item.price.toFixed(2)} each</p>
      </div>
      <div className="qty">
        <button type="button" onClick={() => onChangeQty(key, -1)}>−</button>
        <span>{qty}</span>
        <button type="button" onClick={() => onChangeQty(key, 1)}>+</button>
      </div>
      <p className="line-total">RM {(item.price * qty).toFixed(2)}</p>
      <button type="button" className="link danger" onClick={() => onRemove(key)}>
        Remove
      </button>
    </li>
  )
}

export default CartItem