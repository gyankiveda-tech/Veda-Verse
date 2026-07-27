import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });

export default function Changelog() {
  
  // Feature 30: System Changelog Data
  const changelogData = [
    {
      version: "v1.0.0",
      date: "JULY 26, 2026",
      title: "PHASE E: COMMUNITY HUB DEPLOYED",
      changes: [
        { type: "ADDED", text: "Public Frequency (Community Hub) initialized." },
        { type: "ADDED", text: "Studio Devlog and News sections integrated." },
        { type: "ADDED", text: "Secure Newsletter (The Network) sync activated." },
        { type: "CHANGED", text: "Navbar updated to include all 5 primary studio pillars." }
      ]
    },
    {
      version: "v0.9.0",
      date: "JULY 10, 2026",
      title: "PHASE D: LORE & STATUS ONLINE",
      changes: [
        { type: "ADDED", text: "The Chronos Archive (Lore, Timeline, Entities) made public." },
        { type: "ADDED", text: "Development Tracker with live Auditor Logs." },
        { type: "FIXED", text: "Removed gated Firebase access from Chronos to enable public lore discovery." }
      ]
    },
    {
      version: "v0.8.0",
      date: "JUNE 25, 2026",
      title: "PHASE C: RECRUITMENT PIPELINE",
      changes: [
        { type: "ADDED", text: "Careers landing page with Studio Culture documentation." },
        { type: "ADDED", text: "Dynamic Open Positions board with 8 core roles." },
        { type: "ADDED", text: "Application form with mandatory AI-disclosure policy." },
        { type: "ADDED", text: "Candidate Journey (Process Timeline) and FAQ pages." }
      ]
    },
    {
      version: "v0.5.0",
      date: "MAY 15, 2026",
      title: "PHASE A & B: CORE ARCHITECTURE",
      changes: [
        { type: "ADDED", text: "Vedaverse Brand Identity (Ink, Paper, Ember) applied." },
        { type: "ADDED", text: "The Studio and Production pipeline pages deployed." },
        { type: "CHANGED", text: "Removed legacy neon/glitch aesthetics to align with premium studio guidelines." }
      ]
    }
  ];

  const getTagColor = (type) => {
    switch(type) {
      case 'ADDED': return 'tag-added';
      case 'CHANGED': return 'tag-changed';
      case 'FIXED': return 'tag-fixed';
      default: return '';
    }
  };

  return (
    <div className="changelog-root no-select">
      <Head>
        <title>Changelog | Vedaverse Studio</title>
        <meta name="description" content="System updates, patch notes, and development history of Vedaverse Studio." />
      </Head>

      <Navbar />

      {/* Sticky Sub-Navigation (Matching Community Hub) */}
      <div className="sticky-subnav">
        <ul className="subnav-links">
          <li><Link href="/community#announcements">News</Link></li>
          <li><Link href="/community#devlog">Devlog</Link></li>
          <li><Link href="/community#newsletter">Network</Link></li>
          <li><Link href="/changelog" className="active">Changelog</Link></li>
          <li><Link href="/contact">Support</Link></li>
        </ul>
      </div>

      <main className="changelog-main">
        <div className="container">
          
          <header className="page-header">
            <h4 className="utility-tag">SYSTEM VERSION HISTORY</h4>
            <h1 className="cinzel-title">THE <span className="gold">CHANGELOG</span></h1>
            <div className="ember-line-center"></div>
            <p className="lead-text">
              A transparent ledger of all deployments, structural updates, and pipeline modifications across the Vedaverse architecture.
            </p>
          </header>

          <div className="changelog-timeline">
            {changelogData.map((release, index) => (
              <div key={index} className="release-block">
                
                <div className="release-meta">
                  <div className="version-badge">{release.version}</div>
                  <div className="release-date">{release.date}</div>
                </div>

                <div className="release-content">
                  <h3 className="release-title">{release.title}</h3>
                  <div className="changes-list">
                    {release.changes.map((change, idx) => (
                      <div key={idx} className="change-item">
                        <span className={`change-tag ${getTagColor(change.type)}`}>
                          {change.type}
                        </span>
                        <p className="change-text">{change.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />

      <style jsx>{`
        .changelog-root {
          background-color: var(--ink, #030303);
          color: var(--paper, #f4f0eb);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 20px 150px 20px;
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

        /* Header */
        .page-header {
          text-align: center;
          margin-bottom: 80px;
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
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 400;
          letter-spacing: 2px;
          margin: 15px 0 0 0;
        }

        .gold { color: var(--ember, #c5a059); }

        .ember-line-center {
          width: 50px; height: 1px; background: var(--ember, #c5a059); margin: 25px auto;
        }

        .lead-text {
          font-size: 1.1rem;
          color: var(--paper-dim, #d0c8be);
          max-width: 700px;
          line-height: 1.8;
          font-weight: 300;
          margin: 0 auto;
        }

        /* Changelog Timeline */
        .changelog-timeline {
          display: flex;
          flex-direction: column;
          gap: 60px;
          position: relative;
        }

        .changelog-timeline::before {
          content: '';
          position: absolute;
          left: 150px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: #1a1a1a;
        }

        .release-block {
          display: flex;
          gap: 60px;
          position: relative;
        }

        .release-meta {
          width: 120px;
          flex-shrink: 0;
          text-align: right;
          padding-top: 5px;
        }

        .version-badge {
          font-family: 'Inter', monospace;
          font-size: 1.2rem;
          color: var(--ember, #c5a059);
          font-weight: 700;
          margin-bottom: 5px;
        }

        .release-date {
          font-family: 'Inter', monospace;
          font-size: 0.7rem;
          color: #777;
          letter-spacing: 1px;
        }

        .release-content {
          background: #050505;
          border: 1px solid #1a1a1a;
          padding: 40px;
          flex-grow: 1;
          position: relative;
          transition: 0.3s ease;
        }

        .release-content:hover {
          border-color: #333;
        }

        .release-content::before {
          content: '';
          position: absolute;
          left: -35px;
          top: 20px;
          width: 9px;
          height: 9px;
          background: var(--ink, #030303);
          border: 1px solid var(--ember, #c5a059);
          border-radius: 50%;
          z-index: 2;
        }

        .release-title {
          font-family: 'Cinzel', serif;
          font-size: 1.4rem;
          font-weight: 400;
          margin: 0 0 30px 0;
          letter-spacing: 1px;
          color: var(--paper, #f4f0eb);
        }

        .changes-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .change-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }

        .change-tag {
          font-family: 'Inter', monospace;
          font-size: 0.65rem;
          padding: 4px 8px;
          border-radius: 2px;
          letter-spacing: 1px;
          flex-shrink: 0;
          width: 70px;
          text-align: center;
        }

        .tag-added {
          background: rgba(197, 160, 89, 0.1);
          color: var(--ember, #c5a059);
          border: 1px solid rgba(197, 160, 89, 0.3);
        }

        .tag-changed {
          background: rgba(208, 200, 190, 0.05);
          color: var(--paper-dim, #d0c8be);
          border: 1px solid rgba(208, 200, 190, 0.2);
        }

        .tag-fixed {
          background: rgba(255, 100, 100, 0.1);
          color: #ff6b6b;
          border: 1px solid rgba(255, 100, 100, 0.3);
        }

        .change-text {
          margin: 0;
          color: var(--paper-dim, #d0c8be);
          font-size: 0.95rem;
          line-height: 1.6;
          font-weight: 300;
          padding-top: 2px;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .sticky-subnav {
            overflow-x: auto;
            justify-content: flex-start;
            padding: 15px 20px;
          }
          .subnav-links { gap: 20px; }
          
          .changelog-timeline::before { left: 20px; }
          
          .release-block {
            flex-direction: column;
            gap: 20px;
          }
          
          .release-meta {
            text-align: left;
            padding-left: 45px;
          }
          
          .release-content::before {
            left: -25px; /* Adjust dot position relative to new padding */
            top: -35px; /* Move dot up to align with version number */
          }
        }
      `}</style>
    </div>
  );
}