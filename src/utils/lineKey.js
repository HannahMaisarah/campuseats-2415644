export function lineKey(line) {
  return `${line.item.id}:${line.spice ?? ''}:${line.temp ?? ''}`
}