import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cart, user, setUser } = useCart() // 1. Get setUser from context
  const navigate = useNavigate()

  const itemCount = cart.reduce((s, i) => s + i.qty, 0)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUser(null)      // 2. Clear local state immediately
      setOpen(false)     // 3. Close mobile menu
      navigate('/auth')  // 4. Redirecting to auth is often better for UX
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  return (
    <nav className="navbar">
      <div className="logo">🌿 <span>Anandwan</span></div>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        <li><a href="/#home" onClick={() => setOpen(false)}>Home</a></li>
        <li><a href="/#about" onClick={() => setOpen(false)}>About</a></li>
        <li><a href="/#products" onClick={() => setOpen(false)}>Products</a></li>
        <li><a href="/#gallery" onClick={() => setOpen(false)}>Gallery</a></li>
        <li><a href="/#impact" onClick={() => setOpen(false)}>Impact</a></li>
        <li><Link to="/donate" onClick={() => setOpen(false)}>Donate</Link></li>
      </ul>

      <div className="nav-right">
        <Link to="/cart" className="cart-icon">
          🛒 {itemCount > 0 && (
            <span className="cart-count">{itemCount}</span>
          )}
        </Link>

        {user ? (
          <button className="auth-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/auth" className="auth-btn">Login</Link>
        )}
      </div>

      <button className="hamburger" onClick={() => setOpen(!open)}>☰</button>
    </nav>
  )
}