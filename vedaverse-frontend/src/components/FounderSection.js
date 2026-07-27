import React from 'react';

export default function FounderSection() {
  return (
    <section className="founder-section">
      <div className="section-content">
        
        {/* Header Area */}
        <div className="header-wrapper">
          <h2 className="sec-title">THE <span className="gold">ARCHITECT</span></h2>
          <div className="accent-line"></div>
        </div>

        {/* Editorial Layout Grid */}
        <div className="founder-grid">
          
          {/* Left Column: Image & Titles */}
          <div className="image-column">
            <div className="image-frame">
              <img src="/images/gyan.jpg" alt="Gyan Vardhan - Founder" className="founder-img" />
              <div className="frame-corner top-left"></div>
              <div className="frame-corner bottom-right"></div>
            </div>
            <div className="founder-titles">
              <h3 className="founder-name">GYAN VARDHAN</h3>
              <p className="founder-role">Founder, CEO & Creative Director</p>
              <div className="origin-tag">EST. JAMSHEDPUR, INDIA</div>
            </div>
          </div>

          {/* Right Column: The Letter */}
          <div className="text-column">
            <span className="quote-mark">“</span>
            
            <p className="founder-journey">
              In late 2025, I began making comics with the help of artificial intelligence. There was no studio behind it, no team, and no prior experience writing code. I built the first website myself, learning as I went, and published the early parts of a story before a single reader existed for it. I imagined an audience before I had one.
            </p>
            
            <p className="founder-journey">
              For a while, that was enough.
            </p>
            
            <p className="founder-journey">
              In time, I understood that what I was making would not last. AI-generated comics were fast to produce and easy to publish, but they were not built to be remembered — and if years of my life were going into this, memory mattered more than speed.
            </p>
            
            <p className="founder-journey highlight">
              I did not stop. I started over.
            </p>
            
            <p className="founder-journey">
              What followed was months of rebuilding: the story, the world, and the standard I was willing to hold myself to. Out of that came the idea for India's first supernatural cyberpunk manga, and with it, a longer intention — an original universe built with anime in mind from the beginning, not added later as an afterthought.
            </p>
            
            <p className="founder-journey">
              Vedaverse Studio exists because of that decision.
            </p>

            <div className="signature-area">
              <div className="sig-line"></div>
              <span className="sig-text">G.V.</span>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .founder-section {
          padding: 120px 20px;
          background-color: #030303; /* Primary - Ink */
          display: flex;
          justify-content: center;
          border-bottom: 1px solid rgba(244, 240, 235, 0.05); /* Subtle Paper line */
          font-family: 'Inter', sans-serif;
        }

        .section-content {
          max-width: 1100px;
          width: 100%;
        }

        .header-wrapper {
          margin-bottom: 60px;
        }

        .sec-title {
          font-size: 2.2rem;
          font-weight: 400;
          letter-spacing: 2px;
          margin: 0 0 15px 0;
          font-family: 'Cinzel', serif; /* Editorial Serif */
          color: #f4f0eb; /* Paper White */
        }

        .gold { color: #c5a059; } /* Accent - Ember */
        .accent-line { width: 40px; height: 1px; background: #c5a059; }

        /* Grid Layout */
        .founder-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 80px;
          align-items: start;
        }

        /* Image Column Styling */
        .image-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4/5;
          padding: 10px;
          border: 1px solid rgba(197, 160, 89, 0.2);
          margin-bottom: 30px;
        }

        .founder-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(1.15) brightness(0.9);
          transition: filter 0.6s ease;
        }

        .image-frame:hover .founder-img {
          filter: grayscale(20%) contrast(1.1) brightness(1);
        }

        /* Minimalistic Frame Corners */
        .frame-corner {
          position: absolute;
          width: 15px;
          height: 15px;
          border-color: #c5a059;
          border-style: solid;
        }
        .top-left { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
        .bottom-right { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }

        .founder-titles {
          text-align: left;
        }

        .founder-name {
          font-size: 1.8rem;
          margin: 0 0 5px 0;
          font-family: 'Cinzel', serif;
          font-weight: 400;
          color: #f4f0eb;
          letter-spacing: 1px;
        }

        .founder-role {
          color: #c5a059;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 0.8rem;
          margin: 0 0 15px 0;
        }

        .origin-tag {
          font-family: 'Inter', monospace;
          font-size: 0.65rem;
          color: #777;
          letter-spacing: 2px;
        }

        /* Text Column Styling */
        .text-column {
          position: relative;
          padding-top: 10px;
        }

        .quote-mark {
          position: absolute;
          top: -30px;
          left: -40px;
          font-family: 'Cinzel', serif;
          font-size: 6rem;
          color: rgba(197, 160, 89, 0.15);
          line-height: 1;
          pointer-events: none;
        }

        .founder-journey {
          color: #d0c8be; /* Dimmed Paper */
          font-size: 1.05rem;
          line-height: 1.9;
          font-weight: 300;
          margin-bottom: 25px;
        }

        .highlight {
          color: #f4f0eb;
          font-weight: 400;
          font-size: 1.15rem;
          border-left: 2px solid #c5a059;
          padding-left: 15px;
          margin: 35px 0;
          font-style: italic;
        }

        .signature-area {
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }

        .sig-line {
          width: 30px;
          height: 1px;
          background: #555;
        }

        .sig-text {
          font-family: 'Cinzel', serif;
          color: #c5a059;
          letter-spacing: 3px;
          font-size: 1.2rem;
        }

        /* Responsive Design */
        @media (max-width: 900px) {
          .founder-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          
          .image-column {
            max-width: 350px;
            margin: 0 auto;
            align-items: center;
            text-align: center;
          }
          
          .founder-titles {
            text-align: center;
          }

          .quote-mark {
            left: -10px;
            top: -20px;
            font-size: 5rem;
          }
        }
      `}</style>
    </section>
  );
}