import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });
const AudioEngine = dynamic(() => import('../components/AudioEngine'), { ssr: false });

export default function Studios() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Feature 7: Only Founder Remains
  const founder = {
    name: "GYAN VARDHAN",
    role: "FOUNDER, CEO & CREATIVE DIRECTOR",
    desc: "Holding ultimate creative authority over Vedaverse Studio. Defining the creative territory, story direction, brand identity, and ensuring every leadership decision remains aligned with the studio's long-term vision.",
    img: "/images/gyan.jpg",
  };

  // Feature 8: Future Team Placeholders (Hiring Open)
  const openPositions = [
    {
      role: "CREATIVE DIRECTOR",
      status: "HIRING OPEN",
      desc: "Managing the intersection between story development and visual execution. Overseeing narrative pacing, story-visual alignment, and cross-departmental creative coherence."
    },
    {
      role: "LEAD ART DIRECTOR",
      status: "HIRING OPEN",
      desc: "Setting the visual standard. Ensuring character consistency, compositional quality, background design, panel flow, and rendering standards across all studio output."
    }
  ];

  return (
    <div className="studio-root no-select">
      <Head>
        <title>The Studio | VedaVerse</title>
        <meta name="description" content="Inside VedaVerse: The Creative Hub and Organization." />
      </Head>

      <AudioEngine />
      <Navbar />

      <main className="main-content">
        
        {/* Header Section */}
        <section className="page-header">
          <h4 className="utility-tag">CREATIVE HUB</h4>
          <h1 className="main-title">THE <span className="gold">STUDIO</span></h1>
          <div className="ember-line-center"></div>
          <p className="subtitle">
            A production pipeline exists to protect the work. Quality depends on discipline, systems, and the people who uphold them.
          </p>
        </section>

        {/* Feature 7: The Architect (Founder Only) */}
        <section className="section-container">
          <div className="founder-showcase">
            <div className="founder-image-wrapper">
              <img src={founder.img} alt={founder.name} className="founder-image" />
            </div>
            <div className="founder-details">
              <h4 className="utility-tag">THE ARCHITECT</h4>
              <h2 className="name-title">{founder.name}</h2>
              <h3 className="role-title">{founder.role}</h3>
              <div className="ember-line"></div>
              <p className="desc-text">{founder.desc}</p>
            </div>
          </div>
        </section>

        {/* Feature 10: Organization Chart (Hierarchy) */}
        <section className="section-container hierarchy-section">
          <div className="section-header">
            <h2 className="section-title">STUDIO <span className="gold">HIERARCHY</span></h2>
            <div className="ember-line-center"></div>
            <p className="desc-text text-center">
              Clear reporting lines ensure that direction is focused and feedback is precise. Our hierarchy is not a pyramid of authority, but a conduit for creative vision.
            </p>
          </div>

          <div className="org-chart">
            <div className="org-node level-1">
              <span className="org-role">FOUNDER / CEO</span>
            </div>
            <div className="org-line vertical"></div>
            <div className="org-node level-2">
              <span className="org-role">STUDIO DIRECTOR</span>
            </div>
            <div className="org-line vertical"></div>
            
            <div className="org-branches">
              <div className="org-branch-line"></div>
              <div className="org-nodes-row">
                <div className="org-col">
                  <div className="org-node level-3">
                    <span className="org-role">CREATIVE DIRECTOR</span>
                  </div>
                  <div className="org-line vertical"></div>
                  <div className="org-node level-4">
                    <span className="org-role">ART DIRECTOR</span>
                  </div>
                </div>
                <div className="org-col">
                  <div className="org-node level-3">
                    <span className="org-role">PRODUCTION MANAGER</span>
                  </div>
                  <div className="org-line vertical"></div>
                  <div className="org-node level-4">
                    <span className="org-role">LEAD ARTISTS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 8: Studio Team (Empty Positions) */}
        <section className="section-container">
          <div className="section-header">
            <h2 className="section-title">LEADERSHIP <span className="gold">VACANCIES</span></h2>
            <div className="ember-line-center"></div>
            <p className="desc-text text-center">
              We are actively seeking foundational leaders who will protect the studio's creative identity and enforce our operational standards.
            </p>
          </div>

          <div className="open-positions-grid">
            {openPositions.map((pos, index) => (
              <div key={index} className="empty-position-card">
                <div className="card-top">
                  <span className="status-badge blink-slow">{pos.status}</span>
                </div>
                <div className="card-body">
                  <h3 className="vacant-role">{pos.role}</h3>
                  <div className="ember-line"></div>
                  <p className="vacant-desc">{pos.desc}</p>
                </div>
                <div className="card-footer">
                  <button className="inter-btn">VIEW REQUIREMENTS</button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />

      <style jsx>{`
        .studio-root {
          background-color: #030303; /* Ink */
          color: #f4f0eb; /* Paper */
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        .main-content {
          padding: 150px 5% 100px;
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
        }

        .utility-tag {
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          letter-spacing: 3px;
          color: #a09a90;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        /* Header Styles */
        .page-header {
          text-align: center;
          margin-bottom: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .main-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 400;
          letter-spacing: 2px;
          margin: 0;
        }

        .gold { color: #c5a059; } /* Ember */
        
        .ember-line-center {
          width: 60px; height: 1px; background: #c5a059; margin: 25px auto;
        }
        
        .ember-line {
          width: 40px; height: 1px; background: #c5a059; margin: 20px 0;
        }

        .subtitle {
          color: #d0c8be;
          font-size: 1.1rem;
          line-height: 1.8;
          max-width: 600px;
          font-weight: 300;
        }

        .desc-text {
          color: #a09a90;
          font-size: 1rem;
          line-height: 1.8;
          font-weight: 300;
        }
        .text-center { text-align: center; margin: 0 auto; max-width: 700px; }

        .section-container {
          margin-bottom: 120px;
        }

        .section-header {
          margin-bottom: 60px;
        }

        .section-title {
          font-family: 'Cinzel', serif;
          font-size: 2.5rem;
          font-weight: 400;
          text-align: center;
          letter-spacing: 2px;
          margin: 0;
        }

        /* Founder Showcase */
        .founder-showcase {
          display: flex;
          gap: 60px;
          align-items: center;
          background: #0a0a0a;
          border: 1px solid rgba(244, 240, 235, 0.05);
          padding: 60px;
        }

        .founder-image-wrapper {
          width: 300px;
          height: 350px;
          flex-shrink: 0;
          border: 1px solid #222;
          padding: 10px;
        }

        .founder-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(1.1);
        }

        .name-title {
          font-family: 'Cinzel', serif;
          font-size: 2.5rem;
          font-weight: 400;
          margin: 5px 0;
          letter-spacing: 1px;
        }

        .role-title {
          font-size: 0.85rem;
          letter-spacing: 2px;
          color: #c5a059;
          font-weight: 600;
          text-transform: uppercase;
          margin: 0;
        }

        /* Organization Chart */
        .hierarchy-section {
          background: radial-gradient(circle at top, #0a0f1a 0%, #030303 100%);
          padding: 60px 0;
          border-top: 1px solid #111;
          border-bottom: 1px solid #111;
        }

        .org-chart {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 50px;
        }

        .org-node {
          border: 1px solid #333;
          padding: 15px 30px;
          background: #050505;
          min-width: 250px;
          text-align: center;
          transition: 0.3s ease;
        }
        .org-node:hover { border-color: #c5a059; }

        .level-1 { border-top: 2px solid #c5a059; }

        .org-role {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 2px;
          color: #f4f0eb;
        }

        .org-line.vertical {
          width: 1px;
          height: 40px;
          background: #333;
        }

        .org-branches {
          position: relative;
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .org-branch-line {
          width: calc(100% - 250px);
          height: 1px;
          background: #333;
          position: absolute;
          top: 0;
        }

        .org-nodes-row {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding-top: 40px; /* Space for the vertical drops */
          position: relative;
        }
        
        .org-nodes-row::before, .org-nodes-row::after {
            content: '';
            position: absolute;
            top: 0;
            width: 1px;
            height: 40px;
            background: #333;
        }
        .org-nodes-row::before { left: 125px; } /* Center of left node */
        .org-nodes-row::after { right: 125px; } /* Center of right node */

        .org-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Empty Positions Grid */
        .open-positions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 40px;
        }

        .empty-position-card {
          background: #080808;
          border: 1px dashed #333;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: 0.4s ease;
        }

        .empty-position-card:hover {
          border-style: solid;
          border-color: #c5a059;
          transform: translateY(-5px);
        }

        .status-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 2px;
          padding: 4px 10px;
          background: rgba(197, 160, 89, 0.1);
          color: #c5a059;
          border: 1px solid #c5a059;
        }

        .blink-slow {
          animation: blink-soft 3s infinite;
        }

        @keyframes blink-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .vacant-role {
          font-family: 'Cinzel', serif;
          font-size: 1.8rem;
          font-weight: 400;
          margin: 20px 0 0 0;
          color: #f4f0eb;
        }

        .vacant-desc {
          color: #a09a90;
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .card-footer {
          margin-top: auto;
        }

        /* Mobile Responsiveness */
        @media (max-width: 900px) {
          .founder-showcase {
            flex-direction: column;
            padding: 30px;
            text-align: center;
          }
          .founder-details {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .founder-image-wrapper {
            width: 100%;
            height: auto;
            aspect-ratio: 1/1;
          }
          .org-branch-line, .org-nodes-row::before, .org-nodes-row::after {
             display: none; /* Simplify org chart on mobile */
          }
          .org-nodes-row {
            flex-direction: column;
            padding-top: 0;
            gap: 40px;
          }
          .org-col { gap: 0px; }
          .org-col .org-node.level-3 { margin-bottom: 0;}
          .org-col .vertical { display: block; }
        }
      `}</style>
    </div>
  );
}