import { useState } from 'react'
import './Products.css'
import { useCart } from '../context/useCart'

const categories = ['All', 'Handicrafts', 'Agriculture', 'Textiles', 'Healthcare']

const products = [
  { id: 1, name: 'Handwoven Basket', category: 'Handicrafts', price: '₹350', img: 'https://thumbs.dreamstime.com/b/woven-baskets-were-made-bamboo-sheet-thailand-photo-140584845.jpg', desc: 'Beautifully handcrafted baskets made by skilled artisans at Anandwan.' },
  { id: 2, name: 'Organic Honey', category: 'Agriculture', price: '₹280', img: 'https://myonlinevipani.com/wp-content/uploads/2020/08/Big-Honey.jpg', desc: 'Pure organic honey harvested from Anandwan\'s own bee farms.' },
  { id: 3, name: 'Hand-block Printed Saree', category: 'Textiles', price: '₹1200', img: 'https://img1.wsimg.com/isteam/ip/94c75bd3-d2dc-4c9e-993d-8d3c5b55c523/IMG_5624.JPG', desc: 'Elegant sarees with traditional block prints made by women artisans.' },
  { id: 4, name: 'Earthen Pottery', category: 'Handicrafts', price: '₹450', img: 'https://content.jdmagicbox.com/v2/comp/ahmedabad/n3/079pxx79.xx79.190311210149.t1n3/catalogue/pottery-iqbal-makarba-ahmedabad-pottery-manufacturers-5yx22sxne5.jpg', desc: 'Handmade clay pottery reflecting traditional Indian craftsmanship.' },
  { id: 5, name: 'Organic Rice', category: 'Agriculture', price: '₹120/kg', img: 'https://naturelandorganics.com/cdn/shop/files/WhatsApp_Image_2024-05-08_at_4.39.07_PM_1.jpg', desc: 'Farm-fresh organic rice grown on Anandwan\'s agricultural land.' },
  { id: 6, name: 'Cotton Khadi Fabric', category: 'Textiles', price: '₹180/m', img: 'https://craftatlas.co/wp-content/uploads/2020/07/1590830774_e856ca4a967bac5833b430befa1ffad3.jpg', desc: 'Handspun and handwoven khadi fabric promoting self-reliance.' },
  { id: 7, name: 'Herbal Medicine', category: 'Healthcare', price: '₹550', img: 'https://dgayurvedic.com/wp-content/uploads/2021/03/Arya-Vaidya-Pharmacy-Brahmi-Thailam-1-scaled.jpg', desc: 'Natural herbal remedies prepared using traditional Ayurvedic methods.' },
  { id: 8, name: 'Bamboo Handicraft', category: 'Handicrafts', price: '₹220', img: 'https://www.wbkvib.org.in/media/mj/s/img/images/M_images/Untitled-2copy-Copy.png', desc: 'Eco-friendly bamboo products crafted by Anandwan residents.' },
]

export default function Products() {
  const [active, setActive] = useState('All')
  const { cart, addToCart } = useCart()   

  const filtered =
    active === 'All'
      ? products
      : products.filter(p => p.category === active)

  return (
    <section id="products" className="products">
      <h2 className="section-title">Our Products</h2>
      <p className="section-sub">Every purchase empowers a life at Anandwan</p>

      <div className="filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${active === cat ? 'active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}

        {cart.length > 0 && (
          <span className="cart-badge">🛒 {cart.length} items</span>
        )}
      </div>

      <div className="products-grid">
        {filtered.map(p => (
          <div className="product-card" key={p.id}>
            <img src={p.img} alt={p.name} />

            <div className="product-info">
              <span className="cat-tag">{p.category}</span>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>

              <div className="product-footer">
                <span className="price">{p.price}</span>

                {/* ✅ USE CONTEXT FUNCTION */}
                <button
                  className="add-btn"
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}