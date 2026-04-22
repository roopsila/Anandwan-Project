import { useState } from 'react'
import './DonatePage.css'

const branches = [
  {
    id: 1,
    name: 'Anandwan',
    location: 'Warora, Chandrapur',
    desc: 'Main campus — rehabilitation of leprosy patients, disabled individuals, and the destitute through self-sufficient farming, healthcare, and education.',
    color: '#2d6a4f',
    light: '#d8f3dc',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Anandwan_Main_Gate.jpg/640px-Anandwan_Main_Gate.jpg',
    upi: 'anandwan@sbi',
    account: '1234567890',
    ifsc: 'SBIN0001234',
    bank: 'State Bank of India',
    qr: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=anandwan@sbi%26pn=Anandwan%26cu=INR',
  },
  {
    id: 2,
    name: 'Ashokawan',
    location: 'Warora, Maharashtra',
    desc: 'Tribal development center focused on education and livelihood for underprivileged tribal communities in the region.',
    color: '#1d6986',
    light: '#d0eaf5',
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500',
    upi: 'ashokawan@sbi',
    account: '0987654321',
    ifsc: 'SBIN0001235',
    bank: 'State Bank of India',
    qr: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=ashokawan@sbi%26pn=Ashokawan%26cu=INR',
  },
  {
    id: 3,
    name: 'Somnath',
    location: 'Maharashtra',
    desc: 'Community project providing shelter, food, and skill training to marginalized populations across rural Maharashtra.',
    color: '#7b5e2a',
    light: '#f5e6c8',
    img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=500',
    upi: 'somnath@sbi',
    account: '1122334455',
    ifsc: 'SBIN0001236',
    bank: 'State Bank of India',
    qr: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=somnath@sbi%26pn=Somnath%26cu=INR',
  },
  {
    id: 4,
    name: 'Lok Biradari Prakalp',
    location: 'Hemalkasa, Gadchiroli',
    desc: 'Founded by Dr. Prakash Amte — providing free healthcare, education, and wildlife rescue deep in the tribal forests of Gadchiroli.',
    color: '#6b3fa0',
    light: '#ede0f5',
    img: 'https://images.unsplash.com/photo-1470076892663-af684e5e15af?w=500',
    upi: 'lbp@sbi',
    account: '5544332211',
    ifsc: 'SBIN0001237',
    bank: 'State Bank of India',
    qr: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=lbp@sbi%26pn=LokBiradariPrakalp%26cu=INR',
  },
]

