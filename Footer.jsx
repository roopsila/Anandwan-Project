import './Footer.css'

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-grid">
        <div>
          <h3>🌿 Anandwan</h3>
          <p>Forest of Happiness<br/>Empowering lives through dignity and self-sufficiency since 1949.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#gallery">Gallery</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <p>📍 Warora, Chandrapur District<br/>Maharashtra, India — 442914</p>
          <p>📞 07176-221041</p>
          <p>🌐 <a href="https://anandwan.in" target="_blank" rel="noreferrer">anandwan.in</a></p>
        </div>
        <br/>
        <br/>
        <div>
          <h4>Developer Contact</h4>
          <p>Roopam Dhaddha</p>
          <p>📍 Ramdeobaba University, Nagpur<br/>Maharashtra, India — 440013</p>
          <p>📞 98346 60892</p>
        </div>
        <div>
          <h4>Project By</h4>
          <p>Section A8 — CEP Group 3</p>
          <p>Community Engagement Program</p>
          <p>🎓 Built with React + Vite</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Made with ❤️ by CEP Section A8 Group 3</p>
      </div>
    </footer>
  )
}