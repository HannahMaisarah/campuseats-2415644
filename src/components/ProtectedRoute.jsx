
import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { Loading } from './Status.jsx'

function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  // Check loading first to prevent flashing the login page
  if (loading) return <Loading />

  // Redirect unauthenticated users to login
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  // If authenticated, render the protected page
  return <Outlet />
}

export default ProtectedRoute
