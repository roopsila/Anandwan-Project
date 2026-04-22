import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay">
        <h1>Welcome to <span>Anandwan</span></h1>
        <h1>Made by A8 Sec </h1>
        <p>Forest of Happiness — Empowering Lives Through Dignity & Self-Sufficiency</p>
        <p className="hero-sub">Founded by <strong>Baba Amte</strong> in 1949 · Warora, Chandrapur, Maharashtra</p>
        <div className="hero-buttons">
          <a href="#products" className="btn-primary">Explore Products</a>
          <a href="#about" className="btn-secondary">Our Story</a>
        </div>
      </div>
    </section>
  )
}