
import { useState } from 'react'
import { seedDemoData } from '../services/vendors.js'

function SeedPage() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSeed() {
    setLoading(true)
    setMessage('Seeding...')

    try {
      const res = await fetch('/api/vendors.json')

      if (!res.ok) {
        throw new Error('Could not load vendors.json')
      }

      const vendors = await res.json()

      if (!Array.isArray(vendors)) {
        throw new Error('Vendor data must be an array')
      }

      const totalMenuItems = vendors.reduce(
        (total, vendor) => total + (vendor.menu?.length || 0),
        0
      )

      // Check every menu item has a valid spiceLevel
      for (const vendor of vendors) {
        for (const item of vendor.menu || []) {
          if (
            !Number.isInteger(item.spiceLevel) ||
            item.spiceLevel < 0 ||
            item.spiceLevel > 3
          ) {
            throw new Error(
              `Invalid spiceLevel for ${item.name} (${item.id})`
            )
          }
        }
      }

      const result = await seedDemoData(vendors)

      setMessage(
        `Success! ${result.vendorCount} vendors and ${result.menuCount} menu items written to Firestore.`
      )
    } catch (err) {
      console.error('Seeding error:', err)
      setMessage(`Failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card">
      <h2 className="section-title">Seed Firestore</h2>

      <button
        className="btn"
        onClick={handleSeed}
        disabled={loading}
      >
        {loading ? 'Seeding...' : 'Load demo data'}
      </button>

      {message && <p role="status">{message}</p>}
    </section>
  )
}

export default SeedPage