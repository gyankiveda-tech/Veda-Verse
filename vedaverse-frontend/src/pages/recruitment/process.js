import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('../../components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../../components/Footer'), { ssr: false });

export default function RecruitmentProcess() {
  
  // Feature 17: Recruitment Process Timeline Data from Global Hiring Framework
  const processSteps = [
    {
      id: "01",
      title: "APPLICATION SUBMISSION",
      tag: "DISCOVERY",
      desc: "Formal submission of your portfolio, CV, and cover letter through our portal. You will receive an automated confirmation email within 24 hours.",
      timeline: "Immediate"
    },
    {
      id: "02",
      title: "PORTFOLIO REVIEW",
      tag: "EVALUATION",
      desc: "A deep dive into your portfolio using our Portfolio Evaluation Scorecard. We focus on foundational understanding, consistency, and narrative quality rather than flashy rendering.",
      timeline: "1 - 2 Weeks"
    },
    {
      id: "03",
      title: "ARTIST SKILL TEST",
      tag: "ASSESSMENT",
      desc: "A paid, time-bound test relevant to the role. Evaluates your ability to take direction, meet studio file standards, and deliver quality under a strict deadline.",
      timeline: "1 Week"
    },
    {
      id: "04",
      title: "THE INTERVIEW",
      tag: "CULTURE FIT",
      desc: "Conducted by the Studio Director and relevant Lead Artist. We utilize our Interview Question Bank to assess cultural fit, communication, ego management, and long-term aspirations.",
      timeline: "Post-Test"
    },
    {
      id: "05",
      title: "TRIAL COLLABORATION",
      tag: "SENIOR ROLES ONLY",
      desc: "For senior and leadership roles, a short-term, paid trial project may be initiated to observe your working dynamics and adaptability within our actual production pipeline.",
      timeline: "2 - 4 Weeks"
    },
    {
      id: "06",
      title: "OFFER & ONBOARDING",
      tag: "CONFIRMATION",
      desc: "Formal offer extended. Once accepted, you will be integrated into the studio systems, software, and culture, beginning your journey with the File Standards Manual and Production Guidelines.",
      timeline: "Final Stage"
    }
  ];

  return (
    <div className="recruitment-root no-select">
      <Head>
        <title>Recruitment Process | Vedaverse Studio</title>
        <meta name="description" content="Understand the complete candidate journey and recruitment pipeline at Vedaverse Studio." />
      </Head>

      <Navbar />

      {/* Sticky Sub-Navigation */}
      <div className="sticky-subnav">
        <ul className="subnav-links">
          <li><Link href="/recruitment">Studio</Link></li>
          <li><Link href="/recruitment#culture">Culture</Link></li>
          <li><Link href="/recruitment/positions">Positions</Link></li>
          <li><Link href="/recruitment/process" className="active">Process</Link></li>
          <li><Link href="/recruitment/apply">Apply</Link></li>
        </ul>
      </div>

      <main className="process-main">
        <div className="container">
          
          {/* Header Section */}
          <header className="page-header">
            <h4 className="utility-tag">CANDIDATE JOURNEY</h4>
            <h1 className="cinzel-title">THE <span className="gold">PIPELINE</span></h1>
            <div className="ember-line-center"></div>
            <p className="lead-text">
              Transparency is our baseline. You should never have to guess where you are in the process, what the next step is, or what criteria are being used to evaluate you.
            </p>
          </header>

          {/* Timeline Section */}
          <div className="process-timeline">
            <div className="timeline-center-line"></div>

            {processSteps.map((step, index) => (
              <div key={index} className="timeline-step">
                {/* Visual Connector */}
                <div className="step-connector">
                  <div className="step-dot"></div>
                </div>

                {/* Content */}
                <div className="step-content">
                  <div className="step-header">
                    <span className="step-number">{step.id}</span>
                    <span className="utility-tag">{step.tag}</span>
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <div className="ember-line"></div>
                  <p className="step-desc">{step.desc}</p>
                  
                  <div className="step-footer">
                    <span className="timeline-meta">EXPECTED TIMELINE: <strong>{step.timeline}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="action-footer text-center">
            <p className="lead-text" style={{marginBottom: '30px'}}>
              Ready to begin? Review our evaluation standards or start your application.
            </p>
            <div className="cta-group">
              <Link href="/recruitment/apply" className="primary-cta">SUBMIT APPLICATION</Link>
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
          display: flex;
          flex-direction: column;
          align-items: center;
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
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 400;
          letter-spacing: 2px;
          margin: 15px 0 0 0;
        }

        .gold { color: var(--ember, #c5a059); }

        .ember-line-center {
          width: 50px; height: 1px; background: var(--ember, #c5a059); margin: 25px auto;
        }
        
        .ember-line {
          width: 40px; height: 1px; background: var(--ember, #c5a059); margin: 20px 0;
        }

        .lead-text {
          font-size: 1.1rem;
          color: var(--paper-dim, #d0c8be);
          max-width: 700px;
          line-height: 1.8;
          font-weight: 300;
        }

        /* Process Timeline */
        .process-timeline {
          position: relative;
          padding: 20px 0;
          margin-bottom: 80px;
        }

        .timeline-center-line {
          position: absolute;
          left: 40px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(244, 240, 235, 0.1);
        }

        .timeline-step {
          position: relative;
          padding-left: 100px;
          margin-bottom: 60px;
          opacity: 0.9;
          transition: 0.4s ease;
        }

        .timeline-step:hover {
          opacity: 1;
          transform: translateX(5px);
        }

        .timeline-step:last-child {
          margin-bottom: 0;
        }

        .step-connector {
          position: absolute;
          left: 35px;
          top: 0;
          height: 100%;
        }

        .step-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: var(--ink, #030303);
          border: 1px solid var(--ember, #c5a059);
          margin-top: 35px;
          position: relative;
          z-index: 2;
          box-shadow: 0 0 10px rgba(197, 160, 89, 0.2);
          transition: 0.4s ease;
        }

        .timeline-step:hover .step-dot {
          background: var(--ember, #c5a059);
          box-shadow: 0 0 15px rgba(197, 160, 89, 0.5);
        }

        .step-content {
          background: #080808;
          border: 1px solid #1a1a1a;
          padding: 40px;
          border-radius: 2px;
          transition: 0.3s ease;
        }

        .timeline-step:hover .step-content {
          border-color: rgba(197, 160, 89, 0.3);
        }

        .step-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .step-number {
          font-family: 'Cinzel', serif;
          font-size: 2.5rem;
          color: rgba(197, 160, 89, 0.15);
          line-height: 1;
          font-weight: 400;
        }

        .step-title {
          font-family: 'Cinzel', serif;
          font-size: 1.5rem;
          color: var(--paper, #f4f0eb);
          margin: 0;
          font-weight: 400;
          letter-spacing: 1px;
        }

        .step-desc {
          color: var(--paper-dim, #d0c8be);
          font-size: 1.05rem;
          line-height: 1.7;
          margin: 0 0 25px 0;
        }

        .step-footer {
          padding-top: 20px;
          border-top: 1px solid #1a1a1a;
        }

        .timeline-meta {
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          color: #777;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .timeline-meta strong {
          color: var(--paper, #f4f0eb);
          font-weight: 600;
          margin-left: 5px;
        }

        /* Action Footer */
        .text-center { text-align: center; }

        .cta-group {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }

        .primary-cta {
          display: inline-block;
          background: var(--paper, #f4f0eb);
          color: var(--ink, #030303);
          padding: 16px 40px;
          border-radius: 2px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 2px;
          transition: 0.3s ease;
        }

        .primary-cta:hover {
          background: var(--ember, #c5a059);
        }

        @media (max-width: 768px) {
          .sticky-subnav {
            overflow-x: auto;
            justify-content: flex-start;
            padding: 15px 20px;
          }
          .subnav-links { gap: 20px; }
          .timeline-center-line { left: 20px; }
          .step-connector { left: 15px; }
          .timeline-step { padding-left: 50px; }
          .step-content { padding: 30px 20px; }
          .step-number { font-size: 2rem; }
          .step-title { font-size: 1.3rem; }
        }
      `}</style>
    </div>
  );
}