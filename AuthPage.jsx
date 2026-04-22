import { useState } from 'react'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { useEffect } from 'react'
import './AuthPage.css'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useCart()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u)
        navigate('/')
      }
    })
    return () => unsub()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, email, password)
        setUser(result.user)
        navigate('/')
      } else {
        if (name.trim().length < 2) {
          setError('Please enter your full name.')
          setLoading(false)
          return
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters.')
          setLoading(false)
          return
        }
        const result = await createUserWithEmailAndPassword(auth, email, password)
        setUser(result.user)
        navigate('/')
      }
    } catch (err) {
      const msg = err.code
      if (msg === 'auth/email-already-in-use') setError('This email is already registered. Please login.')
      else if (msg === 'auth/invalid-email') setError('Please enter a valid email address.')
      else if (msg === 'auth/wrong-password') setError('Incorrect password. Please try again.')
      else if (msg === 'auth/user-not-found') setError('No account found with this email. Please sign up.')
      else if (msg === 'auth/invalid-credential') setError('Incorrect email or password. Please try again.')
      else setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🌿 Anandwan</div>
        <h2>{isLogin ? 'Welcome back' : 'Create account'}</h2>
        <p className="auth-sub">
          {isLogin ? 'Login to place your order' : 'Join us to support Anandwan'}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Min 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
              setEmail('')
              setPassword('')
              setName('')
            }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}