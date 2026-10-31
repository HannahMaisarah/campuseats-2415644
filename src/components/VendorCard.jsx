import { Link } from 'react-router'

function VendorCard({ vendor }) {
  const { id, name, location, openHours, isOpen } = vendor

  return (
    <Link to={`/vendor/${id}`} className="card vendor">
      <div className="thumb">{name.charAt(0)}</div>
      <div className="vendor-info">
        <h3>{name}</h3>
        <p className="muted">{location}</p>
        <p className="muted">Open: {openHours}</p>
        <span className={isOpen ? 'status open' : 'status closed'}>
          {isOpen ? 'Open now' : 'Closed'}
        </span>
      </div>
    </Link>
  )
}

export default VendorCard