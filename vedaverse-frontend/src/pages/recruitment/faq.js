import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Navbar = dynamic(() => import('../../components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../../components/Footer'), { ssr: false });

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Feature 20: FAQ Data from Vedaverse Internal Documents
  const faqs = [
    {
      question: "What is Vedaverse Studio's policy on remote work?",
      answer: "We operate a global talent strategy. While core leadership and pre-production roles often require on-site or hybrid collaboration, many production roles are remote-friendly. We require overlap during our 'Core Synchronous Hours' (a 4-hour window) for real-time communication and reviews, respecting time zone differences."
    },
    {
      question: "What is your stance on AI-generated artwork?",
      answer: "Vedaverse Studio respects human authorship. AI tools may be used for ideation or reference, but this must be explicitly disclosed. Unedited AI generation is not a recognized deliverable. Submitting undisclosed AI-generated work as original manual craft results in immediate disqualification."
    },
    {
      question: "How long does the recruitment process take?",
      answer: "You will receive an automated confirmation within 24 hours of your submission. The portfolio review stage typically requires 1-2 weeks. If you advance, the entire process, including the artist skill test and interviews, spans 3-6 weeks depending on the seniority of the role."
    },
    {
      question: "Can I reapply if my application is rejected?",
      answer: "Yes. If your application is rejected, your portfolio details are archived. We encourage artists to reapply after 12 months if significant growth or a shift in stylistic alignment is evident in their portfolio."
    },
    {
      question: "Do you offer internships or trainee programs?",
      answer: "Yes. We are establishing formal partnerships with global art schools and developing the 'Vedaverse Scholarship' alongside a structured internship pipeline. Entry-level trainees focus on foundational tasks and skill development. Please check the Open Positions page for active internship listings."
    },
    {
      question: "How do you handle confidentiality during the hiring process?",
      answer: "The art test and interview stages involve unreleased original IP. All candidates advancing to these stages must sign a Non-Disclosure Agreement (NDA). Confidentiality is a professional threshold; any violation during the hiring process results in immediate disqualification."
    }
  ];

  return (
    <div className="recruitment-root no-select">
      <Head>
        <title>Recruitment FAQ | Vedaverse Studio</title>
        <meta name="description" content="Frequently asked questions about the Vedaverse Studio recruitment process, AI policy, and studio culture." />
      </Head>

      <Navbar />

      {/* Sticky Sub-Navigation */}
      <div className="sticky-subnav">
        <ul className="subnav-links">
          <li><Link href="/recruitment">Studio</Link></li>
          <li><Link href="/recruitment#culture">Culture</Link></li>
          <li><Link href="/recruitment/positions">Positions</Link></li>
          <li><Link href="/recruitment/process">Process</Link></li>
          <li><Link href="/recruitment/faq" className="active">FAQ</Link></li>
          <li><Link href="/recruitment/apply">Apply</Link></li>
        </ul>
      </div>

      <main className="faq-main">
        <div className="container">
          
          <header className="page-header">
            <h4 className="utility-tag">CANDIDATE INQUIRIES</h4>
            <h1 className="cinzel-title">FREQUENTLY ASKED <span className="gold">QUESTIONS</span></h1>
            <div className="ember-line-center"></div>
            <p className="lead-text">
              Clarity is an operational requirement. Review our policies on remote collaboration, artificial intelligence, and the evaluation timeline before submitting your application.
            </p>
          </header>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openIndex === index ? 'open' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <h3 className="question-text">{faq.question}</h3>
                  <span className="toggle-icon">{openIndex === index ? '−' : '+'}</span>
                </div>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="action-footer text-center">
            <p className="lead-text" style={{marginBottom: '30px', marginTop: '60px'}}>
              If your question is not addressed above, you may contact our recruitment desk.
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
          max-width: 850px;
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
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
          margin: 0;
          padding: 0 20px;
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
          font-size: clamp(2.2rem, 5vw, 3.5rem);
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
        }

        /* FAQ Accordion */
        .faq-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .faq-item {
          background: #080808;
          border: 1px solid #1a1a1a;
          border-radius: 2px;
          cursor: pointer;
          transition: 0.3s ease;
          overflow: hidden;
        }

        .faq-item:hover {
          border-color: rgba(197, 160, 89, 0.4);
        }

        .faq-item.open {
          border-color: var(--ember, #c5a059);
        }

        .faq-question {
          padding: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .question-text {
          font-family: 'Cinzel', serif;
          font-size: 1.25rem;
          font-weight: 400;
          color: var(--paper, #f4f0eb);
          margin: 0;
          letter-spacing: 1px;
        }

        .faq-item.open .question-text {
          color: var(--ember, #c5a059);
        }

        .toggle-icon {
          font-family: 'Inter', monospace;
          font-size: 1.5rem;
          color: var(--ember, #c5a059);
          transition: transform 0.3s ease;
        }

        .faq-answer-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s ease;
        }

        .faq-item.open .faq-answer-wrapper {
          grid-template-rows: 1fr;
        }

        .faq-answer {
          overflow: hidden;
        }

        .faq-answer p {
          padding: 0 30px 30px 30px;
          margin: 0;
          color: var(--paper-dim, #d0c8be);
          font-size: 1.05rem;
          line-height: 1.8;
          font-weight: 300;
        }

        /* Action Footer */
        .text-center { text-align: center; }

        .cta-group {
          display: flex;
          justify-content: center;
          gap: 20px;
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
          .faq-question { padding: 20px; }
          .faq-answer p { padding: 0 20px 20px 20px; }
          .question-text { font-size: 1.1rem; }
        }
      `}</style>
    </div>
  );
}