import { useState, useEffect } from 'react'
import { useCart } from '../context/useCart'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import {
  EMAIL_SERVICE_ID,
  EMAIL_PUBLIC_KEY,
  BUYER_TEMPLATE_ID,
  SELLER_TEMPLATE_ID,
  NGO_EMAIL
} from '../emailConfig'
import './CartPage.css'
import { auth } from '../firebase' 

export default function CartPage() {
  const { cart, removeFromCart, updateQty, clearCart, total } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState('cart')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', pincode: '' })
  const [orderId] = useState(() => 'ANW-' + Math.random().toString(36).slice(-6).toUpperCase())

  // ✅ Initialize EmailJS on mount
  useEffect(() => {
    if (EMAIL_PUBLIC_KEY) {
      emailjs.init(EMAIL_PUBLIC_KEY)
    }
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleOrder = async (e) => {
    e.preventDefault()

    // Must be logged in
    if (!auth.currentUser) {
      navigate('/auth')
      return
    }

    setLoading(true)

    const itemsList = cart
      .map(i => {
        const p = parseInt(i.price.replace(/[^\d]/g, '')) || 0
        return `• ${i.name} × ${i.qty} = ₹${p * i.qty}`
      })
      .join('\n')

    const fullAddress = `${form.address}, ${form.city} - ${form.pincode}`

    // ✅ Match these keys EXACTLY to your EmailJS {{brackets}}
    const commonParams = {
      order_id: orderId,
      items: itemsList,
      total: total,
      buyer_name: form.name,
      phone: form.phone,
      address: fullAddress,
      // Fixes for your specific templates:
      gmail: form.email,        // Required for Buyer Template To-Email: {{gmail}}
      email: form.email,        // Required for Seller Template Reply-To: {{email}}
      buyer_email: form.email,  // Used in your Seller Template body
      name: form.name,          // Used in "From Name" field in your screenshots
    }

    try {
      // 1. Email to buyer (Confirmation)
      await emailjs.send(
        EMAIL_SERVICE_ID,
        BUYER_TEMPLATE_ID,
        commonParams,
        EMAIL_PUBLIC_KEY
      )

      // 2. Email to NGO/Seller (Order Received)
      // Note: Dashboard has "To Email" hardcoded to anandwanproducts@gmail.com
      await emailjs.send(
        EMAIL_SERVICE_ID,
        SELLER_TEMPLATE_ID,
        commonParams,
        EMAIL_PUBLIC_KEY
      )

      clearCart()
      setStep('success')
    } catch (err) {
      console.error('Email error:', err)
      // If it fails, we alert so you can debug the specific error in the console
      alert("There was an issue sending the confirmation email. Please check your connection.")
      clearCart()
      setStep('success')
    }

    setLoading(false)
  }

  // --- RENDERING LOGIC ---

  if (step === 'success') {
    return (
      <div className="cp-page">
        <div className="cp-success">
          <div className="cp-success-icon">✅</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for supporting Anandwan. A confirmation email has been sent to <strong>{form.email}</strong>.</p>
          <div className="cp-order-id">Order ID: <strong>{orderId}</strong></div>
          <p className="cp-success-note">Our team will contact you within 24 hours for delivery details.</p>
          <button className="cp-continue-btn" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="cp-page">
        <div className="cp-empty">
          <div className="cp-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Discover handcrafted products made with love by Anandwan artisans</p>
          <button className="cp-continue-btn" onClick={() => navigate('/')}>Browse Products</button>
        </div>
      </div>
    )
  }

  return (
    <div className="cp-page">
      <div className="cp-progress">
        <div className={`cp-step ${step === 'cart' ? 'active' : 'done'}`}>
          <span className="cp-step-dot">{step !== 'cart' ? '✓' : '1'}</span>
          <span>Cart</span>
        </div>
        <div className="cp-step-line" />
        <div className={`cp-step ${step === 'form' ? 'active' : ''}`}>
          <span className="cp-step-dot">2</span>
          <span>Details</span>
        </div>
        <div className="cp-step-line" />
        <div className="cp-step">
          <span className="cp-step-dot">3</span>
          <span>Confirm</span>
        </div>
      </div>

      {step === 'cart' && (
        <div className="cp-layout">
          <div className="cp-items-col">
            <h2 className="cp-col-title">Your Cart <span className="cp-count">{cart.reduce((s,i)=>s+i.qty,0)} items</span></h2>
            {cart.map(item => {
              const unitPrice = parseInt(item.price.replace(/[^\d]/g,'')) || 0
              return (
                <div className="cp-card" key={item.id}>
                  <div className="cp-card-img-wrap">
                    <img src={item.img} alt={item.name} className="cp-card-img" />
                    <span className="cp-card-cat">{item.category}</span>
                  </div>
                  <div className="cp-card-body">
                    <div className="cp-card-top">
                      <h3 className="cp-card-name">{item.name}</h3>
                      <button className="cp-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                    <p className="cp-card-desc">{item.desc}</p>
                    <div className="cp-card-bottom">
                      <div className="cp-qty">
                        <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                      <div className="cp-card-price">
                        <span className="cp-unit">₹{unitPrice} each</span>
                        <span className="cp-subtotal">₹{unitPrice * item.qty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="cp-summary-col">
            <div className="cp-summary-box">
              <h3 className="cp-summary-title">Order Summary</h3>
              <div className="cp-summary-impact">
                <span className="cp-impact-icon">🌿</span>
                <p>Your purchase directly empowers Anandwan artisans</p>
              </div>
              <div className="cp-summary-row"><span>Subtotal</span><span>₹{total}</span></div>
              <div className="cp-summary-row green"><span>Delivery</span><span>FREE</span></div>
              <div className="cp-summary-total"><span>Total</span><span>₹{total}</span></div>
              <button className="cp-checkout-btn" onClick={() => setStep('form')}>
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'form' && (
        <div className="cp-form-layout">
          <form className="cp-form" onSubmit={handleOrder}>
            <h2 className="cp-col-title">Delivery Details</h2>
            <div className="cp-form-section">
              <h4>Contact Information</h4>
              <div className="cp-form-row">
                <div className="cp-field">
                  <label>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="cp-field">
                  <label>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="cp-field">
                <label>Phone Number *</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} required />
              </div>
            </div>
            <div className="cp-form-section">
              <h4>Delivery Address</h4>
              <div className="cp-field">
                <label>Street Address *</label>
                <input name="address" value={form.address} onChange={handleChange} required />
              </div>
              <div className="cp-form-row">
                <div className="cp-field">
                  <label>City *</label>
                  <input name="city" value={form.city} onChange={handleChange} required />
                </div>
                <div className="cp-field">
                  <label>PIN Code *</label>
                  <input name="pincode" value={form.pincode} onChange={handleChange} required maxLength={6} />
                </div>
              </div>
            </div>
            <div className="cp-form-actions">
              <button type="button" className="cp-back-btn" onClick={() => setStep('cart')}>← Back</button>
              <button type="submit" className="cp-place-btn" disabled={loading}>
                {loading ? '⏳ Placing Order...' : `Place Order — ₹${total}`}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}