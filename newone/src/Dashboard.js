import React, { useState } from 'react';
import './First.css';

const Dashboard = () => {
  // ALL STATE HOOKS TOGETHER
  const [showPayment, setShowPayment] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [searchedNumbers, setSearchedNumbers] = useState(new Set());

  const options = [
    'All Numbers', 'Premium Numbers', 'VIP Numbers', 'Golden Numbers', 
    'Lucky Numbers', 'Repeating', 'Sequential', 'Mirror', 'Birthday',
    'Custom Pattern', 'Royal Numbers', 'Business Numbers', 'Show More...'
  ];

  const numbers = Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    number: `+91 ${Math.floor(9000000000 + Math.random() * 1000000000)}`,
    price: Math.floor(999 + Math.random() * 9001),
    type: ['Premium', 'VIP', 'Golden', 'Lucky'][Math.floor(Math.random() * 4)],
    status: ['Available', 'Reserved', 'Sold'][Math.floor(Math.random() * 3)]
  }));

  const filteredNumbers = numbers.filter(num => 
    num.number.includes(searchTerm) &&
    (priceFilter === 'all' || num.price <= parseInt(priceFilter))
  );

  const handleSearch = () => {
    const searched = new Set(searchedNumbers);
    filteredNumbers.forEach(num => searched.add(num.id));
    setSearchedNumbers(searched);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className='head_up'>
        <div className='logo'>
          <img src="https://via.placeholder.com/120x40/00d4ff/ffffff?text=NUMBERS" alt="Logo" />
          <span>Fancy Numbers</span>
        </div>
        <div className='premimum'>
          <a href="#premium" className="premium-link">Premium Numbers</a>
          <a href="#about" className="about-link">About</a>
        </div>
      </header>

      {/* WhatsApp Fixed Button */}
      <a 
        href="https://wa.me/917995191729?text=Hi%20I%20want%20this%20fancy%20number" 
        className="whatsapp-fixed" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <div className="whatsapp-icon">💬</div>
      </a>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search fancy numbers (0-9 only)..."
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setSearchTerm(value);
            }}
          />
          <button onClick={handleSearch}>🔍 Search</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="sidebar">
          <div className="filter-group">
            <h3>Filters</h3>
            <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
              <option value="all">All Prices</option>
              <option value="2000">Under ₹2000</option>
              <option value="5000">Under ₹5000</option>
              <option value="10000">Under ₹10K</option>
            </select>
          </div>

          <div className="options-group">
            <h3>Categories ({options.length})</h3>
            {options.map(option => (
              <div key={option} className="option-item">
                {option}
              </div>
            ))}
          </div>
        </div>

        <div className="numbers-grid">
          {filteredNumbers.slice(0, 24).map(number => (
            <div key={number.id} 
                 className={`number-card ${number.status.toLowerCase()} ${searchedNumbers.has(number.id) ? 'searched' : ''}`}>
              <div className="number-display">{number.number}</div>
              <div className="number-type">{number.type}</div>
              <div className="number-price">₹{number.price.toLocaleString()}</div>
              <div className="number-status">{number.status}</div>
              <button className="buy-btn"
                      onClick={() => {
                        setSelectedNumber(number);
                        setShowPayment(true);
                      }}
              >
                Buy Now
              </button>
            </div>
          ))}
          <div className="show-more-card">
            <h3>Show More Numbers</h3>
            <p>Load more fancy numbers...</p>
          </div>
        </div>  {/* ✅ Fixed: removed "/+." */}
      </div>

      {/* Payment Popup - MULTI PAYMENT METHODS */}
{showPayment && selectedNumber && (
  <div className="payment-popup">
    <div className="popup-content">
      <button className="close-btn" onClick={() => setShowPayment(false)}>×</button>
      <h2>Buy: {selectedNumber.number}</h2>
      <div className="number-preview">{selectedNumber.number}</div>
      <div className="price-display">₹{selectedNumber.price.toLocaleString()}</div>
      
      <h3>Select Payment Method</h3>
      
      {/* 10 Payment Methods */}
      <div className="payment-methods">
        <a href={`https://wa.me/917995191729?text=Hi!%20Buy%20${selectedNumber.number}%20via%20PhonePe`} className="payment-btn phonepe">
          <img src="https://via.placeholder.com/30x30/00a86b/ffffff?text=PP" alt="PhonePe" /> PhonePe
        </a>
        
        <a href={`https://wa.me/917995191729?text=Hi!%20Buy%20${selectedNumber.number}%20via%20GooglePay`} className="payment-btn googlepay">
          <img src="https://via.placeholder.com/30x30/34a853/ffffff?text=GP" alt="Google Pay" /> Google Pay
        </a>
        
        <a href={`https://wa.me/917995191729?text=Hi!%20Buy%20${selectedNumber.number}%20via%20Paytm`} className="payment-btn paytm">
          <img src="https://via.placeholder.com/30x30/00a651/ffffff?text=PT" alt="Paytm" /> Paytm
        </a>
        
        <a href={`https://wa.me/917995191729?text=Hi!%20Buy%20${selectedNumber.number}%20via%20UPI`} className="payment-btn upi">
          <img src="https://via.placeholder.com/30x30/512da8/ffffff?text=UPI" alt="UPI" /> UPI ID
        </a>
        
        <a href={`https://wa.me/917995191729?text=Hi!%20Buy%20${selectedNumber.number}%20via%20AmazonPay`} className="payment-btn amazonpay">
          <img src="https://via.placeholder.com/30x30/ff9900/000?text=AP" alt="Amazon Pay" /> Amazon Pay
        </a>
        
        <a href={`https://wa.me/917995191729?text=Hi!%20Buy%20${selectedNumber.number}%20via%20Freecharge`} className="payment-btn freecharge">
          <img src="https://via.placeholder.com/30x30/00b140/fff?text=FC" alt="Freecharge" /> Freecharge
        </a>
        
        <a href={`https://wa.me/917995191729?text=Hi!%20Buy%20${selectedNumber.number}%20via%20Mobikwik`} className="payment-btn mobikwik">
          <img src="https://via.placeholder.com/30x30/ee4b2b/fff?text=MK" alt="Mobikwik" /> Mobikwik
        </a>
        
        <a href={`https://wa.me/917995191729?text=Hi!%20Buy%20${selectedNumber.number}%20via%20BHIM`} className="payment-btn bhim">
          <img src="https://via.placeholder.com/30x30/0072bc/fff?text=BHIM" alt="BHIM" /> BHIM UPI
        </a>
        
        <a href={`https://wa.me/917995191729?text=Hi!%20Buy%20${selectedNumber.number}%20Card`} className="payment-btn card">
          <img src="https://via.placeholder.com/30x30/000/fff?text=CC" alt="Card" /> Credit/Debit Card
        </a>
        
        <a href={`https://wa.me/917995191729?text=Hi!%20Buy%20${selectedNumber.number}%20Netbanking`} className="payment-btn netbanking">
          <img src="https://via.placeholder.com/30x30/657886/fff?text=NB" alt="Netbanking" /> Net Banking
        </a>
      </div>
      
      <p className="contact-note">Contact seller for payment details</p>
    </div>
  </div>
)}


      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#help">Help</a>
        </div>
        <div className="footer-bottom">
          © 2026 Fancy Numbers. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;  // ✅ ONE COMPONENT, ONE EXPORT
