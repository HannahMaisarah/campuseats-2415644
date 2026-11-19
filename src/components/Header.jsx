import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">Cart</NavLink>

        {user ? (
          <>
            <span className="user-name">
              Hi, {user.displayName || user.email}
            </span>

            <button
              type="button"
              className="link"
              onClick={handleLogout}
            >
              Log out
            </button>
          </>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  )
}

export default Header