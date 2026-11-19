
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

import { useAuth } from '../hooks/useAuth.js'
import { authErrorMessage } from '../authErrors.js'

function LoginPage() {
  const { login, loginWithGoogle } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const goTo = location.state?.from ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // Login using email and password
  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setBusy(true)

    try {
      await login(email, password)
      navigate(goTo, { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  // Login using Google
  async function handleGoogle() {
    setError('')

    try {
      await loginWithGoogle()
      navigate(goTo, { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
    }
  }

  return (
    <section className="card">
      <h2 className="section-title">Log in</h2>

      <form onSubmit={handleSubmit} className="form">

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="field-error">{error}</p>
        )}

        <button
          type="submit"
          className="btn"
          disabled={busy}
        >
          {busy ? 'Logging in…' : 'Log in'}
        </button>

        <button
          type="button"
          className="btn"
          onClick={handleGoogle}
        >
          Continue with Google
        </button>

        <p className="muted">
          No account?{' '}
          <Link
            to="/register"
            state={location.state}
          >
            Register
          </Link>
        </p>

      </form>
    </section>
  )
}

export default LoginPage
