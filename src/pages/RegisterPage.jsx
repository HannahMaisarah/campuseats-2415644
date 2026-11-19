
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import { useAuth } from '../hooks/useAuth.js'
import { authErrorMessage } from '../authErrors.js'

function RegisterPage() {
  const { register } = useAuth()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setBusy(true)

    if (name.trim().length < 3) {
      setError('Enter your name (at least 3 characters).')
      setBusy(false)
      return
    }

    try {
      await register(name.trim(), email, password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="card">
      <h2 className="section-title">Create an account</h2>

      <form onSubmit={handleSubmit} className="form">

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          {busy ? 'Creating…' : 'Register'}
        </button>

        <p className="muted">
          Already registered?{' '}
          <Link to="/login">
            Log in
          </Link>
        </p>

      </form>
    </section>
  )
}

export default RegisterPage
