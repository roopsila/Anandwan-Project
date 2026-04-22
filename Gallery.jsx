import './Gallery.css'

const images = [
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5UcD6qY5YD_biN0s_BuKUkiWRVVhCq7LkQg&s', caption: 'Anandwan Main Gate' },
  { src: 'https://api.sfarmsindia.com/images/product/38760d1b7e9406d002f95e48581d4071---sharp', caption: 'Agricultural Fields' },
  { src: 'https://images.livemint.com/r/LiveMint/Period1/2014/12/20/Photos/baba3-kbvF--465x310@LiveMint.jpg', caption: 'Handicraft Workshop' },
  { src: 'https://pbs.twimg.com/media/Fofa_GuaAAAfngc.jpg', caption: 'Community Life' },
  { src: 'https://fmc.org.in/wp-content/uploads/2024/09/Manjuri-Taid2-1024x683.jpg', caption: 'Women Artisans' },
  { src: 'https://media.assettype.com/freepressjournal/2026-03-16/d5fea68u/WhatsApp-Image-2026-03-16-at-1.01.00-PM.jpeg', caption: 'Nature & Greenery' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="gallery">
      <h2 className="section-title">Gallery</h2>
      <p className="section-sub">A glimpse into the world of Anandwan</p>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <div className="gallery-item" key={i}>
            <img src={img.src} alt={img.caption} />
            <div className="gallery-caption">{img.caption}</div>
          </div>
        ))}
      </div>
    </section>
  )
}