function MenuItemCard({ item, onAdd }) {
  const { name, description, price, category } = item
  // Items in the JSON may not have an "available" field; treat missing as available.
  const available = item.available !== false

  return (
    <article className="card menu-item">
      <div className="thumb">{name.charAt(0)}</div>
      {category && <span className="tag">{category}</span>}
      <h3>{name}</h3>
      {description && <p className="muted">{description}</p>}
      <p className="price">RM {price.toFixed(2)}</p>
      <button
        type="button"
        className="btn"
        disabled={!available}
        onClick={() => onAdd(item)}
      >
        {available ? 'Add to cart' : 'Sold out'}
      </button>
    </article>
  )
}

export default MenuItemCard