import { useState } from 'react'
import OptionPicker from './OptionPicker.jsx'
import {
  SPICE_LABELS,
  TEMP_LABELS,
  defaultTemp,
  hasSpiceChoice,
  isDrink,
} from '../utils/spice.js'

const SPICE_OPTIONS = SPICE_LABELS.map((label, level) => ({
  value: level,
  label: label === 'Not spicy' ? 'None' : label, // short label so 4 buttons fit
}))
const TEMP_OPTIONS = Object.entries(TEMP_LABELS).map(([value, label]) => ({ value, label }))

function MenuItemCard({ item, onAdd }) {
  const { name, description, price, category, spiceLevel } = item
  const available = item.available !== false
  const food = hasSpiceChoice(item)
  const drink = isDrink(item)
  const [spice, setSpice] = useState(spiceLevel ?? 0)
  const [temp, setTemp] = useState(() => defaultTemp(item))

  function handleAdd() {
    if (food) onAdd(item, { spice })
    else if (drink) onAdd(item, { temp })
    else onAdd(item, {})
  }

  return (
    <article className="card menu-item">
      <div className="menu-item-top">
        <div className="thumb">{name.charAt(0)}</div>
        <div className="tags">
          {category && <span className="tag">{category}</span>}
          {spiceLevel > 0 && <span className="tag spice">{`Spicy ×${spiceLevel}`}</span>}
        </div>
      </div>

      <h3>{name}</h3>
      <p className="muted desc">{description}</p>
      <p className="price">RM {price.toFixed(2)}</p>

      <div className="menu-item-actions">
        {food && (
          <OptionPicker
            label="Spice level"
            options={SPICE_OPTIONS}
            value={spice}
            onChange={setSpice}
          />
        )}
        {drink && (
          <OptionPicker
            label="Serve"
            options={TEMP_OPTIONS}
            value={temp}
            onChange={setTemp}
          />
        )}
        <button type="button" className="btn" disabled={!available} onClick={handleAdd}>
          {available ? 'Add to cart' : 'Sold out'}
        </button>
      </div>
    </article>
  )
}

export default MenuItemCard