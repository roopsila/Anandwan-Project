import './Impact.css'

const stats = [
  { number: '75+', label: 'Years of Service' },
  { number: '5000+', label: 'Lives Empowered' },
  { number: '500+', label: 'Acres of Land' },
  { number: '3', label: 'Branches Across India' },
]

const branches = [
  { name: 'Anandwan', location: 'Warora, Chandrapur', focus: 'Main Campus — Leprosy Rehabilitation' },
  { name: 'Ashokawan', location: 'Maharashtra', focus: 'Tribal Development' },
  { name: 'Lok Biradari Prakalp', location: 'Hemalkasa', focus: 'Healthcare for Tribals (Dr. Prakash Amte)' },
]

export default function Impact() {
  return (
    <section id="impact" className="impact">
      <h2 className="section-title">Our Impact</h2>
      <p className="section-sub">75 years of transforming lives and landscapes</p>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <h3>{s.number}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>

      <h3 className="branch-title">Our Branches</h3>
      <div className="branches">
        {branches.map((b, i) => (
          <div className="branch-card" key={i}>
            <h4>{b.name}</h4>
            <p className="loc">📍 {b.location}</p>
            <p>{b.focus}</p>
          </div>
        ))}
      </div>
    </section>
  )
}