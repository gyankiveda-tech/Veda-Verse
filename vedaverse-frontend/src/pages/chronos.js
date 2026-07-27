import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });
const AudioEngine = dynamic(() => import('../components/AudioEngine'), { ssr: false });

export default function ChronosTimeline() {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Feature 23: Universe Timeline (Public Lore)
  const loreTimeline = [
    { id: "ERA_01", title: "GENESIS", subtitle: "Where Reality Shatters", desc: "The original Earth faces an anomaly that should not exist. The first fracture in the multiversal boundary goes unnoticed by the masses, but the code of reality begins to bleed." },
    { id: "ERA_02", title: "NEURAL AWAKENING", subtitle: "The First Stir", desc: "Ordinary minds begin to connect with the underlying architecture of the universe. The system recognizes its inhabitants, and the simulation reacts defensively." },
    { id: "ERA_03", title: "THE VOID DRIFT", subtitle: "Beyond the Horizon", desc: "A journey into the spaces between realities. The architects of the simulation reveal themselves, forcing humanity to question the nature of their existence." },
    { id: "ERA_04", title: "PROTOCOL ZERO", subtitle: "The Reset Initiated", desc: "To save the core timeline, a drastic sacrifice is mandated. The boundaries of the Vedaverse are locked, and the ultimate conflict for free will begins." }
  ];

  // Feature 24: Characters Preview (Teasers) - UPDATED WITH KAIRA & RUDRA
  const characters = [
    { 
      id: "SUBJECT-001", 
      name: "THE ANOMALY", 
      role: "PROTAGONIST", 
      desc: "An ordinary student thrust into a multiversal conflict, holding the key to the simulation's source code without knowing how to read it.",
      image: null, // Keep redacted for mystery
      color: "#c5a059"
    },
    { 
      id: "TENGAI-JAL", 
      name: "KAIRA", 
      role: "WATER ELEMENT (JAL)", 
      desc: "Cold precision. Minimal words. Evaluates everything. Acts decisively. The first female Tengai wielding the Neer-Dhaar katana.",
      image: "/images/Kaira.png",
      color: "#00f2ff"
    },
    { 
      id: "TENGAI-AAKASH", 
      name: "RUDRA", 
      role: "VOID ELEMENT (AAKASH)", 
      desc: "Most powerful. Most contained. The wall. He bends space with a thought and watches the universe from the highest ledge.",
      image: "/images/Rudra.png",
      color: "#9B5DE5"
    }
  ];

  const heroOpacity = Math.max(0, 1 - scrollPos / 600);

  return (
    <div className="chronos-root no-select">
      <Head>
        <title>The Chronos Archive | Vedaverse Studio</title>
        <meta name="description" content="Explore the lore, timeline, and characters of Gyan Ki Veda." />
      </Head>

      <AudioEngine />
      <Navbar />

      {/* Sticky Sub-Navigation */}
      <div className="sticky-subnav">
        <ul className="subnav-links">
          <li><a href="#overview">Overview</a></li>
          <li><a href="#timeline">Timeline</a></li>
          <li><a href="#entities">Entities</a></li>
          <li><a href="#comms">Comms Log</a></li>
        </ul>
      </div>

      {/* Cinematic Background */}
      <div className="lore-bg"></div>

      <main className="chronos-main">
        
        {/* Feature 22: Veda Verse Overview */}
        <section id="overview" className="lore-hero" style={{ opacity: heroOpacity }}>
          <div className="hero-content">
            <h4 className="utility-tag blink-slow">SYSTEM ACCESS GRANTED</h4>
            <h1 className="cinzel-title huge">THE <span className="gold">CHRONOS</span> ARCHIVE</h1>
            <div className="ember-line-center"></div>
            <p className="lore-intro">
              Welcome to the Vedaverse. What you perceive as reality is merely a compiled render of a much larger, darker architecture. <strong>"Gyan Ki Veda"</strong> is not just a story—it is the decoded history of a multiverse fighting for its right to exist. Dive into the timeline, uncover the anomalies, and prepare for the awakening.
            </p>
          </div>
        </section>

        {/* Feature 23: Universe Timeline */}
        <section id="timeline" className="timeline-section">
          <div className="section-header">
            <h2 className="cinzel-title">UNIVERSE <span className="gold">TIMELINE</span></h2>
            <div className="ember-line-center"></div>
            <p className="subtitle">The chronological sequence of the impending collapse.</p>
          </div>

          <div className="timeline-wrapper">
            <div className="center-line"></div>
            
            {loreTimeline.map((era, index) => {
              const alignClass = index % 2 === 0 ? "left-align" : "right-align";
              return (
                <div key={era.id} className={`timeline-node ${alignClass}`}>
                  <div className="node-dot"></div>
                  <div className="node-card">
                    <span className="era-tag">{era.id}</span>
                    <h3 className="node-title">{era.title}</h3>
                    <h4 className="node-subtitle">{era.subtitle}</h4>
                    <p className="node-desc">{era.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Feature 24: Characters Preview */}
        <section id="entities" className="characters-section">
          <div className="section-header">
            <h2 className="cinzel-title">KNOWN <span className="gold">ENTITIES</span></h2>
            <div className="ember-line-center"></div>
            <p className="subtitle">We create people whose choices become legends.</p>
          </div>

          <div className="characters-grid">
            {characters.map((char) => (
              <div key={char.id} className="char-card">
                
                {/* Dynamic Image / Placeholder Rendering */}
                {char.image ? (
                  <div className="char-visual">
                    <img src={char.image} alt={char.name} className="char-img" />
                    <div className="scanline-effect"></div>
                  </div>
                ) : (
                  <div className="char-visual-placeholder">
                    <div className="scanline-effect"></div>
                    <span className="visual-tag">IMAGE_REDACTED</span>
                  </div>
                )}

                <div className="char-info">
                  <span className="utility-tag" style={{ color: char.color }}>{char.id}</span>
                  <h3 className="char-name">{char.name}</h3>
                  <p className="char-role">{char.role}</p>
                  <div className="ember-line" style={{ background: char.color }}></div>
                  <p className="char-desc">{char.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Intercepted Conversation Log */}
        <section id="comms" className="comms-section">
          <div className="comms-container">
            <div className="comms-header">
              <span className="utility-tag blink-slow">INTERCEPTED AUDIO LOG</span>
              <span className="timestamp">FILE: EP07_TARA_ARRIVAL.WAV</span>
            </div>
            
            <div className="chat-box">
              <p className="context-text">[AUDIO TRANSCRIPT: Sanctuary Training Ground. Target 'Tara' crash lands.]</p>
              
              <div className="message left">
                <span className="speaker rudra">RUDRA:</span>
                <span className="text">"(Very quietly) Woh aate hi 3 alag topics pe baat kar chuki hai."</span>
              </div>
              
              <div className="message right">
                <span className="text">"Record 7 tha. Ek baar 11."</span>
                <span className="speaker kaira">:KAIRA</span>
              </div>

              <div className="message left">
                <span className="speaker rudra">RUDRA:</span>
                <span className="text">"(Closes eyes again) Haan. Main yaad karta hoon."</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <style jsx>{`
        .chronos-root {
          background-color: var(--ink, #030303);
          color: var(--paper, #f4f0eb);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          position: relative;
        }

        .lore-bg {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: radial-gradient(circle at center, #0a0f1a 0%, #030303 100%);
          z-index: 1;
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
          gap: 50px;
          margin: 0;
          padding: 0;
        }

        .subnav-links a {
          color: var(--paper-dim, #d0c8be);
          text-decoration: none;
          font-family: 'Inter', monospace;
          font-size: 0.8rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          transition: 0.3s ease;
        }

        .subnav-links a:hover {
          color: var(--ember, #c5a059);
        }

        .chronos-main {
          position: relative;
          z-index: 10;
          padding-bottom: 100px;
        }

        /* Hero / Overview */
        .lore-hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 20px;
        }

        .hero-content {
          max-width: 900px;
        }

        .cinzel-title {
          font-family: 'Cinzel', serif;
          font-weight: 400;
          letter-spacing: 3px;
          margin: 0;
          color: var(--paper, #f4f0eb);
        }

        .cinzel-title.huge {
          font-size: clamp(3rem, 8vw, 5rem);
          margin-top: 15px;
        }

        .gold { color: var(--ember, #c5a059); }

        .ember-line-center {
          width: 60px; height: 1px; background: var(--ember, #c5a059); margin: 30px auto;
        }
        
        .ember-line {
          width: 40px; height: 1px; background: var(--ember, #c5a059); margin: 15px 0;
        }

        .utility-tag {
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          letter-spacing: 4px;
          color: var(--ember, #c5a059);
        }

        .blink-slow { animation: blink 3s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        .lore-intro {
          font-size: 1.15rem;
          line-height: 1.9;
          color: var(--paper-dim, #d0c8be);
          font-weight: 300;
        }

        /* Shared Section Header */
        .section-header {
          text-align: center;
          margin-bottom: 80px;
          padding-top: 80px;
        }

        .section-header .cinzel-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
        }

        .subtitle {
          color: var(--paper-dim, #d0c8be);
          font-size: 1.1rem;
          font-weight: 300;
          letter-spacing: 1px;
        }

        /* Timeline Section */
        .timeline-section {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px 100px 20px;
        }

        .timeline-wrapper {
          position: relative;
          padding: 40px 0;
        }

        .center-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(244, 240, 235, 0.1);
          transform: translateX(-50%);
        }

        .timeline-node {
          position: relative;
          width: 50%;
          margin-bottom: 60px;
        }

        .timeline-node:last-child { margin-bottom: 0; }

        .left-align { left: 0; padding-right: 50px; text-align: right; }
        .right-align { left: 50%; padding-left: 50px; text-align: left; }

        .node-dot {
          position: absolute;
          top: 30px;
          width: 11px;
          height: 11px;
          background: var(--ink, #030303);
          border: 1px solid var(--ember, #c5a059);
          border-radius: 50%;
          z-index: 2;
          box-shadow: 0 0 10px rgba(197, 160, 89, 0.2);
          transition: 0.3s;
        }

        .left-align .node-dot { right: -6px; }
        .right-align .node-dot { left: -6px; }

        .timeline-node:hover .node-dot {
          background: var(--ember, #c5a059);
          box-shadow: 0 0 15px rgba(197, 160, 89, 0.6);
        }

        .node-card {
          background: #080808;
          border: 1px solid #1a1a1a;
          padding: 40px;
          transition: 0.4s ease;
        }

        .timeline-node:hover .node-card {
          border-color: rgba(197, 160, 89, 0.4);
          transform: translateY(-5px);
        }

        .era-tag {
          display: block;
          font-family: 'Inter', monospace;
          color: var(--ember, #c5a059);
          font-size: 0.75rem;
          letter-spacing: 3px;
          margin-bottom: 15px;
        }

        .node-title {
          font-family: 'Cinzel', serif;
          font-size: 1.8rem;
          font-weight: 400;
          margin: 0 0 5px 0;
          color: var(--paper, #f4f0eb);
        }

        .node-subtitle {
          font-size: 0.95rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0 0 20px 0;
        }

        .node-desc {
          color: var(--paper-dim, #d0c8be);
          line-height: 1.8;
          font-weight: 300;
          margin: 0;
        }

        /* Characters Section */
        .characters-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px 100px 20px;
        }

        .characters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }

        .char-card {
          background: #080808;
          border: 1px solid #1a1a1a;
          overflow: hidden;
          transition: 0.4s ease;
        }

        .char-card:hover {
          border-color: var(--ember, #c5a059);
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.5);
        }

        .char-visual {
          width: 100%;
          height: 400px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid #1a1a1a;
        }

        .char-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(40%) contrast(1.1);
          transition: 0.6s ease;
        }

        .char-card:hover .char-img {
          filter: grayscale(0%) contrast(1.2);
          transform: scale(1.05);
        }

        .char-visual-placeholder {
          width: 100%;
          height: 400px;
          background: #050505;
          border-bottom: 1px solid #1a1a1a;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .visual-tag {
          font-family: 'Inter', monospace;
          color: #333;
          font-size: 0.8rem;
          letter-spacing: 4px;
          z-index: 2;
        }

        .scanline-effect {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to bottom, transparent 50%, rgba(197, 160, 89, 0.05) 51%);
          background-size: 100% 4px;
          z-index: 1;
          pointer-events: none;
        }

        .char-info {
          padding: 40px;
        }

        .char-name {
          font-family: 'Cinzel', serif;
          font-size: 1.8rem;
          color: var(--paper, #f4f0eb);
          margin: 10px 0 5px 0;
          font-weight: 400;
        }

        .char-role {
          color: #777;
          font-size: 0.8rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0;
        }

        .char-desc {
          color: var(--paper-dim, #d0c8be);
          line-height: 1.7;
          font-weight: 300;
          margin: 0;
        }

        /* Intercepted Comms Log */
        .comms-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px 100px 20px;
        }

        .comms-container {
          background: #050505;
          border: 1px solid #1a1a1a;
          padding: 40px;
          border-left: 3px solid #ff4757;
        }

        .comms-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          border-bottom: 1px solid #1a1a1a;
          padding-bottom: 15px;
        }

        .timestamp {
          font-family: 'Inter', monospace;
          font-size: 0.7rem;
          color: #666;
          letter-spacing: 2px;
        }
        
        .chat-box {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .context-text {
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          color: #888;
          text-align: center;
          margin-bottom: 10px;
        }
        
        .message {
          display: flex;
          gap: 15px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .message.left { justify-content: flex-start; }
        .message.right { justify-content: flex-end; text-align: right; }
        
        .speaker {
          font-family: 'Cinzel', serif;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .speaker.rudra { color: #9B5DE5; }
        .speaker.kaira { color: #00f2ff; }
        
        .message .text {
          color: var(--paper-dim, #d0c8be);
          font-weight: 300;
          font-style: italic;
        }

        /* Mobile */
        @media (max-width: 900px) {
          .timeline-node {
            width: 100%;
            padding: 0 0 0 40px;
            text-align: left;
          }
          .center-line {
            left: 0;
            transform: none;
          }
          .left-align .node-dot, .right-align .node-dot {
            left: -6px;
          }
          .sticky-subnav {
            overflow-x: auto;
            justify-content: flex-start;
            padding: 15px 20px;
          }
          .char-visual, .char-visual-placeholder {
            height: 300px;
          }
          .message {
            flex-direction: column;
            gap: 5px;
          }
          .message.right {
            text-align: left;
            flex-direction: column-reverse;
          }
        }
      `}</style>
    </div>
  );
}