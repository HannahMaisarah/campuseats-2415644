
import { useEffect, useState } from 'react'

import {
  subscribeToVendor,
  subscribeToMenu
} from '../services/vendors.js'

export function useVendor(vendorId) {
  const [vendor, setVendor] = useState(undefined)
  const [menu, setMenu] = useState([])
  const [error, setError] = useState(null)

  // B6: Maximum spice level selected by the user
  const [maxSpiceLevel, setMaxSpiceLevel] = useState(3)

  useEffect(() => {
    setVendor(undefined)
    setMenu([])
    setError(null)

    const stopVendor = subscribeToVendor(
      vendorId,
      setVendor,
      (err) => setError(err.message)
    )

    const stopMenu = subscribeToMenu(
      vendorId,
      setMenu,
      (err) => setError(err.message),
      maxSpiceLevel
    )

    // Clean up both Firestore listeners
    return () => {
      stopVendor()
      stopMenu()
    }
  }, [vendorId, maxSpiceLevel])

  return {
    vendor,
    menu,
    loading: vendor === undefined && !error,
    error,
    maxSpiceLevel,
    setMaxSpiceLevel
  }
}
