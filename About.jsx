import './About.css'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-text">
          <h2>About Anandwan</h2>
          <p>
            <strong>Anandwan</strong> (meaning "Forest of Happiness") is a world-renowned ashram and 
            rehabilitation community founded by <strong>Baba Amte</strong> in 1949, located near 
            Warora, Chandrapur district, Maharashtra.
          </p>
          <p>
            It was established to provide dignity, care, and rehabilitation to leprosy patients and 
            underprivileged individuals. Today it is a fully self-sufficient ecosystem supporting 
            thousands of people through agriculture, healthcare, education, and craftsmanship.
          </p>
          <p>
            Managed by <strong>Maharogi Sewa Samiti</strong>, Anandwan has grown from barren land 
            into a flourishing community over 75+ years under the continued leadership of 
            Dr. Vikas Amte.
          </p>
          <div className="awards">
            <span>🏅 Ramon Magsaysay Award (1985)</span>
            <span>🕊️ Gandhi Peace Prize (1999)</span>
            <span>🌿 75+ Years of Service</span>
          </div>
        </div>
        <div className="about-img">
          <img 
            src="https://www.sabera.co/wp-content/uploads/2021/10/Dr-Prakash-Amte.jpg" 
            alt="Baba Amte - Founder of Anandwan"
          />
          <p className="caption">Baba Amte — Founder of Anandwan</p>
        </div>
      </div>
    </section>
  )
}