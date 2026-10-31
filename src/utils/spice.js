export const SPICE_LABELS = ['Not spicy', 'Mild', 'Medium', 'Hot']
export const TEMP_LABELS = { hot: 'Hot', iced: 'Iced' }

const DRINK_CATEGORIES = ['drinks', 'beverage']
const NO_CHOICE_CATEGORIES = ['desserts', 'dessert', 'bakery']
const category = (item) => (item.category ?? '').toLowerCase()

export function isDrink(item) {
  return DRINK_CATEGORIES.includes(category(item))
}

export function hasSpiceChoice(item) {
  return !isDrink(item) && !NO_CHOICE_CATEGORIES.includes(category(item))
}

export function defaultTemp(item) {
  return /iced|ais|cold|juice/i.test(item.name) ? 'iced' : 'hot'
}

export function describeLine(line) {
  if (line.spice !== undefined) return `Spice: ${SPICE_LABELS[line.spice]}`
  if (line.temp) return TEMP_LABELS[line.temp]
  return null
}