function VendorCard({ vendor, isSelected, onSelect }) {
  const { id, name, location, openHours, isOpen } = vendor

  return (
    <button
      type="button"
      className={isSelected ? 'card vendor selected' : 'card vendor'}
      onClick={() => onSelect(id)}
    >
      <div className="thumb">{name.charAt(0)}</div>
      <div className="vendor-info">
        <h3>{name}</h3>
        <p className="muted">{location}</p>
        <p className="muted">Open: {openHours}</p>
        <span className={isOpen ? 'status open' : 'status closed'}>
          {isOpen ? 'Open now' : 'Closed'}
        </span>
      </div>
    </button>
  )
}

export default VendorCard