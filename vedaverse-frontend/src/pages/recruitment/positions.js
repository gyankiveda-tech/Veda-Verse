import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Navbar = dynamic(() => import('../../components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../../components/Footer'), { ssr: false });

export default function OpenPositions() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Feature 15: Open Roles Data from Vedaverse Recruitment Document
  const roles = [
    {
      id: "art-director",
      title: "Art Director",
      department: "LEADERSHIP",
      type: "FULL-TIME",
      location: "ON-SITE OR HYBRID",
      desc: "To define and maintain the visual vision of the studio, ensuring cohesive aesthetic quality across all original IP and guiding the creative development of every artist in the studio."
    },
    {
      id: "manga-artist",
      title: "Manga Artist",
      department: "CORE CREATIVE",
      type: "FULL-TIME OR CONTRACT",
      location: "REMOTE-FRIENDLY",
      desc: "To draw, pencil, and ink original manga pages, translating scripts into compelling sequential art that meets the studio's standards for pacing, emotion, and draftsmanship."
    },
    {
      id: "storyboard-artist",
      title: "Storyboard Artist",
      department: "PRE-PRODUCTION",
      type: "CONTRACT",
      location: "HYBRID",
      desc: "To translate scripts and concepts into visual blueprints for animation, establishing camera angles, character blocking, and pacing before full production begins."
    },
    {
      id: "concept-artist",
      title: "Concept Artist",
      department: "PRE-PRODUCTION",
      type: "FULL-TIME",
      location: "ON-SITE",
      desc: "To design the characters, environments, props, and visual motifs that define the look of a new IP before production begins."
    },
    {
      id: "background-artist",
      title: "Background Artist",
      department: "PRODUCTION",
      type: "FULL-TIME OR CONTRACT",
      location: "REMOTE-FRIENDLY",
      desc: "To paint the environments and settings that ground the characters in a believable, emotionally resonant world."
    },
    {
      id: "lettering-artist",
      title: "Lettering Artist",
      department: "POST-PRODUCTION",
      type: "CONTRACT",
      location: "REMOTE",
      desc: "To place dialogue, sound effects, and narration onto manga pages or animation subs, ensuring readability and aesthetic harmony with the art."
    },
    {
      id: "color-artist",
      title: "Color Artist",
      department: "PRODUCTION",
      type: "CONTRACT",
      location: "REMOTE",
      desc: "To apply colour to inked manga pages or animation frames, establishing mood, depth, and visual hierarchy through colour theory."
    },
    {
      id: "3d-artist",
      title: "3D Artist",
      department: "PRODUCTION",
      type: "FULL-TIME",
      location: "HYBRID",
      desc: "To create 3D assets, blockouts, and renders that support the 2D pipeline, enhancing environments and complex camera movements."
    }
  ];

  const filters = ["ALL", "LEADERSHIP", "CORE CREATIVE", "PRE-PRODUCTION", "PRODUCTION", "POST-PRODUCTION"];

  const filteredRoles = activeFilter === 'ALL' 
    ? roles 
    : roles.filter(role => role.department === activeFilter);

  return (
    <div className="recruitment-root no-select">
      <Head>
        <title>Open Positions | Vedaverse Studio</title>
        <meta name="description" content="View open roles and join Vedaverse Studio." />
      </Head>

      <Navbar />

      {/* Sticky Sub-Navigation */}
      <div className="sticky-subnav">
        <ul className="subnav-links">
          <li><Link href="/recruitment">Studio</Link></li>
          <li><Link href="/recruitment#culture">Culture</Link></li>
          <li><Link href="/recruitment/positions" className="active">Positions</Link></li>
          <li><Link href="/recruitment/process">Process</Link></li>
          <li><Link href="/recruitment/apply">Apply</Link></li>
        </ul>
      </div>

      <main className="positions-main">
        <div className="container">
          
          <div className="page-header">
            <h1 className="cinzel-title">OPEN <span className="gold">POSITIONS</span></h1>
            <div className="ember-line-center"></div>
            <p className="lead-text">
              We hire for character and potential as much as for portfolio. Find your place in the pipeline below.
            </p>
          </div>

          {/* Filter System */}
          <div className="filter-container">
            {filters.map(filter => (
              <button 
                key={filter} 
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Roles Grid */}
          <div className="roles-grid">
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role) => (
                <div key={role.id} className="role-card">
                  <div className="role-meta">
                    <span className="utility-tag">{role.department}</span>
                    <span className="utility-tag separator">•</span>
                    <span className="utility-tag">{role.type}</span>
                    <span className="utility-tag separator">•</span>
                    <span className="utility-tag">{role.location}</span>
                  </div>
                  
                  <h3 className="role-title">{role.title}</h3>
                  <p className="role-desc">{role.desc}</p>
                  
                  <div className="card-footer">
                    <Link href={`/recruitment/${role.id}`} className="view-details-btn">
                      VIEW DETAILS <span className="arrow">→</span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-roles-msg">
                <p>No positions currently open in this department. Check back later or submit an open application.</p>
              </div>
            )}
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
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 100px 20px 150px 20px;
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
          margin-bottom: 60px;
        }

        .cinzel-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 400;
          letter-spacing: 2px;
          margin: 0;
        }

        .gold { color: var(--ember, #c5a059); }

        .ember-line-center {
          width: 50px; height: 1px; background: var(--ember, #c5a059); margin: 25px auto;
        }

        .lead-text {
          font-size: 1.1rem;
          color: var(--paper-dim, #d0c8be);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 300;
        }

        /* Filters */
        .filter-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
          margin-bottom: 50px;
        }

        .filter-btn {
          background: transparent;
          border: 1px solid #333;
          color: var(--paper-dim, #d0c8be);
          padding: 8px 16px;
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          letter-spacing: 1px;
          cursor: pointer;
          transition: 0.3s ease;
          border-radius: 2px;
        }

        .filter-btn:hover {
          border-color: var(--paper, #f4f0eb);
          color: var(--paper, #f4f0eb);
        }

        .filter-btn.active {
          background: rgba(197, 160, 89, 0.1);
          border-color: var(--ember, #c5a059);
          color: var(--ember, #c5a059);
        }

        /* Roles Grid */
        .roles-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .role-card {
          background: #080808;
          border: 1px solid #1a1a1a;
          padding: 40px;
          transition: 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .role-card:hover {
          border-color: var(--ember, #c5a059);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .role-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-bottom: 15px;
        }

        .utility-tag {
          font-family: 'Inter', monospace;
          font-size: 0.7rem;
          letter-spacing: 2px;
          color: var(--ember, #c5a059);
          text-transform: uppercase;
        }

        .separator {
          color: #444;
        }

        .role-title {
          font-family: 'Cinzel', serif;
          font-size: 1.8rem;
          font-weight: 400;
          color: var(--paper, #f4f0eb);
          margin: 0 0 15px 0;
          letter-spacing: 1px;
        }

        .role-desc {
          color: var(--paper-dim, #d0c8be);
          font-size: 1rem;
          line-height: 1.7;
          margin: 0 0 30px 0;
          max-width: 800px;
        }

        .card-footer {
          margin-top: auto;
        }

        .view-details-btn {
          color: var(--paper, #f4f0eb);
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 2px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: 0.3s ease;
        }

        .view-details-btn .arrow {
          transition: transform 0.3s ease;
          color: var(--ember, #c5a059);
        }

        .role-card:hover .view-details-btn {
          color: var(--ember, #c5a059);
        }

        .role-card:hover .arrow {
          transform: translateX(5px);
        }

        .no-roles-msg {
          text-align: center;
          color: #777;
          padding: 60px;
          border: 1px dashed #333;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .sticky-subnav {
            overflow-x: auto;
            justify-content: flex-start;
            padding: 15px 20px;
          }
          .subnav-links { gap: 20px; }
          .role-card { padding: 30px 20px; }
          .role-title { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
}