
import { Link, useParams } from 'react-router'
import { useVendor } from '../hooks/useVendor.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  const { id } = useParams()

  const {
    vendor,
    menu,
    loading,
    error,
    maxSpiceLevel,
    setMaxSpiceLevel,
  } = useVendor(id)

  if (loading) return <Loading />

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => window.location.reload()}
      />
    )
  }

  if (!vendor) {
    return (
      <p>
        Vendor not found. <Link to="/">Back to vendors</Link>
      </p>
    )
  }

  // Each menu item needs its vendor information for checkout
  const items = menu.map((item) => ({
    ...item,
    vendorName: vendor.name,
  }))

  return (
    <section>
      <p>
        <Link to="/">← All vendors</Link>
      </p>

      <h2 className="section-title">{vendor.name}</h2>

      <p className="muted">
        {vendor.location} · {vendor.openHours}
      </p>

      {/* B6.3: Spice-level filter */}
      <div style={{ margin: '20px 0' }}>
        <label htmlFor="spiceFilter">
          <strong>Filter by spice level:</strong>
        </label>

        <select
          id="spiceFilter"
          value={maxSpiceLevel}
          onChange={(e) => setMaxSpiceLevel(Number(e.target.value))}
          style={{ marginLeft: '10px' }}
        >
          <option value={0}>Not spicy only</option>
          <option value={1}>Up to Mild</option>
          <option value={2}>Up to Medium</option>
          <option value={3}>All spice levels</option>
        </select>
      </div>

      <MenuList items={items} />
    </section>
  )
}

export default VendorPage