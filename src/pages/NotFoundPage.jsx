import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <div className="card">
      <h2>404</h2>
      <p className="muted">No page here.</p>
      <Link to="/">Go to the home page</Link>
    </div>
  )
}

export default NotFoundPage