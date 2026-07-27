import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('../../components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../../components/Footer'), { ssr: false });

export default function RecruitmentLanding() {
  return (
    <div className="recruitment-root no-select">
      <Head>
        <title>Careers | Vedaverse Studio</title>
        <meta name="description" content="Create worlds with us. Vedaverse Studio is building the next generation of manga and anime." />
      </Head>

      <Navbar />

      {/* Sticky Sub-Navigation */}
      <div className="sticky-subnav">
        <ul className="subnav-links">
          <li><Link href="/recruitment" className="active">Studio</Link></li>
          <li><Link href="/recruitment#culture">Culture</Link></li>
          <li><Link href="/recruitment/positions">Positions</Link></li>
          <li><Link href="/recruitment/process">Process</Link></li>
          <li><Link href="/recruitment/apply">Apply</Link></li>
        </ul>
      </div>

      <main className="recruitment-main">
        
        {/* Feature 14: Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="primary-headline">Create worlds with us.</h1>
            <h2 className="secondary-headline">
              Vedaverse Studio is building the next generation of manga and anime — and we are looking for the artists who will build it with us.
            </h2>
            <p className="supporting-text">
              We are an independent creative studio based in India. We seek craftsmen and visionaries who value original IP, rigorous discipline, and storytelling above all.
            </p>
            <div className="cta-group">
              <Link href="/recruitment/positions" className="primary-cta">VIEW OPEN POSITIONS</Link>
              <a href="#intro" className="secondary-cta">LEARN ABOUT THE STUDIO</a>
            </div>
          </div>
        </section>

        {/* Feature 14: Studio Introduction */}
        <section id="intro" className="content-section intro-section">
          <div className="container">
            <h3 className="mission-statement">
              Vedaverse Studio creates original manga and anime that honour the craft of sequential art and the emotional power of animation — stories made by artists who care, for audiences who feel.
            </h3>
            
            <div className="ember-line-center"></div>

            <div className="text-grid">
              <div>
                <h4 className="utility-heading">CREATIVE PHILOSOPHY</h4>
                <p>
                  We are building stories capable of outlasting the trends of the moment. We believe that restraint is a form of confidence, not a lack of ideas. Our approach prioritises the emotional core over hollow spectacle, treating originality as a discipline of subtraction.
                </p>
              </div>
              <div>
                <h4 className="utility-heading">LONG-TERM GOALS</h4>
                <ul className="goal-list">
                  <li><strong>Original IP Development:</strong> A sustained output of major titles.</li>
                  <li><strong>Transmedia Storytelling:</strong> Expanding from manga into anime seamlessly.</li>
                  <li><strong>Talent Incubation:</strong> Nurturing emerging artists to lead roles.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 14: Studio Culture & Values */}
        <section id="culture" className="content-section culture-section">
          <div className="container">
            <div className="section-header">
              <h2 className="cinzel-title">STUDIO <span className="gold">CULTURE</span></h2>
              <div className="ember-line"></div>
              <p className="lead-text">
                Culture is not a list of perks. It is the lived reality of how people treat each other, how decisions are made, and how work gets done.
              </p>
            </div>

            <div className="culture-grid">
              <div className="culture-card">
                <h4 className="card-title">CREATIVE DISCIPLINE</h4>
                <p>Discipline means meeting deadlines, adhering to pipelines, and respecting schedule dependencies. The operational machinery exists to serve the art, and the art is best served when the machinery runs reliably.</p>
              </div>
              
              <div className="culture-card">
                <h4 className="card-title">RESPECT & OWNERSHIP</h4>
                <p>Every person is expected to take ownership of their work. Artists respect each other's time by being punctual, and respect each other's craft by giving feedback that is specific, constructive, and free of ego.</p>
              </div>

              <div className="culture-card">
                <h4 className="card-title">CONTINUOUS LEARNING</h4>
                <p>Continuous learning is a requirement. Stagnation is the enemy of excellence. We support growth through dedicated learning time, reference libraries, and a mentorship structure that pairs junior artists with senior leads.</p>
              </div>

              <div className="culture-card">
                <h4 className="card-title">CONSTRUCTIVE FEEDBACK</h4>
                <p>Feedback focuses on the work, not the worker. It is delivered in the spirit of elevation, not demolition. The studio rejects the trope of the abusive creative genius; kindness and excellence are not in conflict.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <style jsx>{`
        .recruitment-root {
          background-color: var(--ink, #030303);
          color: var(--paper, #f4f0eb);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        /* Sticky Sub-Nav */
        .sticky-subnav {
          position: sticky;
          top: 70px; /* Adjust based on main Navbar height */
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

        /* Hero Section */
        .hero-section {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 20px;
          background: radial-gradient(circle at center, var(--indigo, #0a0f1a) 0%, var(--ink, #030303) 100%);
        }

        .hero-content {
          max-width: 800px;
          animation: fadeIn 1.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .primary-headline {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 600;
          color: #lalala;
          margin: 0 0 8px 0;
        }

        .secondary-headline {
          font-family: 'Cinzel', serif;
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          font-style: italic;
          color: var(--ember, #c5a059);
          margin: 0 0 20px 0;
          font-weight: 400;
        }

        .supporting-text {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--paper-dim, #d0c8be);
          max-width: 600px;
          margin: 0 auto 40px auto;
        }

        .cta-group {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .primary-cta {
          background: var(--paper, #f4f0eb);
          color: var(--ink, #030303);
          padding: 14px 32px;
          border-radius: 2px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 1px;
          transition: 0.3s ease;
        }

        .primary-cta:hover {
          background: var(--ember, #c5a059);
        }

        .secondary-cta {
          background: transparent;
          color: var(--paper, #f4f0eb);
          border: 1px solid var(--paper, #f4f0eb);
          padding: 14px 32px;
          border-radius: 2px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 1px;
          transition: 0.3s ease;
        }

        .secondary-cta:hover {
          border-color: var(--ember, #c5a059);
          color: var(--ember, #c5a059);
        }

        /* Content Sections */
        .content-section {
          padding: 100px 0;
          border-bottom: 1px solid var(--border-subtle, rgba(244,240,235,0.08));
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mission-statement {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 400;
          text-align: center;
          line-height: 1.6;
          color: var(--paper, #f4f0eb);
          margin-bottom: 50px;
        }

        .ember-line-center {
          width: 50px; height: 1px; background: var(--ember, #c5a059); margin: 0 auto 60px auto;
        }

        .ember-line {
          width: 40px; height: 1px; background: var(--ember, #c5a059); margin: 20px 0 30px 0;
        }

        .text-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .utility-heading {
          font-family: 'Inter', monospace;
          font-size: 0.8rem;
          letter-spacing: 2px;
          color: var(--ember, #c5a059);
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .text-grid p, .goal-list li {
          color: var(--paper-dim, #d0c8be);
          line-height: 1.8;
          font-size: 1rem;
        }

        .goal-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .goal-list li {
          margin-bottom: 15px;
          position: relative;
          padding-left: 20px;
        }

        .goal-list li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--ember, #c5a059);
        }

        .goal-list strong {
          color: var(--paper, #f4f0eb);
          font-weight: 400;
        }

        /* Culture Section */
        .culture-section {
          background: #050505;
        }

        .cinzel-title {
          font-family: 'Cinzel', serif;
          font-size: 2.5rem;
          font-weight: 400;
          letter-spacing: 2px;
          margin: 0;
        }

        .gold { color: var(--ember, #c5a059); }

        .lead-text {
          font-size: 1.2rem;
          color: var(--paper-dim, #d0c8be);
          max-width: 700px;
          line-height: 1.7;
          margin-bottom: 60px;
          font-weight: 300;
        }

        .culture-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }

        .culture-card {
          background: #0a0a0a;
          border: 1px solid #111;
          padding: 40px;
          transition: 0.3s ease;
        }

        .culture-card:hover {
          border-color: var(--ember, #c5a059);
          transform: translateY(-5px);
        }

        .card-title {
          font-family: 'Cinzel', serif;
          font-size: 1.2rem;
          color: var(--paper, #f4f0eb);
          margin: 0 0 15px 0;
          letter-spacing: 1px;
        }

        .culture-card p {
          color: var(--paper-dim, #d0c8be);
          font-size: 0.95rem;
          line-height: 1.7;
          margin: 0;
        }

        @media (max-width: 768px) {
          .sticky-subnav {
            overflow-x: auto;
            justify-content: flex-start;
            padding: 15px 20px;
          }
          .subnav-links { gap: 20px; }
          .text-grid { grid-template-columns: 1fr; gap: 40px; }
          .cta-group { flex-direction: column; width: 100%; }
          .primary-cta, .secondary-cta { width: 100%; text-align: center; }
          .culture-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}