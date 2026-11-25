
import {
  collection,
  doc,
  onSnapshot,
  writeBatch,
  query,
  where,
} from 'firebase/firestore'

import { db } from '../firebase.js'

// Listen to all vendors
export function subscribeToVendors(onData, onError) {
  return onSnapshot(
    collection(db, 'vendors'),
    (snapshot) =>
      onData(
        snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      ),
    onError
  )
}

// Listen to one vendor
export function subscribeToVendor(vendorId, onData, onError) {
  return onSnapshot(
    doc(db, 'vendors', vendorId),
    (snap) =>
      onData(
        snap.exists()
          ? { id: snap.id, ...snap.data() }
          : null
      ),
    onError
  )
}

// Listen to one vendor's menu filtered by spice level
export function subscribeToMenu(
  vendorId,
  onData,
  onError,
  maxSpiceLevel = 3
) {
  const menuRef = collection(db, 'vendors', vendorId, 'menu')

  const menuQuery = query(
    menuRef,
    where('spiceLevel', '<=', maxSpiceLevel)
  )

  return onSnapshot(
    menuQuery,
    (snapshot) =>
      onData(
        snapshot.docs.map((d) => ({
          id: d.id,
          vendorId,
          ...d.data(),
        }))
      ),
    onError
  )
}

// Copy vendor and menu data into Firestore
export async function seedDemoData(vendors) {
  const batch = writeBatch(db)

  let menuCount = 0

  for (const { menu = [], id, ...vendor } of vendors) {
    if (!id) {
      throw new Error('A vendor is missing its ID')
    }

    // Write vendor document
    batch.set(
      doc(db, 'vendors', id),
      vendor
    )

    // Write each menu item into the menu subcollection
    for (const { id: itemId, ...item } of menu) {
      if (!itemId) {
        throw new Error(`A menu item in ${id} is missing its ID`)
      }

      if (
        !Number.isInteger(item.spiceLevel) ||
        item.spiceLevel < 0 ||
        item.spiceLevel > 3
      ) {
        throw new Error(
          `Invalid spiceLevel for menu item: ${item.name}`
        )
      }

      batch.set(
        doc(db, 'vendors', id, 'menu', itemId),
        item
      )

      menuCount++
    }
  }

  // Commit all writes to Firestore
  await batch.commit()

  return {
    vendorCount: vendors.length,
    menuCount,
  }
}