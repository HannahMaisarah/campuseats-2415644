import { NavLink } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function Header() {
  const { count } = useCart()

  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>
      <nav className="nav">
        {/* "end" stops "/" from being highlighted on every page */}
        <NavLink to="/" end>Vendors</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/cart">
          Cart <span className="badge">{count}</span>
        </NavLink>
      </nav>
    </header>
  )
}

export default Header