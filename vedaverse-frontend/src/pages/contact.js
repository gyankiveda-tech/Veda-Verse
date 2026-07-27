import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('TRANSMITTING...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('MESSAGE_SENT_SUCCESSFULLY');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('TRANSMISSION_ERROR');
      }
    } catch (error) {
      console.error(error);
      setStatus('CONNECTION_FAILED');
    }
    
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <div className="contact-root no-select">
      <Navbar />

      {/* Sticky Sub-Navigation */}
      <div className="sticky-subnav">
        <ul className="subnav-links">
          <li><Link href="/community#announcements">News</Link></li>
          <li><Link href="/community#devlog">Devlog</Link></li>
          <li><Link href="/community#newsletter">Network</Link></li>
          <li><Link href="/changelog">Changelog</Link></li>
          <li><Link href="/contact" className="active">Support</Link></li>
        </ul>
      </div>

      <main className="contact-container">
        
        <header className="page-header">
          <h4 className="utility-tag">SECURE COMMS</h4>
          <h1 className="cinzel-title">COMMUNICATION <span className="gold">LINK</span></h1>
          <div className="ember-line-center"></div>
          <p className="subtitle">HAVE AN INQUIRY OR ISSUE WITH THE SIMULATION? CONNECT WITH US.</p>
        </header>

        <div className="contact-grid">
          
          {/* Support Info Panel */}
          <div className="info-panel">
            <div className="info-item">
              <span className="label">OFFICIAL_EMAIL</span>
              <p className="value">financehubstudio@gmail.com</p>
            </div>
            
            <div className="info-item">
              <span className="label">COMM_LINK (PHONE)</span>
              <p className="value">+91 8521077293</p>
            </div>

            <div className="info-item">
              <span className="label">AVAILABILITY</span>
              <p className="value">10:00 AM - 06:00 PM (IST)</p>
            </div>

            <div className="neural-alert">
              <p>Note: For financial or verification issues, please include your <strong>Reference ID</strong> or Transaction details in the transmission.</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>NODE_NAME</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div className="input-group">
              <label>SECURE_EMAIL</label>
              <input 
                type="email" 
                placeholder="Your email address" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="input-group">
              <label>MESSAGE_PAYLOAD</label>
              <textarea 
                rows="5" 
                placeholder="Describe your query..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              {status || 'TRANSMIT_MESSAGE'}
            </button>

            {status && (
              <p style={{ 
                fontSize: '0.75rem', 
                color: status.includes('ERROR') || status.includes('FAILED') ? '#ff6b6b' : '#c5a059', 
                textAlign: 'center',
                fontFamily: 'Inter, monospace',
                letterSpacing: '1px'
              }}>
                {status}
              </p>
            )}
          </form>

        </div>
      </main>

      <Footer />

      <style jsx>{`
        .contact-root {
          background-color: var(--ink, #030303);
          color: var(--paper, #f4f0eb);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        /* Sticky Sub-Nav */
        .sticky-subnav {
          position: sticky;
          top: 70px;
          background: rgba(3, 3, 3, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-subtle, rgba(244,240,235,0.08));
          z-index: 900;
          padding: 15px 0;
          display: flex;
          justify-content: center;
        }

        .subnav-links {
          list-style: none;
          display: flex;
          gap: 40px;
          margin: 0;
          padding: 0;
        }

        .subnav-links a {
          color: var(--paper-dim, #d0c8be);
          text-decoration: none;
          font-family: 'Inter', monospace;
          font-size: 0.8rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: 0.3s ease;
        }

        .subnav-links a:hover, .subnav-links a.active {
          color: var(--ember, #c5a059);
        }

        .contact-container {
          padding: 100px 5% 100px;
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .utility-tag {
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          letter-spacing: 3px;
          color: var(--ember, #c5a059);
          text-transform: uppercase;
        }

        .cinzel-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 400;
          letter-spacing: 2px;
          margin: 15px 0 0 0;
        }

        .gold { color: var(--ember, #c5a059); }

        .ember-line-center {
          width: 50px; height: 1px; background: var(--ember, #c5a059); margin: 25px auto;
        }

        .subtitle {
          color: var(--paper-dim, #d0c8be);
          font-family: 'Inter', monospace;
          font-size: 0.8rem;
          letter-spacing: 2px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 50px;
        }

        .info-panel {
          background: #080808;
          padding: 40px;
          border: 1px solid #1a1a1a;
          border-left: 2px solid var(--ember, #c5a059);
        }

        .info-item {
          margin-bottom: 30px;
        }

        .info-item:last-child {
          margin-bottom: 0;
        }

        .label {
          display: block;
          font-size: 0.7rem;
          color: #777;
          font-family: 'Inter', monospace;
          letter-spacing: 2px;
        }

        .value {
          font-size: 1.05rem;
          color: var(--paper, #f4f0eb);
          margin-top: 5px;
          font-weight: 400;
        }

        .neural-alert {
          background: rgba(197, 160, 89, 0.05);
          border: 1px dashed rgba(197, 160, 89, 0.3);
          padding: 20px;
          margin-top: 40px;
          font-size: 0.9rem;
          color: var(--paper-dim, #d0c8be);
          line-height: 1.6;
          font-weight: 300;
        }

        .neural-alert strong {
          color: var(--paper, #f4f0eb);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
          background: #080808;
          border: 1px solid #1a1a1a;
          padding: 40px;
        }

        .input-group label {
          display: block;
          font-size: 0.75rem;
          color: var(--ember, #c5a059);
          margin-bottom: 8px;
          font-family: 'Inter', monospace;
          letter-spacing: 1.5px;
        }

        .input-group input,
        .input-group textarea {
          width: 100%;
          background: #030303;
          border: 1px solid #222;
          padding: 15px;
          color: var(--paper, #f4f0eb);
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          transition: 0.3s;
          border-radius: 2px;
        }

        .input-group input:focus,
        .input-group textarea:focus {
          border-color: var(--ember, #c5a059);
          outline: none;
          background: #050505;
        }

        .submit-btn {
          background: var(--paper, #f4f0eb);
          color: var(--ink, #030303);
          border: none;
          padding: 16px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: 0.3s;
          letter-spacing: 2px;
          font-size: 0.85rem;
          margin-top: 10px;
        }

        .submit-btn:hover {
          background: var(--ember, #c5a059);
        }

        @media (max-width: 768px) {
          .sticky-subnav {
            overflow-x: auto;
            justify-content: flex-start;
            padding: 15px 20px;
          }
          .subnav-links { gap: 20px; }
          .contact-grid { grid-template-columns: 1fr; }
          .contact-container { padding-top: 80px; }
          .contact-form, .info-panel { padding: 30px 20px; }
        }
      `}</style>
    </div>
  );
}