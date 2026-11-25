
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  writeBatch,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

import { db } from '../firebase.js'

// Create one order per vendor in the cart
export async function placeOrders(user, cart, details) {
  const byVendor = new Map()

  for (const line of cart) {
    const vendorId = line.item.vendorId

    if (!vendorId) {
      throw new Error(
        `Vendor information is missing for ${line.item.name}. Please revisit the vendor menu and add the item again.`,
      )
    }

    const lines = byVendor.get(vendorId) ?? []
    byVendor.set(vendorId, [...lines, line])
  }

  const batch = writeBatch(db)

  for (const [vendorId, lines] of byVendor) {
    const ref = doc(collection(db, 'orders'))

    batch.set(ref, {
      studentUid: user.uid,
      studentName: details.name,
      mahallah: details.mahallah,
      pickupTime: details.pickupTime,
      vendorId,
      vendorName: lines[0].item.vendorName,
      items: lines.map(({ item, qty }) => ({
        itemId: item.id,
        name: item.name,
        price: item.price,
        qty,
      })),
      total: lines.reduce(
        (sum, { item, qty }) => sum + item.price * qty,
        0,
      ),
      status: 'Received',
      createdAt: serverTimestamp(),
    })
  }

  await batch.commit()
}

// Listen only to the signed-in student's orders
export function subscribeToMyOrders(uid, onData, onError) {
  const q = query(
    collection(db, 'orders'),
    where('studentUid', '==', uid),
  )

  return onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }))

      // Sort newest first
      orders.sort(
        (a, b) =>
          (b.createdAt?.toMillis?.() ?? Date.now()) -
          (a.createdAt?.toMillis?.() ?? Date.now()),
      )

      onData(orders)
    },
    onError,
  )
}

// Update the pickup time of an order
export function changePickupTime(orderId, pickupTime) {
  return updateDoc(
    doc(db, 'orders', orderId),
    { pickupTime }
  )
}

// Cancel an order by deleting its document
export function cancelOrder(orderId) {
  return deleteDoc(
    doc(db, 'orders', orderId)
  )
}
