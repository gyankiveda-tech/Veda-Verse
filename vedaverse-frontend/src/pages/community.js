import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });

export default function Community() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Transmission accepted. ${email} added to the Vedaverse network.`);
    setEmail('');
  };

  // Feature 28: News & Announcements
  const announcements = [
    {
      id: 1,
      date: "JULY 26, 2026",
      category: "STUDIO NEWS",
      title: "VEDAVERSE RECRUITMENT INITIATIVE BEGINS",
      desc: "We have officially opened our doors to global talent. Seeking Art Directors, Manga Artists, and Pre-production specialists to build the foundations of our first major IP.",
      link: "/recruitment"
    },
    {
      id: 2,
      date: "JULY 10, 2026",
      category: "ANNOUNCEMENT",
      title: "THE CHRONOS ARCHIVE DECLASSIFIED",
      desc: "The timeline and lore architecture for 'Gyan Ki Veda' is now publicly accessible. Explore the impending collapse of the multiversal boundary.",
      link: "/chronos"
    }
  ];

  // Feature 29: Blog / Devlog
  const devlogs = [
    {
      id: "DEV-01",
      date: "JUNE 15, 2026",
      author: "GYAN VARDHAN",
      title: "SYSTEMS OVER SCALE: OUR PRODUCTION PHILOSOPHY",
      desc: "Why we spent six months building our pipeline and constitution before drawing a single final frame. A deep dive into the Vedaverse operational framework."
    },
    {
      id: "DEV-02",
      date: "MAY 22, 2026",
      author: "ROHAN PRADHAN",
      title: "PACING THE VOID: SCRIPTING A MULTIVERSAL COLLAPSE",
      desc: "Balancing high-concept quantum physics with grounded emotional stakes. An insight into the scripting process of 'Gyan Ki Veda' Volume 1."
    }
  ];

  return (
    <div className="community-root no-select">
      <Head>
        <title>Community Hub | Vedaverse Studio</title>
        <meta name="description" content="News, Devlogs, and Announcements from Vedaverse Studio." />
      </Head>

      <Navbar />

      {/* Sticky Sub-Navigation */}
      <div className="sticky-subnav">
        <ul className="subnav-links">
          <li><a href="#announcements">News</a></li>
          <li><a href="#devlog">Devlog</a></li>
          <li><a href="#newsletter">Network</a></li>
          <li><Link href="/changelog">Changelog</Link></li>
          <li><Link href="/contact">Support</Link></li>
        </ul>
      </div>

      <main className="community-main">
        <div className="container">
          
          <header className="page-header">
            <h4 className="utility-tag">PUBLIC FREQUENCY</h4>
            <h1 className="cinzel-title">COMMUNITY <span className="gold">HUB</span></h1>
            <div className="ember-line-center"></div>
            <p className="lead-text">
              Direct transmissions from the core of Vedaverse Studio. Stay aligned with our latest announcements, production insights, and network updates.
            </p>
          </header>

          {/* Feature 28: News & Announcements */}
          <section id="announcements" className="content-section">
            <div className="section-header">
              <h2 className="cinzel-title">LATEST <span className="gold">TRANSMISSIONS</span></h2>
              <div className="ember-line"></div>
            </div>

            <div className="news-grid">
              {announcements.map((news) => (
                <div key={news.id} className="news-card">
                  <div className="news-meta">
                    <span className="utility-tag">{news.date}</span>
                    <span className="separator">•</span>
                    <span className="utility-tag gold">{news.category}</span>
                  </div>
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-desc">{news.desc}</p>
                  <Link href={news.link} className="read-more">
                    ACCESS RECORD <span className="arrow">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Feature 29: Blog / Devlog */}
          <section id="devlog" className="content-section">
            <div className="section-header">
              <h2 className="cinzel-title">STUDIO <span className="gold">DEVLOGS</span></h2>
              <div className="ember-line"></div>
              <p className="subtitle">Behind the architecture of our worlds.</p>
            </div>

            <div className="devlog-list">
              {devlogs.map((log) => (
                <div key={log.id} className="devlog-item">
                  <div className="devlog-info">
                    <div className="news-meta">
                      <span className="utility-tag">{log.date}</span>
                      <span className="separator">•</span>
                      <span className="utility-tag">AUTHOR: {log.author}</span>
                    </div>
                    <h3 className="devlog-title">{log.title}</h3>
                    <p className="devlog-desc">{log.desc}</p>
                  </div>
                  <div className="devlog-action">
                    <button className="btn-read">READ LOG</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Feature 31: Newsletter */}
          <section id="newsletter" className="newsletter-section">
            <div className="newsletter-card">
              <div className="newsletter-content">
                <h2 className="cinzel-title">JOIN THE <span className="gold">NETWORK</span></h2>
                <div className="ember-line"></div>
                <p className="newsletter-desc">
                  Subscribe to our secure frequency. Receive exclusive early access to teasers, recruitment drives, and production logs directly in your inbox. No spam. Only the signal.
                </p>
              </div>
              
              <div className="newsletter-form-wrapper">
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                  <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL ADDRESS" 
                    className="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn-subscribe">SYNC</button>
                </form>
                <span className="privacy-note">CONNECTION SECURED. UNSUBSCRIBE ANYTIME.</span>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />

      <style jsx>{`
        .community-root {
          background-color: var(--ink, #030303);
          color: var(--paper, #f4f0eb);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 20px 100px 20px;
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

        .subnav-links a:hover {
          color: var(--ember, #c5a059);
        }

        /* Utility Classes */
        .utility-tag {
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          letter-spacing: 3px;
          color: var(--paper-dim, #d0c8be);
          text-transform: uppercase;
        }

        .utility-tag.gold {
          color: var(--ember, #c5a059);
        }

        .separator {
          color: #333;
          margin: 0 10px;
        }

        .cinzel-title {
          font-family: 'Cinzel', serif;
          font-weight: 400;
          letter-spacing: 2px;
          margin: 0;
          color: var(--paper, #f4f0eb);
        }

        .gold { color: var(--ember, #c5a059); }

        .ember-line-center {
          width: 60px; height: 1px; background: var(--ember, #c5a059); margin: 25px auto;
        }
        
        .ember-line {
          width: 40px; height: 1px; background: var(--ember, #c5a059); margin: 15px 0;
        }

        /* Header */
        .page-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .page-header .cinzel-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-top: 15px;
        }

        .lead-text {
          font-size: 1.1rem;
          color: var(--paper-dim, #d0c8be);
          max-width: 700px;
          line-height: 1.8;
          font-weight: 300;
          margin: 0 auto;
        }

        .content-section {
          margin-bottom: 100px;
        }

        .section-header {
          margin-bottom: 40px;
        }
        
        .section-header .cinzel-title {
          font-size: 2rem;
        }

        .subtitle {
          color: var(--paper-dim, #d0c8be);
          font-size: 1rem;
          font-weight: 300;
          margin: 0;
        }

        /* News Grid */
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 40px;
        }

        .news-card {
          background: #080808;
          border: 1px solid #1a1a1a;
          padding: 40px;
          transition: 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .news-card:hover {
          border-color: var(--ember, #c5a059);
          transform: translateY(-5px);
        }

        .news-meta {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .news-title {
          font-family: 'Cinzel', serif;
          font-size: 1.5rem;
          font-weight: 400;
          margin: 0 0 15px 0;
          line-height: 1.4;
        }

        .news-desc {
          color: var(--paper-dim, #d0c8be);
          font-size: 0.95rem;
          line-height: 1.7;
          margin: 0 0 30px 0;
          font-weight: 300;
        }

        .read-more {
          margin-top: auto;
          color: var(--paper, #f4f0eb);
          text-decoration: none;
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          letter-spacing: 2px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: 0.3s ease;
        }

        .read-more .arrow {
          transition: transform 0.3s ease;
          color: var(--ember, #c5a059);
        }

        .news-card:hover .read-more { color: var(--ember, #c5a059); }
        .news-card:hover .arrow { transform: translateX(5px); }

        /* Devlog List */
        .devlog-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .devlog-item {
          background: #050505;
          border: 1px solid #1a1a1a;
          padding: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          transition: 0.3s ease;
        }

        .devlog-item:hover {
          border-color: #333;
        }

        .devlog-title {
          font-family: 'Cinzel', serif;
          font-size: 1.3rem;
          font-weight: 400;
          margin: 0 0 10px 0;
        }

        .devlog-desc {
          color: var(--paper-dim, #d0c8be);
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
          font-weight: 300;
        }

        .btn-read {
          background: transparent;
          border: 1px solid var(--paper, #f4f0eb);
          color: var(--paper, #f4f0eb);
          padding: 12px 24px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          letter-spacing: 2px;
          cursor: pointer;
          transition: 0.3s ease;
          white-space: nowrap;
        }

        .btn-read:hover {
          background: var(--paper, #f4f0eb);
          color: var(--ink, #030303);
        }

        /* Newsletter */
        .newsletter-section {
          margin-top: 80px;
        }

        .newsletter-card {
          background: radial-gradient(circle at center, #0a0f1a 0%, #050505 100%);
          border: 1px solid #1a1a1a;
          padding: 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .newsletter-desc {
          color: var(--paper-dim, #d0c8be);
          font-size: 1rem;
          line-height: 1.8;
          font-weight: 300;
          margin: 0;
        }

        .newsletter-form {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .email-input {
          flex-grow: 1;
          background: #030303;
          border: 1px solid #333;
          color: var(--paper, #f4f0eb);
          padding: 15px;
          font-family: 'Inter', monospace;
          font-size: 0.8rem;
          letter-spacing: 1px;
          outline: none;
          transition: 0.3s ease;
        }

        .email-input:focus {
          border-color: var(--ember, #c5a059);
        }

        .btn-subscribe {
          background: var(--ember, #c5a059);
          color: var(--ink, #030303);
          border: none;
          padding: 0 30px;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 2px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .btn-subscribe:hover {
          background: #dcb873;
        }

        .privacy-note {
          display: block;
          font-family: 'Inter', monospace;
          font-size: 0.65rem;
          color: #666;
          letter-spacing: 1px;
        }

        /* Mobile */
        @media (max-width: 900px) {
          .sticky-subnav {
            overflow-x: auto;
            justify-content: flex-start;
            padding: 15px 20px;
          }
          .subnav-links { gap: 20px; }
          .devlog-item { flex-direction: column; align-items: flex-start; gap: 20px; }
          .newsletter-card { grid-template-columns: 1fr; gap: 40px; padding: 40px 20px; }
          .newsletter-form { flex-direction: column; }
          .btn-subscribe { padding: 15px; }
        }
      `}</style>
    </div>
  );
}