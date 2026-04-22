import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Gallery from './components/Gallery'
import Impact from './components/Impact'
import Footer from './components/Footer'
import CartPage from './pages/CartPage'
import AuthPage from './pages/AuthPage'
import DonatePage from './pages/DonatePage'
import './App.css'

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Products />
      <Gallery />
      <Impact />
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/donate" element={<DonatePage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App