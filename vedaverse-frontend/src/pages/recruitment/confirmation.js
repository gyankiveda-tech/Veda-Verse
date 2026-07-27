import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Navbar = dynamic(() => import('../../components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../../components/Footer'), { ssr: false });

export default function Confirmation() {
  const [refNumber, setRefNumber] = useState('');

  useEffect(() => {
    // Generate a premium-looking dummy reference number on load
    const randomHex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0');
    setRefNumber(`VV-REQ-${randomHex}`);
  }, []);

  return (
    <div className="recruitment-root no-select">
      <Head>
        <title>Application Received | Vedaverse Studio</title>
        <meta name="description" content="Your application to Vedaverse Studio has been successfully received." />
      </Head>

      <Navbar />

      {/* Sticky Sub-Navigation */}
      <div className="sticky-subnav">
        <ul className="subnav-links">
          <li><Link href="/recruitment">Studio</Link></li>
          <li><Link href="/recruitment#culture">Culture</Link></li>
          <li><Link href="/recruitment/positions">Positions</Link></li>
          <li><Link href="/recruitment/process">Process</Link></li>
          <li><Link href="/recruitment/faq">FAQ</Link></li>
        </ul>
      </div>

      <main className="confirmation-main">
        <div className="container">
          
          <div className="confirmation-card">
            
            <div className="success-icon">
              <div className="inner-dot"></div>
            </div>

            <header className="page-header">
              <h4 className="utility-tag">TRANSMISSION SUCCESSFUL</h4>
              <h1 className="cinzel-title">APPLICATION <span className="gold">RECEIVED</span></h1>
              <div className="ember-line-center"></div>
            </header>

            <div className="confirmation-content">
              <div className="ref-box">
                <span className="ref-label">REFERENCE IDENTIFIER</span>
                <span className="ref-number">{refNumber || 'GENERATING...'}</span>
              </div>

              <p className="lead-text">
                Thank you for your interest in building worlds with us. Your portfolio and application details have been securely routed to the Vedaverse Studio recruitment desk.
              </p>

              <div className="next-steps">
                <h3 className="utility-heading">WHAT HAPPENS NEXT?</h3>
                <ul className="editorial-list">
                  <li>Our Art Direction team will review your portfolio against our Evaluation Standards.</li>
                  <li>This deep-dive review process typically requires <strong>1 to 2 weeks</strong>.</li>
                  <li>Transparency is our baseline: you will receive an email regarding your status regardless of the outcome.</li>
                </ul>
              </div>
            </div>

            <div className="action-footer">
              <Link href="/" className="secondary-cta">
                RETURN TO HOMEPAGE
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />

      <style jsx>{`
        .recruitment-root {
          background-color: var(--ink, #030303);
          color: var(--paper, #f4f0eb);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
        }

        .confirmation-main {
          flex-grow: 1;
          display: flex;
          align-items: center;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 80px 20px 100px 20px;
          width: 100%;
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
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
          margin: 0;
          padding: 0 20px;
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

        .subnav-links a:hover {
          color: var(--ember, #c5a059);
        }

        /* Confirmation Card */
        .confirmation-card {
          background: #080808;
          border: 1px solid #1a1a1a;
          border-top: 2px solid var(--ember, #c5a059);
          padding: 60px;
          text-align: center;
          position: relative;
        }

        .success-icon {
          width: 40px;
          height: 40px;
          border: 1px solid var(--ember, #c5a059);
          border-radius: 50%;
          margin: 0 auto 30px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(197, 160, 89, 0.15);
        }

        .inner-dot {
          width: 12px;
          height: 12px;
          background: var(--ember, #c5a059);
          border-radius: 50%;
        }

        /* Header */
        .page-header {
          margin-bottom: 40px;
        }

        .utility-tag {
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          letter-spacing: 3px;
          color: var(--ember, #c5a059);
          text-transform: uppercase;
          display: block;
          margin-bottom: 15px;
        }

        .cinzel-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 400;
          letter-spacing: 2px;
          margin: 0;
        }

        .gold { color: var(--ember, #c5a059); }

        .ember-line-center {
          width: 40px; height: 1px; background: var(--ember, #c5a059); margin: 25px auto;
        }

        /* Content */
        .ref-box {
          background: #050505;
          border: 1px dashed #333;
          padding: 20px;
          margin-bottom: 40px;
          display: inline-block;
          min-width: 300px;
        }

        .ref-label {
          display: block;
          font-family: 'Inter', monospace;
          font-size: 0.65rem;
          color: #777;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .ref-number {
          font-family: 'Inter', monospace;
          font-size: 1.4rem;
          color: var(--paper, #f4f0eb);
          letter-spacing: 4px;
        }

        .lead-text {
          font-size: 1.1rem;
          color: var(--paper-dim, #d0c8be);
          line-height: 1.8;
          font-weight: 300;
          margin: 0 auto 50px auto;
          max-width: 600px;
        }

        /* Next Steps */
        .next-steps {
          text-align: left;
          background: #050505;
          padding: 40px;
          border: 1px solid #111;
          margin-bottom: 50px;
        }

        .utility-heading {
          font-family: 'Inter', monospace;
          font-size: 0.85rem;
          letter-spacing: 2px;
          color: var(--ember, #c5a059);
          margin-bottom: 25px;
          text-transform: uppercase;
        }

        .editorial-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .editorial-list li {
          margin-bottom: 15px;
          position: relative;
          padding-left: 20px;
          color: var(--paper-dim, #d0c8be);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .editorial-list li:last-child {
          margin-bottom: 0;
        }

        .editorial-list li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--ember, #c5a059);
        }

        .editorial-list strong {
          color: var(--paper, #f4f0eb);
          font-weight: 600;
        }

        /* Footer CTA */
        .secondary-cta {
          display: inline-block;
          background: transparent;
          color: var(--paper, #f4f0eb);
          border: 1px solid #333;
          padding: 14px 32px;
          border-radius: 2px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 2px;
          transition: 0.3s ease;
        }

        .secondary-cta:hover {
          border-color: var(--ember, #c5a059);
          color: var(--ember, #c5a059);
        }

        @media (max-width: 768px) {
          .sticky-subnav {
            overflow-x: auto;
            justify-content: flex-start;
            padding: 15px 20px;
          }
          .subnav-links { gap: 20px; }
          .confirmation-card { padding: 40px 20px; }
          .next-steps { padding: 30px 20px; }
          .ref-box { min-width: 100%; }
        }
      `}</style>
    </div>
  );
}