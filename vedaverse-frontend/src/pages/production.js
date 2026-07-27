import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });

export default function Production() {
  
  // --- TIMER & AUDIO LOGIC (From Your Code) ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isReleased, setIsReleased] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const tickAudioRef = useRef(null);

  useEffect(() => {
    tickAudioRef.current = new Audio('/sounds/tick.mp3');
    tickAudioRef.current.volume = 0.5; 

    // Teaser Release Date
    const targetDate = new Date('April 9, 2026 21:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsReleased(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });

        if (soundEnabled && tickAudioRef.current) {
          tickAudioRef.current.currentTime = 0;
          tickAudioRef.current.play().catch(() => {});
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [soundEnabled]);

  // --- PHASE F PRODUCTION DATA ---
  const productionStatus = {
    currentStage: "PRE-PRODUCTION & FOUNDING TEAM ASSEMBLY",
    model: "INDEPENDENT REVENUE-SHARE PARTNERSHIP",
    scriptStatus: "100% LOCKED & COMPLETED",
    visualStatus: "GROUND ZERO - INITIATING"
  };

  const roadmapStages = [
    {
      phase: "PHASE 01",
      title: "LORE & SCRIPTING",
      status: "COMPLETED",
      desc: "World-building, character bibles, and the complete 17-episode master script for Season 1 have been finalized. The narrative foundation is absolute."
    },
    {
      phase: "PHASE 02",
      title: "CORE ASSEMBLY",
      status: "ACTIVE",
      desc: "We are not hiring employees; we are seeking founding partners. Recruiting Art Directors, Storyboard Artists, and Concept Artists on a revenue-share model to build this universe."
    },
    {
      phase: "PHASE 03",
      title: "VISUAL TRANSLATION",
      status: "UPCOMING",
      desc: "Converting the written master script into panel layouts, storyboards, and establishing the visual pacing of the manga."
    },
    {
      phase: "PHASE 04",
      title: "FINAL PRODUCTION",
      status: "UPCOMING",
      desc: "Inking, toning, lettering, and final editorial reviews before deploying the chapters to the public archive."
    }
  ];

  const vaultDocuments = [
    {
      id: "DOC-001",
      name: "VEDA_VERSE_SEASON1_MASTER_FINAL-1.pdf",
      tag: "CORE BIBLE",
      desc: "The absolute foundational blueprint of our universe. Contains India's First Supernatural Cyberpunk Manga vision, Season 1 Complete Script, and full Character Lore."
    },
    {
      id: "DOC-002",
      name: "EPISODE_INDEX_S1",
      tag: "ARCHIVE",
      desc: "17 distinct episodes including core story arcs (The Golden Cage, Anant Pratibimb) and intimate side stories (Bazaar Din, Khamoshi)."
    },
    {
      id: "DOC-003",
      name: "ENTITY_CLASSIFICATION",
      tag: "RESTRICTED",
      desc: "Detailed psychological and power-scaling profiles for Gyan, Kabir, Kaira, Rudra, Tara, Master Genjiro, and cosmic threats like The Eraser and Chaya."
    }
  ];

  const productionRoles = [
    {
      id: "STORYBOARD",
      title: "STORYBOARD ARTIST",
      desc: "Translate scripts into visual blueprints. Establish camera angles, character blocking, and cinematic pacing before full production begins."
    },
    {
      id: "BACKGROUND",
      title: "BACKGROUND ARTIST",
      desc: "Paint detailed environments that ground the characters in a believable, emotionally resonant world maintaining spatial logic and lighting."
    },
    {
      id: "ANIMATOR",
      title: "KEY ANIMATOR",
      desc: "Breathe life into character performance, focusing on weight, emotion, and dynamic action in alignment with the studio's style."
    },
    {
      id: "COMPOSITOR",
      title: "COMPOSITOR / VFX",
      desc: "Assemble final frames, integrate 3D elements smoothly with 2D art, and apply the studio's signature atmospheric lighting."
    }
  ];

  return (
    <div className="production-page no-select">
      <Head>
        <title>Production Desk | Vedaverse Studio</title>
        <meta name="description" content="Inside the Vedaverse Production Pipeline, Teaser, Roadmap, and Open Roles." />
      </Head>
      
      <Navbar />

      {/* Sticky Sub-Navigation */}
      <div className="sticky-subnav">
        <ul className="subnav-links">
          <li><a href="#teaser">Teaser</a></li>
          <li><a href="#status">Status</a></li>
          <li><a href="#vault">The Vault</a></li>
          <li><a href="#roadmap">Roadmap</a></li>
          <li><a href="#roles">Recruitment</a></li>
        </ul>
      </div>

      <main className="studio-container">
        
        {/* Header Title */}
        <div className="page-header">
          <h4 className="utility-tag">PROJECT COMMAND CENTER</h4>
          <h1 className="main-title">THE <span className="gold">PRODUCTION</span> DESK</h1>
          <div className="ember-line-center"></div>
          <p className="subtitle">Inside the Gyan Ki Veda Anime Project</p>
        </div>

        {/* 1. Teaser & Timer Section (From Your Code) */}
        <section id="teaser" className="teaser-board">
          <div className="teaser-header">
            <div className="live-indicator"></div>
            <h2 className="status-title">PROJECT STATUS: <span className="text-dim">PRE-PRODUCTION</span></h2>
          </div>
          
          <div className="teaser-announcement">
            <div className="teaser-info">
              {isReleased ? (
                <h3 className="teaser-title released-text">CONCEPTUAL VISUAL TEASER: ACTIVE</h3>
              ) : (
                <h3 className="teaser-title">CONCEPT TEASER: DROPPING SOON</h3>
              )}

              <p className="teaser-desc">
                Before the final animation pipeline is engaged, we are unveiling our conceptual vision. Developed through AI-assisted pre-production workflows, this visual teaser establishes the raw atmospheric tone, cinematic ambition, and sheer scale of <strong>Gyan Ki Veda</strong>. It serves as our foundational mood board—a glimpse into the reality we are building.
              </p>

              {!isReleased ? (
                <div className="timer-wrapper">
                  <button 
                    className={`sound-toggle ${soundEnabled ? 'active' : ''}`}
                    onClick={() => setSoundEnabled(!soundEnabled)}
                  >
                    {soundEnabled ? 'AUDIO: SYNCED' : 'ENABLE AUDIO SYNC'}
                  </button>
                  
                  <div className="countdown-timer">
                    <div className="time-box"><span>{timeLeft.days}</span><small>DAYS</small></div>
                    <div className="time-box"><span>{timeLeft.hours}</span><small>HOURS</small></div>
                    <div className="time-box"><span>{timeLeft.minutes}</span><small>MINS</small></div>
                    <div className="time-box"><span>{timeLeft.seconds}</span><small>SECS</small></div>
                  </div>
                </div>
              ) : (
                <div className="released-teaser-wrapper">
                  <a href="https://www.youtube.com/watch?v=MfGkxyepJkc" target="_blank" rel="noopener noreferrer" className="thumbnail-link">
                    <div className="thumbnail-container">
                      <img src="/images/teaser-thumbnail.jpg" alt="Gyan Ki Veda Teaser Thumbnail" className="teaser-thumbnail" />
                      <div className="play-overlay">
                        <span className="play-icon">▶</span>
                      </div>
                    </div>
                    <p className="teaser-caption">ENTER THE SIMULATION</p>
                  </a>
                </div>
              )}

              <div className="social-buttons">
                <a href="https://youtube.com/@vedaverse-gyan" target="_blank" rel="noopener noreferrer" className="yt-button">
                  SUBSCRIBE ON YOUTUBE
                </a>
                <a href="https://www.instagram.com/vedaverse.gyan/" target="_blank" rel="noopener noreferrer" className="ig-button">
                  FOLLOW ON INSTAGRAM
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Lore Section */}
        <section className="about-anime">
          <div className="section-title-wrapper">
            <h2 className="section-title">WHAT IS <span className="gold">GYAN KI VEDA?</span></h2>
            <div className="ember-line-center"></div>
          </div>
          <div className="about-content">
            <p>
              It is more than just a story; it is an experience. <strong>"Gyan Ki Veda"</strong> is an ambitious indie sci-fi and action anime that pushes the boundaries of reality. Following the journey of an ordinary student thrust into a multiversal conflict, the series blends deep quantum concepts, intense emotional stakes, and breathtaking cinematic visuals.
            </p>
            <p>
              Driven by a passion for pure storytelling, our team is crafting an immersive universe where every frame holds a deeper meaning. Reality is shifting, and the original Earth faces a threat that should not exist. The script is locked. The pipeline is ready.
            </p>
          </div>
        </section>

        {/* 3. Production Status (Phase F) */}
        <section id="status" className="status-section">
          <div className="status-grid">
            <div className="status-primary">
              <h4 className="utility-heading">CURRENT DIRECTIVE</h4>
              <h2 className="status-headline">{productionStatus.currentStage}</h2>
              <div className="ember-line"></div>
              <p className="status-desc">
                Vedaverse is an independent studio. We are currently operating on an <strong>{productionStatus.model}</strong>. We are not looking for corporate employees; we are searching for visionary founding partners to breathe visual life into a fully completed script.
              </p>
              <div className="cta-wrapper">
                <Link href="/recruitment" className="primary-cta">JOIN THE FOUNDING TEAM</Link>
              </div>
            </div>
            <div className="status-secondary">
              <div className="stat-box">
                <span className="stat-label">SCRIPT STATUS</span>
                <span className="stat-value gold">{productionStatus.scriptStatus}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">VISUAL PRODUCTION</span>
                <span className="stat-value">{productionStatus.visualStatus}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. The Vault (Phase F) */}
        <section id="vault" className="vault-section">
          <div className="section-title-wrapper">
            <h2 className="section-title">THE <span className="gold">VAULT</span></h2>
            <div className="ember-line-center"></div>
            <p className="subtitle-desc text-center">Reference documents dictating the architecture of the Vedaverse.</p>
          </div>

          <div className="docs-grid">
            {vaultDocuments.map((doc, index) => (
              <div key={index} className="doc-card">
                <div className="doc-header">
                  <span className="doc-id">{doc.id}</span>
                  <span className="doc-tag">{doc.tag}</span>
                </div>
                <h3 className="doc-name">{doc.name}</h3>
                <p className="doc-desc">{doc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Roadmap (Phase F) */}
        <section id="roadmap" className="roadmap-section">
          <div className="section-title-wrapper">
            <h2 className="section-title">DEVELOPMENT <span className="gold">ROADMAP</span></h2>
            <div className="ember-line-center"></div>
          </div>

          <div className="roadmap-timeline">
            <div className="timeline-line"></div>
            {roadmapStages.map((stage, index) => (
              <div key={index} className={`roadmap-node ${stage.status === 'ACTIVE' ? 'active-node' : ''}`}>
                <div className="node-marker"></div>
                <div className="node-content">
                  <div className="node-meta">
                    <span className="utility-tag">{stage.phase}</span>
                    <span className={`status-badge ${stage.status.toLowerCase()}`}>{stage.status}</span>
                  </div>
                  <h3 className="node-title">{stage.title}</h3>
                  <p className="node-desc">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Production Roles (From Your Code) */}
        <section id="roles" className="production-roles-section">
          <div className="section-title-wrapper">
            <h2 className="section-title">PRODUCTION <span className="gold">REQUIREMENTS</span></h2>
            <div className="ember-line-center"></div>
            <p className="desc-text text-center">
              We are assembling a core team of craftsmen. We hire for character and potential as much as for portfolio, prioritizing the craft of storytelling.
            </p>
          </div>

          <div className="roles-grid">
            {productionRoles.map((role, index) => (
              <div key={index} className="role-card">
                <div className="role-status">
                  <span className="status-dot blink"></span> POSITION AVAILABLE
                </div>
                <h3 className="role-name">{role.title}</h3>
                <div className="ember-line"></div>
                <p className="role-desc">{role.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Future Expansion CTA */}
        <section className="join-journey-section">
          <h2 className="join-title">FUTURE <span className="gold">EXPANSION</span></h2>
          <p className="join-desc">
            Great worlds are not built by one person. They are built by people who choose to believe in the same future. If you possess the discipline to serve the story and the craft to execute it, we invite you to build this reality with us.
          </p>
          <Link href="/recruitment" passHref>
            <button className="inter-btn cta-btn">JOIN THE JOURNEY</button>
          </Link>
        </section>

      </main>

      <Footer />

      <style jsx>{`
        /* Core Layout & Theme */
        .production-page { 
          background-color: var(--ink, #030303); 
          min-height: 100vh; 
          color: var(--paper, #f4f0eb); 
          font-family: 'Inter', sans-serif; 
        }
        .studio-container { max-width: 1100px; margin: 0 auto; padding: 80px 20px 100px; }
        .gold { color: var(--ember, #c5a059); }
        .text-center { text-align: center; margin: 0 auto; max-width: 700px; }

        /* Sub-Nav */
        .sticky-subnav {
          position: sticky; top: 70px; background: rgba(3, 3, 3, 0.95); backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(244,240,235,0.08); z-index: 900; padding: 15px 0; display: flex; justify-content: center;
        }
        .subnav-links { list-style: none; display: flex; gap: 40px; margin: 0; padding: 0; }
        .subnav-links a { color: #d0c8be; text-decoration: none; font-family: 'Inter', monospace; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; transition: 0.3s ease; }
        .subnav-links a:hover { color: #c5a059; }

        /* Typography & Lines */
        .utility-tag { font-family: 'Inter', monospace; font-size: 0.75rem; letter-spacing: 3px; color: #c5a059; text-transform: uppercase; margin-bottom: 15px; }
        .utility-heading { font-family: 'Inter', monospace; font-size: 0.85rem; letter-spacing: 2px; color: #777; margin-bottom: 10px; text-transform: uppercase; }
        .page-header { text-align: center; margin-bottom: 80px; display: flex; flex-direction: column; align-items: center; }
        .main-title { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 400; letter-spacing: 2px; margin: 0; font-family: 'Cinzel', serif; }
        .subtitle { color: #d0c8be; font-size: 1.1rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 300; }
        .subtitle-desc { color: #d0c8be; font-size: 1rem; font-weight: 300; margin: 0; }
        .desc-text { color: #a09a90; font-size: 1rem; line-height: 1.8; font-weight: 300; }
        .ember-line-center { width: 60px; height: 1px; background: #c5a059; margin: 25px auto; }
        .ember-line { width: 40px; height: 1px; background: #c5a059; margin: 20px 0; }

        .section-title-wrapper { text-align: center; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center;}
        .section-title { font-size: 2.2rem; letter-spacing: 2px; margin: 0; font-family: 'Cinzel', serif; font-weight: 400; }

        /* 1. Teaser Board (From Your Code) */
        .teaser-board { background: #0a0a0a; border: 1px solid #111; padding: 50px; margin-bottom: 80px; position: relative; }
        .teaser-board::before { content: ''; position: absolute; top: 0; left: 0; width: 2px; height: 100%; background: #c5a059; }
        .teaser-header { display: flex; align-items: center; gap: 15px; margin-bottom: 30px; border-bottom: 1px solid #1a1a1a; padding-bottom: 20px; }
        .live-indicator { width: 8px; height: 8px; background: #c5a059; border-radius: 50%; box-shadow: 0 0 10px rgba(197, 160, 89, 0.5); }
        .status-title { font-family: 'Inter', monospace; font-size: 0.85rem; letter-spacing: 2px; margin: 0; font-weight: 600; text-transform: uppercase; }
        .text-dim { color: #888; font-weight: 400; }
        .teaser-announcement { display: flex; flex-direction: column; gap: 20px; width: 100%; }
        .teaser-title { font-family: 'Cinzel', serif; font-size: 2rem; margin: 0 0 15px 0; letter-spacing: 1px; color: #f4f0eb; font-weight: 400; }
        .released-text { color: #c5a059; }
        .teaser-desc { color: #a09a90; line-height: 1.8; font-size: 1rem; max-width: 850px; margin-bottom: 30px; font-weight: 300; }

        .timer-wrapper { margin-bottom: 40px; }
        .sound-toggle { background: transparent; color: #777; border: 1px solid #333; padding: 8px 16px; font-family: 'Inter', monospace; font-size: 0.7rem; cursor: pointer; margin-bottom: 20px; letter-spacing: 2px; transition: 0.3s; }
        .sound-toggle.active { color: #c5a059; border-color: #c5a059; }
        .countdown-timer { display: flex; gap: 20px; flex-wrap: wrap; }
        .time-box { background: #050505; border: 1px solid #111; padding: 20px; min-width: 90px; text-align: center; flex: 1; max-width: 140px; }
        .time-box span { display: block; font-size: 2.5rem; color: #f4f0eb; font-weight: 300; font-family: 'Cinzel', serif; }
        .time-box small { color: #777; font-size: 0.7rem; letter-spacing: 3px; font-family: 'Inter', monospace; margin-top: 5px; display: block; }

        .released-teaser-wrapper { margin-bottom: 40px; width: 100%; max-width: 850px; }
        .thumbnail-link { text-decoration: none; display: block; }
        .thumbnail-container { position: relative; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; border: 1px solid #222; transition: all 0.4s ease; }
        .thumbnail-link:hover .thumbnail-container { border-color: #c5a059; }
        .teaser-thumbnail { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease; filter: grayscale(80%) brightness(0.7); }
        .thumbnail-link:hover .teaser-thumbnail { transform: scale(1.03); filter: grayscale(20%) brightness(1); }
        .play-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: rgba(3,3,3,0.3); transition: 0.3s ease; }
        .play-icon { font-size: 2rem; color: #030303; background: #c5a059; width: 70px; height: 70px; display: flex; justify-content: center; align-items: center; border-radius: 50%; padding-left: 5px; transition: 0.3s ease; }
        .thumbnail-link:hover .play-icon { transform: scale(1.1); background: #f4f0eb; }
        .teaser-caption { color: #c5a059; font-family: 'Inter', monospace; font-size: 0.8rem; margin-top: 20px; letter-spacing: 4px; text-transform: uppercase; text-align: center; transition: 0.3s; }

        .social-buttons { display: flex; gap: 20px; flex-wrap: wrap; margin-top: 20px; }
        .yt-button, .ig-button { padding: 12px 25px; font-family: 'Inter', sans-serif; font-size: 0.8rem; font-weight: 600; text-decoration: none; transition: 0.3s ease; letter-spacing: 2px; }
        .yt-button { background: #f4f0eb; color: #030303; border: 1px solid #f4f0eb; }
        .yt-button:hover { background: transparent; color: #f4f0eb; }
        .ig-button { background: transparent; color: #c5a059; border: 1px solid #c5a059; }
        .ig-button:hover { background: #c5a059; color: #030303; }

        /* 2. About Lore */
        .about-anime { padding: 0 20px; margin-bottom: 100px; text-align: center; }
        .about-content p { color: #a09a90; font-size: 1.1rem; line-height: 1.9; max-width: 800px; margin: 0 auto 25px auto; font-weight: 300; }

        /* 3. Production Status Grid */
        .status-section { margin-bottom: 100px; }
        .status-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; }
        .status-primary { background: #080808; border: 1px solid #1a1a1a; padding: 50px; border-left: 3px solid #c5a059; }
        .status-headline { font-family: 'Cinzel', serif; font-size: 2rem; margin: 0; font-weight: 400; letter-spacing: 1px; }
        .status-desc { color: #d0c8be; font-size: 1rem; line-height: 1.8; margin-bottom: 30px; font-weight: 300; }
        .status-desc strong { color: #f4f0eb; font-weight: 600; }
        .primary-cta { display: inline-block; background: #f4f0eb; color: #030303; padding: 14px 30px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.8rem; letter-spacing: 2px; text-decoration: none; transition: 0.3s ease; border-radius: 2px; }
        .primary-cta:hover { background: #c5a059; }
        .status-secondary { display: flex; flex-direction: column; gap: 20px; }
        .stat-box { background: #050505; border: 1px dashed #333; padding: 30px; display: flex; flex-direction: column; justify-content: center; }
        .stat-label { font-family: 'Inter', monospace; font-size: 0.7rem; color: #777; letter-spacing: 2px; margin-bottom: 10px; }
        .stat-value { font-family: 'Inter', monospace; font-size: 1.1rem; font-weight: 600; letter-spacing: 1px; }

        /* 4. Vault Documents */
        .vault-section { margin-bottom: 100px; }
        .docs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .doc-card { background: #050505; border: 1px solid #1a1a1a; padding: 30px; transition: 0.3s ease; position: relative; overflow: hidden; }
        .doc-card:hover { border-color: #c5a059; transform: translateY(-5px); }
        .doc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .doc-id { font-family: 'Inter', monospace; font-size: 0.7rem; color: #555; }
        .doc-tag { font-family: 'Inter', monospace; font-size: 0.65rem; background: rgba(197, 160, 89, 0.1); color: #c5a059; padding: 4px 8px; border: 1px solid rgba(197, 160, 89, 0.3); border-radius: 2px; }
        .doc-name { font-family: 'Inter', monospace; font-size: 0.95rem; color: #f4f0eb; margin: 0 0 15px 0; word-break: break-all; letter-spacing: 1px; }
        .doc-desc { color: #d0c8be; font-size: 0.9rem; line-height: 1.6; margin: 0; font-weight: 300; }

        /* 5. Roadmap Timeline */
        .roadmap-section { margin-bottom: 100px; }
        .roadmap-timeline { position: relative; padding: 40px 0; max-width: 800px; margin: 0 auto; }
        .timeline-line { position: absolute; left: 24px; top: 0; bottom: 0; width: 1px; background: rgba(244, 240, 235, 0.1); }
        .roadmap-node { position: relative; padding-left: 80px; margin-bottom: 50px; opacity: 0.6; transition: 0.3s ease; }
        .roadmap-node.active-node, .roadmap-node:hover { opacity: 1; }
        .roadmap-node:last-child { margin-bottom: 0; }
        .node-marker { position: absolute; left: 19px; top: 5px; width: 11px; height: 11px; border-radius: 50%; background: #030303; border: 1px solid #555; z-index: 2; transition: 0.3s ease; }
        .active-node .node-marker, .roadmap-node:hover .node-marker { border-color: #c5a059; background: #c5a059; box-shadow: 0 0 15px rgba(197, 160, 89, 0.5); }
        .node-content { background: #080808; border: 1px solid #1a1a1a; padding: 30px; transition: 0.3s ease; }
        .active-node .node-content { border-color: rgba(197, 160, 89, 0.3); }
        .roadmap-node:hover .node-content { border-color: #c5a059; transform: translateX(5px); }
        .node-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .status-badge { font-family: 'Inter', monospace; font-size: 0.65rem; padding: 4px 8px; border-radius: 2px; letter-spacing: 1px; }
        .status-badge.completed { background: rgba(244, 240, 235, 0.1); color: #d0c8be; border: 1px solid #333; }
        .status-badge.active { background: rgba(197, 160, 89, 0.1); color: #c5a059; border: 1px solid rgba(197, 160, 89, 0.4); }
        .status-badge.upcoming { background: transparent; color: #555; border: 1px dashed #333; }
        .node-title { font-family: 'Cinzel', serif; font-size: 1.5rem; font-weight: 400; margin: 0 0 10px 0; color: #f4f0eb; letter-spacing: 1px; }
        .node-desc { color: #d0c8be; font-size: 0.95rem; line-height: 1.6; margin: 0; font-weight: 300; }

        /* 6. Roles Grid */
        .production-roles-section { margin-bottom: 100px; }
        .roles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; margin-top: 50px; }
        .role-card { background: #080808; border: 1px solid #111; padding: 40px; transition: 0.4s ease; }
        .role-card:hover { border-color: #c5a059; transform: translateY(-5px); }
        .role-status { font-family: 'Inter', monospace; font-size: 0.65rem; color: #888; letter-spacing: 2px; margin-bottom: 25px; display: flex; align-items: center; gap: 8px; }
        .status-dot { width: 6px; height: 6px; background: #c5a059; border-radius: 50%; }
        .blink { animation: blink-soft 2s infinite; }
        @keyframes blink-soft { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .role-name { font-family: 'Cinzel', serif; font-size: 1.4rem; color: #f4f0eb; margin: 0; font-weight: 400; letter-spacing: 1px; }
        .role-desc { color: #a09a90; font-size: 0.95rem; line-height: 1.7; margin: 0; font-weight: 300; }

        /* 7. Join CTA */
        .join-journey-section { background: radial-gradient(circle at center, #0a0a0a 0%, #030303 100%); border: 1px solid #111; padding: 80px 40px; text-align: center; display: flex; flex-direction: column; align-items: center; }
        .join-title { font-family: 'Cinzel', serif; font-size: 2.2rem; font-weight: 400; letter-spacing: 2px; margin: 0 0 20px 0; }
        .join-desc { color: #a09a90; font-size: 1.1rem; line-height: 1.8; max-width: 700px; margin: 0 0 40px 0; font-weight: 300; }
        .inter-btn { background: transparent; border: 1px solid #c5a059; color: #c5a059; padding: 15px 35px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.85rem; letter-spacing: 2px; cursor: pointer; transition: 0.3s ease; text-transform: uppercase; }
        .inter-btn:hover { background: #c5a059; color: #030303; }

        /* Mobile */
        @media (max-width: 900px) {
          .status-grid { grid-template-columns: 1fr; }
          .roadmap-timeline { padding-left: 20px; }
          .timeline-line { left: 44px; }
          .node-marker { left: 39px; }
          .roles-grid { grid-template-columns: 1fr; }
          .countdown-timer { justify-content: center; }
          .main-title { font-size: 2.2rem; }
          .social-buttons { justify-content: center; }
          .teaser-board { padding: 30px 20px; }
          .play-icon { width: 50px; height: 50px; font-size: 1.5rem; }
          .join-journey-section { padding: 60px 20px; }
          .sticky-subnav { overflow-x: auto; justify-content: flex-start; padding: 15px 20px; }
        }
      `}</style>
    </div>
  );
}