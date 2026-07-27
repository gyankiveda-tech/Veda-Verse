import Head from 'next/head';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// --- DYNAMIC IMPORTS (Cleaned Up 3D, Old Sections & Added New Components) ---
const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });
const CinematicHero = dynamic(() => import('../components/CinematicHero'), { ssr: false });
const AudioEngine = dynamic(() => import('../components/AudioEngine'), { ssr: false });
const FounderSection = dynamic(() => import('../components/FounderSection'), { ssr: false });
const StudioTimeline = dynamic(() => import('../components/StudioTimeline'), { ssr: false });

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [activeLog, setActiveLog] = useState({ title: '', content: '' });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768 || window.innerHeight > window.innerWidth);
    };

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollPos(window.scrollY);
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const unsubscribe = onAuthStateChanged(auth, (u) => { 
      setUser(u); 
      setLoading(false); 
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const handleReadLog = (title, content) => {
    setActiveLog({ title, content });
    setIsLogOpen(true);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="title-glow">INITIALIZING_STUDIO...</div>
        <div className="loading-bar"></div>
        <style jsx>{`
          .loading-screen { 
            background: #030303; height: 100vh; width: 100vw;
            display: flex; flex-direction: column; align-items: center; justify-content: center; 
            color: #c5a059; font-family: 'Inter', monospace; 
          }
          .loading-bar { width: 150px; height: 2px; background: #111; margin-top: 20px; position: relative; overflow: hidden; border-radius: 10px; }
          .loading-bar::after { content: ''; position: absolute; width: 60px; height: 100%; background: #c5a059; animation: load-slide 1.5s infinite ease-in-out; }
          @keyframes load-slide { 0% { left: -60px; } 100% { left: 150px; } }
          .title-glow { text-shadow: 0 0 15px rgba(197, 160, 89, 0.4); font-weight: 600; font-size: 1.1rem; letter-spacing: 5px; }
        `}</style>
      </div>
    );
  }

  const heroOpacity = Math.max(0, 1 - scrollPos / 500);
  const heroMoveUp = -scrollPos * 0.5;

  return (
    <div className="studio-root">
      <Head>
        <title>VedaVerse | Premium Animation & Comic Studio</title>
        <meta name="description" content="India's original intellectual property studio focused on high-end anime and digital comics. Enter the VedaVerse." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>

      <AudioEngine />
      <Navbar />

      <main className="main-scroller">
        
        {/* Dark Cinematic Background (Primary - Ink) */}
        <div className="dark-background"></div>

        {/* Hero Layer */}
        {!isMobile && (
          <section className="hero-layer" style={{ 
            opacity: heroOpacity,
            transform: `translateY(${heroMoveUp}px)`,
            pointerEvents: 'none', 
            visibility: heroOpacity <= 0 ? 'hidden' : 'visible',
            zIndex: 15
          }}>
            <CinematicHero />
          </section>
        )}

        {/* Phase A: Studio Identity & Brand Content */}
        <div className="content-flow">
          
          {/* Section 1: Brand Positioning */}
          <section className="studio-section brand-section">
            <div className="section-content">
              <h2 className="sec-title">WHAT IS <span className="gold">VEDAVERSE?</span></h2>
              <div className="accent-line"></div>
              <p className="sec-desc">
                Vedaverse Studio creates original manga and anime that honour the craft of sequential art and the emotional power of animation — stories made by artists who care, for audiences who feel. We exist to prove that world-class manga, anime, and original entertainment intellectual property can be created from India. Not a regional imitation, but stories, characters, and worlds capable of outlasting the trends of the moment they were made in.
              </p>
            </div>
          </section>

          {/* Section 2: Mission & Vision (The Constitution) */}
          <section className="studio-section constitution-section">
            <div className="section-content">
              <h2 className="sec-title">OUR <span className="gold">CONSTITUTION</span></h2>
              <div className="accent-line"></div>
              <div className="grid-3-col">
                <div className="policy-card" onClick={() => handleReadLog("STORY GOVERNS EVERYTHING", "Technology, art style, and business decisions exist to serve the story. When any of them begin to lead instead, the story is already being compromised.")}>
                  <h3>01. STORY GOVERNS EVERYTHING</h3>
                  <p>Technology and art style exist to serve the story. If they lead, the story is compromised. <span className="read-more">[READ CORE]</span></p>
                </div>
                <div className="policy-card" onClick={() => handleReadLog("CRAFT OUTRANKS SPEED", "We would rather publish less, and publish work that lasts, than publish often and be forgotten.")}>
                  <h3>02. CRAFT OUTRANKS SPEED</h3>
                  <p>We would rather publish less, and publish work that lasts, than publish often and be forgotten. <span className="read-more">[READ CORE]</span></p>
                </div>
                <div className="policy-card" onClick={() => handleReadLog("DECADES, NOT QUARTERS", "Every major decision is measured against the studio this is intended to become in twenty years, not the convenience of the present one.")}>
                  <h3>03. DECADES, NOT QUARTERS</h3>
                  <p>Every major decision is measured against the studio this is intended to become in twenty years. <span className="read-more">[READ CORE]</span></p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Founder Section (Modular Component) */}
          <FounderSection />

          {/* Section 4: Studio Timeline / Roadmap (Modular Component) */}
          <StudioTimeline />

          <Footer />
        </div>
      </main>

      {/* Overlay Modals for Logs/Constitution */}
      {isLogOpen && (
        <div className="overlay-portal" onClick={() => setIsLogOpen(false)}>
          <div className="studio-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="status-blink">● VEDAVERSE_DOCUMENTATION</span>
              <button className="close-btn" onClick={() => setIsLogOpen(false)}>CLOSE</button>
            </div>
            <div className="modal-body">
              <h1 className="log-title">{activeLog.title}</h1>
              <div className="scanner-line"></div>
              <p className="log-text">{activeLog.content}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .studio-root { 
          background: #030303; min-height: 100vh; color: #f4f0eb; width: 100%; position: relative; font-family: 'Inter', sans-serif;
        }

        .dark-background {
          position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
          background: #050505; /* Primary - Ink */
          z-index: 1;
        }

        .hero-layer { 
          position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.1s linear;
        }

        .content-flow {
          position: relative;
          z-index: 20;
          padding-top: ${isMobile ? '70vh' : '100vh'};
        }

        /* --- STUDIO SECTIONS --- */
        .studio-section {
          padding: 100px 20px;
          display: flex;
          justify-content: center;
          border-bottom: 1px solid rgba(244, 240, 235, 0.05); /* Subtle Paper line */
          background: #030303;
        }

        .section-content {
          max-width: 1000px;
          width: 100%;
        }

        .sec-title {
          font-size: 2.2rem;
          font-weight: 400;
          letter-spacing: 2px;
          margin: 0 0 15px 0;
          font-family: 'Cinzel', serif; /* Editorial Serif */
        }

        .gold { color: #c5a059; } /* Accent - Ember */
        .accent-line { width: 40px; height: 1px; background: #c5a059; margin-bottom: 40px; }
        
        .sec-desc {
          color: #d0c8be; /* Dimmed Paper */
          font-size: 1.15rem;
          line-height: 1.9;
          max-width: 850px;
          font-weight: 300;
        }

        /* Grid */
        .grid-3-col {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .policy-card {
          background: #0a0a0a;
          border: 1px solid #111;
          padding: 40px 30px;
          cursor: pointer;
          transition: 0.4s ease;
        }
        .policy-card:hover { border-color: #c5a059; transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .policy-card h3 { color: #f4f0eb; margin-top: 0; font-size: 1.1rem; letter-spacing: 1px; font-family: 'Cinzel', serif; font-weight: 400;}
        .policy-card p { color: #a09a90; font-size: 0.95rem; line-height: 1.7; font-weight: 300; }
        .read-more { color: #c5a059; font-weight: 400; font-size: 0.8rem; margin-top: 15px; display: inline-block; letter-spacing: 1px; }

        /* Modals */
        .overlay-portal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(3, 3, 3, 0.98); z-index: 9999; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(10px); }
        .studio-modal { width: 90%; max-width: 650px; border: 1px solid #222; border-top: 1px solid #c5a059; background: #080808; padding: 40px; }
        .modal-header { display: flex; justify-content: space-between; margin-bottom: 25px; font-size: 0.75rem; border-bottom: 1px solid #1a1a1a; padding-bottom: 15px; letter-spacing: 2px; }
        .status-blink { color: #c5a059; }
        .close-btn { background: none; border: none; color: #777; cursor: pointer; letter-spacing: 1px; transition: 0.3s; font-family: 'Inter', sans-serif; }
        .close-btn:hover { color: #f4f0eb; }
        .log-title { font-size: 1.6rem; margin: 0 0 20px 0; font-family: 'Cinzel', serif; font-weight: 400; color: #f4f0eb;}
        .log-text { color: #d0c8be; line-height: 1.9; font-size: 1.05rem; font-weight: 300; }

        @media (max-width: 768px) {
          .sec-title { font-size: 1.8rem; }
          .studio-section { padding: 60px 15px; }
          .grid-3-col { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}