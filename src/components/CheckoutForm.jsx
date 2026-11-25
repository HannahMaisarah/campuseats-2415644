import { useEffect, useState } from 'react'

function CheckoutForm({
  defaultName = '',
  onPlaceOrder,
  submitting = false
}) {
  const [values, setValues] = useState({
    name: defaultName,
    mahallah: '',
    pickupTime: ''
  })

  const [error, setError] = useState('')

  useEffect(() => {
    setValues(prev => ({
      ...prev,
      name: defaultName
    }))
  }, [defaultName])

  function handleChange(event) {
    const { name, value } = event.target

    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (values.name.trim().length < 3) {
      setError('Please enter your full name.')
      return
    }

    if (!values.mahallah) {
      setError('Please select your Mahallah.')
      return
    }

    if (!values.pickupTime) {
      setError('Please select your pickup time.')
      return
    }

    if (
      values.pickupTime < '07:00' ||
      values.pickupTime > '22:00'
    ) {
      setError('Pickup time must be between 07:00 and 22:00.')
      return
    }

    try {
      await onPlaceOrder({
        ...values,
        name: values.name.trim()
      })
    } catch (err) {
      setError(err.message || 'Unable to submit your order.')
    }
  }

  const fieldStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginBottom: '12px'
  }

  return (
    <form
      className="card checkout-form"
      onSubmit={handleSubmit}
    >
      <h2 className="section-title">Checkout</h2>

      {/* Full Name */}
      <div style={fieldStyle}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </div>

      {/* Mahallah */}
      <div style={fieldStyle}>
        <label htmlFor="mahallah">Mahallah</label>
        <select
          id="mahallah"
          name="mahallah"
          value={values.mahallah}
          onChange={handleChange}
          required
        >
          <option value="">Select Mahallah</option>
          {[
            'Ali',
            'Aminah',
            'Faruq',
            'Asiah',
            'Bilal',
            'Hafsa',
            'Uthman',
            'Zubair'
          ].map(mahallah => (
            <option key={mahallah} value={mahallah}>
              {mahallah}
            </option>
          ))}
        </select>
      </div>

      {/* Pickup Time */}
      <div style={fieldStyle}>
        <label htmlFor="pickupTime">Pickup Time</label>
        <input
          id="pickupTime"
          name="pickupTime"
          type="time"
          min="07:00"
          max="22:00"
          value={values.pickupTime}
          onChange={handleChange}
          required
        />
      </div>

      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn"
        disabled={submitting}
      >
        {submitting ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  )
}

export default CheckoutForm