export default function DonatePage() {
  const [selected, setSelected] = useState(null)
  const [method, setMethod] = useState('upi')
  const [copied, setCopied] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const branch = branches.find(b => b.id === selected)

  const copy = (text, label) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    if (!donorName.trim()) { alert('Please enter your name'); return }
    if (!amount || parseInt(amount) < 1) { alert('Please enter donation amount'); return }
    setConfirmed(true)
  }

  if (confirmed && branch) {
    return (
      <div className="dn-page">
        <div className="dn-success">
          <div className="dn-success-icon">🙏</div>
          <h2>Thank You, {donorName}!</h2>
          <p>Your donation of <strong>₹{amount}</strong> to <strong>{branch.name}</strong> has been recorded.</p>
          <p className="dn-success-note">Please complete the payment using the QR or bank details shown earlier. Your generosity builds the Forest of Happiness.</p>
          <button className="dn-success-btn" onClick={() => { setConfirmed(false); setSelected(null); setAmount(''); setDonorName(''); setDonorEmail('') }}>
            Donate Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dn-page">

      <div className="dn-hero">
        <h1>Support Anandwan</h1>
        <p>Your donation empowers lives across 4 communities founded by Baba Amte</p>
      </div>

      {!selected && (
        <>
          <h2 className="dn-section-title">Choose a branch to support</h2>
          <div className="dn-branches">
            {branches.map(b => (
              <div className="dn-branch-card" key={b.id} onClick={() => setSelected(b.id)} style={{ '--bc': b.color, '--bl': b.light }}>
                <div className="dn-branch-img-wrap">
                  <img src={b.img} alt={b.name} />
                </div>
                <div className="dn-branch-body">
                  <h3 style={{ color: b.color }}>{b.name}</h3>
                  <p className="dn-branch-loc">📍 {b.location}</p>
                  <p className="dn-branch-desc">{b.desc}</p>
                  <button className="dn-donate-btn" style={{ background: b.color }}>
                    Donate to {b.name} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selected && branch && (
        <div className="dn-form-wrap">
          <button className="dn-back" onClick={() => setSelected(null)}>← Back to branches</button>

          <div className="dn-form-layout">

            {/* Left col */}
            <div className="dn-left">

              {/* Branch info */}
              <div className="dn-selected-branch" style={{ borderColor: branch.color, background: branch.light }}>
                <img src={branch.img} alt={branch.name} className="dn-selected-img" />
                <div>
                  <h3 style={{ color: branch.color }}>{branch.name}</h3>
                  <p className="dn-branch-loc">📍 {branch.location}</p>
                  <p style={{ fontSize: '0.85rem', color: '#555', marginTop: 6 }}>{branch.desc}</p>
                </div>
              </div>

              {/* Donor info + amount */}
              <form className="dn-box" onSubmit={handleConfirm}>
                <h4>Your Details</h4>
                <div className="dn-field">
                  <label>Full Name *</label>
                  <input value={donorName} onChange={e => setDonorName(e.target.value)} placeholder="Your name" required />
                </div>
                <div className="dn-field">
                  <label>Email (optional)</label>
                  <input type="email" value={donorEmail} onChange={e => setDonorEmail(e.target.value)} placeholder="you@email.com" />
                </div>
                <div className="dn-field">
                  <label>Donation Amount (₹) *</label>
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount" min="1" required />
                </div>

                <div className="dn-presets">
                  {[100, 250, 500, 1000, 2500, 5000].map(p => (
                    <button
                      type="button"
                      key={p}
                      className={`dn-preset ${amount === String(p) ? 'active' : ''}`}
                      style={amount === String(p) ? { background: branch.color, color: '#fff', borderColor: branch.color } : {}}
                      onClick={() => setAmount(String(p))}
                    >
                      ₹{p}
                    </button>
                  ))}
                </div>

                <button type="submit" className="dn-confirm-btn" style={{ background: branch.color }}>
                  Confirm Donation →
                </button>
              </form>

              {/* Tax benefit */}
              <div className="dn-tax-box" style={{ borderColor: branch.color }}>
                <h5>🏷️ 80G Tax Exemption</h5>
                <p>All donations to Anandwan are eligible for 50% tax deduction under Section 80G of the Income Tax Act.</p>
              </div>
            </div>

            {/* Right col — payment methods */}
            <div className="dn-right">
              <div className="dn-box">
                <h4>How to Pay</h4>

                <div className="dn-methods">
                  <button
                    className={`dn-method-btn ${method === 'upi' ? 'active' : ''}`}
                    style={method === 'upi' ? { borderColor: branch.color, background: branch.light } : {}}
                    onClick={() => setMethod('upi')}
                  >
                    📱 Scan QR / UPI
                    <span>GPay · PhonePe · Paytm</span>
                  </button>
                  <button
                    className={`dn-method-btn ${method === 'bank' ? 'active' : ''}`}
                    style={method === 'bank' ? { borderColor: branch.color, background: branch.light } : {}}
                    onClick={() => setMethod('bank')}
                  >
                    🏦 Bank Transfer
                    <span>NEFT · RTGS · IMPS</span>
                  </button>
                </div>

                {/* QR */}
                {method === 'upi' && (
                  <div className="dn-upi">
                    <div className="dn-qr-wrap">
                      <img src={branch.qr} alt="UPI QR Code" className="dn-qr" />
                      <p className="dn-qr-label">Scan with any UPI app</p>
                    </div>
                    <div className="dn-upi-id">
                      <span>UPI ID:</span>
                      <strong>{branch.upi}</strong>
                      <button
                        className="dn-copy-btn"
                        style={{ background: branch.color }}
                        onClick={() => copy(branch.upi, 'upi')}
                      >
                        {copied === 'upi' ? '✓ Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="dn-apps">
                      <span>Open in:</span>
                      <a href={`gpay://upi/pay?pa=${branch.upi}&pn=${branch.name}&cu=INR${amount ? '&am=' + amount : ''}`} className="dn-app-btn">GPay</a>
                      <a href={`phonepe://pay?pa=${branch.upi}&pn=${branch.name}&cu=INR${amount ? '&am=' + amount : ''}`} className="dn-app-btn">PhonePe</a>
                      <a href={`paytmmp://pay?pa=${branch.upi}&pn=${branch.name}&cu=INR${amount ? '&am=' + amount : ''}`} className="dn-app-btn">Paytm</a>
                    </div>
                    <p className="dn-upi-note">After payment, take a screenshot as proof of donation.</p>
                  </div>
                )}

                {/* Bank */}
                {method === 'bank' && (
                  <div className="dn-bank">
                    {[
                      { label: 'Account Name', value: branch.name },
                      { label: 'Account Number', value: branch.account },
                      { label: 'IFSC Code', value: branch.ifsc },
                      { label: 'Bank', value: branch.bank },
                    ].map(row => (
                      <div className="dn-bank-row" key={row.label}>
                        <span className="dn-bank-label">{row.label}</span>
                        <span className="dn-bank-value">{row.value}</span>
                        <button
                          className="dn-copy-btn"
                          style={{ background: branch.color }}
                          onClick={() => copy(row.value, row.label)}
                        >
                          {copied === row.label ? '✓' : 'Copy'}
                        </button>
                      </div>
                    ))}
                    <p className="dn-bank-note">
                      After transferring, email your transaction ID to <strong>donate@anandwan.in</strong> to receive your 80G certificate.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}