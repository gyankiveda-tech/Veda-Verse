import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });
const AudioEngine = dynamic(() => import('../components/AudioEngine'), { ssr: false });

export default function DevelopmentStatus() {
  
  // Feature 26: Chapter Progress (Updated for Real Pre-Production Status)
  const currentChapter = {
    title: "VOLUME 01 : CHAPTER 01",
    name: "GENESIS / THE FRACTURE",
    status: "PRE-PRODUCTION & RECRUITMENT",
    stages: [
      { name: "SCRIPTING & LORE BIBLE", progress: 100 },
      { name: "STORYBOARDING (DRAFTS)", progress: 0 },
      { name: "CHARACTER & ENV DESIGN", progress: 0 },
      { name: "INKING & LINEART", progress: 0 },
      { name: "BACKGROUNDS", progress: 0 },
      { name: "TONING, VFX & LETTERING", progress: 0 }
    ]
  };

  // Feature 25: Production Updates (Auditor Logs - Foundation Phase)
  const productionLogs = [
    {
      id: "LOG-003",
      date: "CURRENT STATUS",
      title: "RECRUITMENT PIPELINE ACTIVATED",
      content: "With the foundational script locked, Vedaverse Studio has officially opened its doors for recruitment. We are actively seeking Art Directors, Storyboard Artists, and Concept Artists to form the core creative team.",
      type: "RECRUITMENT"
    },
    {
      id: "LOG-002",
      date: "RECENT UPDATE",
      title: "VOLUME 01 SCRIPT LOCKED",
      content: "The master script and structural pacing for the first volume of 'Gyan Ki Veda' have been finalized. The narrative architecture is secure, prioritizing emotional depth and multiversal stakes.",
      type: "PRE-PRODUCTION"
    },
    {
      id: "LOG-001",
      date: "ARCHIVE LOG",
      title: "VEDAVERSE STUDIO FOUNDATION",
      content: "The independent framework for Vedaverse Studio has been established. Our constitution, brand guidelines, and production pipelines have been designed to prioritize craft over speed.",
      type: "STUDIO HQ"
    }
  ];

  // Feature 27: Future Projects (Realistic Projections)
  const futureProjects = [
    {
      title: "VOLUME 01 : CHAPTER 02",
      type: "MANGA CONTINUATION",
      status: "PENDING TEAM ASSEMBLY",
      desc: "Script is drafted. Visual production will commence immediately following the successful completion and review of Chapter 01."
    },
    {
      title: "PROJECT: ECHO",
      type: "CONCEPTUAL VISUAL TEASER",
      status: "IN DEVELOPMENT",
      desc: "A brief, AI-assisted visual proof-of-concept designed to establish the raw atmospheric tone and visual ambition of the Vedaverse."
    }
  ];

  return (
    <div className="status-root no-select">
      <Head>
        <title>Development Status | Vedaverse Studio</title>
        <meta name="description" content="Track the real-time production progress and recruitment status of Gyan Ki Veda." />
      </Head>

      <AudioEngine />
      <Navbar />

      <main className="status-main">
        <div className="container">
          
          <header className="page-header">
            <h4 className="utility-tag blink-slow">LIVE TELEMETRY ACTIVE</h4>
            <h1 className="cinzel-title">DEVELOPMENT <span className="gold">TRACKER</span></h1>
            <div className="ember-line-center"></div>
            <p className="lead-text">
              Real-time insight into the Vedaverse production pipeline. We believe in absolute transparency with our audience regarding the creation of our world.
            </p>
          </header>

          {/* Feature 26: Current Chapter Progress */}
          <section className="progress-section">
            <div className="section-header">
              <h2 className="cinzel-title">CURRENT <span className="gold">DIRECTIVE</span></h2>
              <div className="ember-line"></div>
            </div>

            <div className="progress-card">
              <div className="progress-header">
                <div>
                  <span className="utility-tag">{currentChapter.title}</span>
                  <h3 className="chapter-name">{currentChapter.name}</h3>
                </div>
                <div className="status-badge">
                  <span className="dot pulse"></span> {currentChapter.status}
                </div>
              </div>

              <div className="stages-wrapper">
                {currentChapter.stages.map((stage, index) => (
                  <div key={index} className="stage-row">
                    <div className="stage-info">
                      <span className="stage-name">{stage.name}</span>
                      <span className="stage-percent">{stage.progress}%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${stage.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="grid-2-col">
            
            {/* Feature 25: Production Updates */}
            <section className="logs-section">
              <div className="section-header">
                <h2 className="cinzel-title">AUDITOR <span className="gold">LOGS</span></h2>
                <div className="ember-line"></div>
                <p className="subtitle">Direct transmissions from the production desk.</p>
              </div>

              <div className="logs-container">
                {productionLogs.map((log, index) => (
                  <div key={index} className="log-card">
                    <div className="log-meta">
                      <span className="utility-tag">{log.date}</span>
                      <span className="utility-tag separator">•</span>
                      <span className="utility-tag">{log.type}</span>
                    </div>
                    <h4 className="log-title">{log.title}</h4>
                    <p className="log-content">{log.content}</p>
                    <span className="log-id">{log.id}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Feature 27: Future Projects */}
            <section className="future-section">
              <div className="section-header">
                <h2 className="cinzel-title">PROJECTED <span className="gold">MILESTONES</span></h2>
                <div className="ember-line"></div>
                <p className="subtitle">The expanding architecture of the Vedaverse.</p>
              </div>

              <div className="future-container">
                {futureProjects.map((project, index) => (
                  <div key={index} className="future-card">
                    <div className="future-meta">
                      <span className="utility-tag">{project.type}</span>
                      <span className="status-label">{project.status}</span>
                    </div>
                    <h4 className="future-title">{project.title}</h4>
                    <p className="future-desc">{project.desc}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>
      </main>

      <Footer />

      <style jsx>{`
        .status-root {
          background-color: var(--ink, #030303);
          color: var(--paper, #f4f0eb);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 150px 20px 100px 20px;
        }

        /* Utility Classes */
        .utility-tag {
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          letter-spacing: 3px;
          color: var(--ember, #c5a059);
          text-transform: uppercase;
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

        .blink-slow { animation: blink 3s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

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

        /* Common Section Headers */
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

        /* Progress Section */
        .progress-section {
          margin-bottom: 80px;
        }

        .progress-card {
          background: #080808;
          border: 1px solid #1a1a1a;
          padding: 50px;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 50px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .chapter-name {
          font-family: 'Cinzel', serif;
          font-size: 2.2rem;
          font-weight: 400;
          margin: 10px 0 0 0;
          letter-spacing: 1px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', monospace;
          font-size: 0.8rem;
          letter-spacing: 2px;
          color: #f4f0eb;
          background: #111;
          border: 1px solid #333;
          padding: 8px 16px;
        }

        .dot {
          width: 8px; height: 8px; background: #c5a059; border-radius: 50%; /* Changed to Ember to match "Pre-production" vibe */
        }
        .pulse { box-shadow: 0 0 10px rgba(197, 160, 89, 0.5); animation: pulse-gold 2s infinite; }
        @keyframes pulse-gold { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        .stages-wrapper {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .stage-row {
          width: 100%;
        }

        .stage-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .stage-name {
          font-family: 'Inter', monospace;
          font-size: 0.85rem;
          letter-spacing: 1.5px;
          color: var(--paper-dim, #d0c8be);
        }

        .stage-percent {
          font-family: 'Inter', monospace;
          font-size: 0.85rem;
          color: var(--ember, #c5a059);
        }

        .progress-bar-bg {
          width: 100%;
          height: 4px;
          background: #1a1a1a;
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--ember, #c5a059);
          box-shadow: 0 0 10px rgba(197, 160, 89, 0.5);
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* 2 Column Layout for Logs & Future Projects */
        .grid-2-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        /* Logs Section */
        .logs-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .log-card {
          background: #050505;
          border: 1px solid #1a1a1a;
          padding: 30px;
          position: relative;
          transition: 0.3s ease;
        }

        .log-card:hover {
          border-color: #333;
        }

        .log-meta {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .log-title {
          font-family: 'Cinzel', serif;
          font-size: 1.2rem;
          font-weight: 400;
          color: var(--paper, #f4f0eb);
          margin: 0 0 15px 0;
          letter-spacing: 1px;
        }

        .log-content {
          color: var(--paper-dim, #d0c8be);
          font-size: 0.95rem;
          line-height: 1.7;
          margin: 0;
          font-weight: 300;
        }

        .log-id {
          position: absolute;
          top: 30px;
          right: 30px;
          font-family: 'Inter', monospace;
          font-size: 0.65rem;
          color: #333;
        }

        /* Future Projects Section */
        .future-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .future-card {
          background: #080808;
          border: 1px dashed #333;
          padding: 30px;
          transition: 0.3s ease;
        }

        .future-card:hover {
          border-style: solid;
          border-color: var(--ember, #c5a059);
        }

        .future-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .status-label {
          font-family: 'Inter', monospace;
          font-size: 0.7rem;
          color: #777;
          letter-spacing: 1px;
          border: 1px solid #333;
          padding: 4px 10px;
        }

        .future-title {
          font-family: 'Cinzel', serif;
          font-size: 1.3rem;
          font-weight: 400;
          color: var(--paper, #f4f0eb);
          margin: 0 0 15px 0;
          letter-spacing: 1px;
        }

        .future-desc {
          color: var(--paper-dim, #d0c8be);
          font-size: 0.95rem;
          line-height: 1.7;
          margin: 0;
          font-weight: 300;
        }

        /* Mobile */
        @media (max-width: 900px) {
          .grid-2-col { grid-template-columns: 1fr; gap: 80px; }
          .progress-card { padding: 30px 20px; }
          .chapter-name { font-size: 1.6rem; }
          .log-id { display: none; }
        }
      `}</style>
    </div>
  );
}