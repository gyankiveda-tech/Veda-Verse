import React from 'react';

export default function StudioTimeline() {
  return (
    <section className="timeline-section">
      <div className="section-content">
        
        {/* Header Area */}
        <div className="header-wrapper">
          <h2 className="sec-title">STUDIO <span className="gold">ROADMAP</span></h2>
          <div className="accent-line"></div>
          <p className="sec-desc">
            A long-term strategic architecture for creative expansion. We are building a sustainable, world-class organization that prioritizes creative excellence and scalability across decades.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="timeline-wrapper">
          <div className="timeline-center-line"></div>

          {/* Phase 1 - Completed */}
          <div className="timeline-item completed">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="phase-label">PHASE 01 : ACTIVE</span>
              <h3 className="milestone-title">THE FOUNDATION & CORE DENSITY</h3>
              <p className="milestone-desc">
                Establishing the studio constitution, operational documentation, and core narrative framework. Solidifying the primary studio hub and recruiting robust leadership and production management.
              </p>
            </div>
          </div>

          {/* Phase 2 - Active/Blinking */}
          <div className="timeline-item active">
            <div className="timeline-dot blink"></div>
            <div className="timeline-content">
              <span className="phase-label">PHASE 02 : IN PROGRESS</span>
              <h3 className="milestone-title">CONCEPT REVELATION & RECRUITMENT</h3>
              <p className="milestone-desc">
                Unveiling the official visual identity and concept teasers. Initiating the global hiring framework to assemble top-tier animators, storyboard artists, and compositors for pre-production.
              </p>
            </div>
          </div>

          {/* Phase 3 - Future */}
          <div className="timeline-item future">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="phase-label">PHASE 03 : FUTURE VISION</span>
              <h3 className="milestone-title">REGIONAL GROWTH & ACADEMIES</h3>
              <p className="milestone-desc">
                Initiating formal partnerships with premier global art schools and establishing the "Vedaverse Scholarship" to nurture emerging talent and create a structured internship pipeline.
              </p>
            </div>
          </div>

          {/* Phase 4 - Future Expansion */}
          <div className="timeline-item future">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="phase-label">PHASE 04 : THE PINNACLE</span>
              <h3 className="milestone-title">TRANSMEDIA & GLOBAL SATELLITES</h3>
              <p className="milestone-desc">
                Expanding the pipeline into full anime production and interactive games. Establishing international satellite teams that operate under central creative direction while enriching the studio's cultural spectrum.
              </p>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .timeline-section {
          padding: 100px 20px;
          background-color: #030303; /* Primary - Ink */
          display: flex;
          justify-content: center;
          font-family: 'Inter', sans-serif;
        }

        .section-content {
          max-width: 900px;
          width: 100%;
        }

        .header-wrapper {
          text-align: center;
          margin-bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .sec-title {
          font-size: 2.5rem;
          font-weight: 400;
          letter-spacing: 3px;
          margin: 0 0 15px 0;
          font-family: 'Cinzel', serif; /* Editorial Serif */
          color: #f4f0eb; /* Paper White */
        }

        .gold { color: #c5a059; } /* Accent - Ember */
        .accent-line { width: 50px; height: 1px; background: #c5a059; margin-bottom: 25px; }

        .sec-desc {
          color: #a09a90;
          font-size: 1.1rem;
          line-height: 1.8;
          max-width: 700px;
          font-weight: 300;
        }

        /* Timeline Structural Layout */
        .timeline-wrapper {
          position: relative;
          padding: 20px 0;
        }

        .timeline-center-line {
          position: absolute;
          left: 20px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(244, 240, 235, 0.1);
        }

        .timeline-item {
          position: relative;
          padding-left: 60px;
          margin-bottom: 60px;
        }

        .timeline-item:last-child {
          margin-bottom: 0;
        }

        /* The Dots */
        .timeline-dot {
          position: absolute;
          left: 16px;
          top: 5px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #111;
          border: 1px solid #333;
          z-index: 2;
        }

        .completed .timeline-dot {
          background: #c5a059;
          border-color: #c5a059;
          box-shadow: 0 0 15px rgba(197, 160, 89, 0.3);
        }

        .active .timeline-dot {
          background: #f4f0eb;
          border-color: #f4f0eb;
        }

        /* Blink Effect for Active Phase */
        .blink {
          animation: pulse-dot 2s infinite ease-in-out;
        }

        @keyframes pulse-dot {
          0% { box-shadow: 0 0 0 0 rgba(244, 240, 235, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(244, 240, 235, 0); }
          100% { box-shadow: 0 0 0 0 rgba(244, 240, 235, 0); }
        }

        /* Content Styling */
        .timeline-content {
          background: #0a0a0a;
          border: 1px solid #111;
          padding: 35px 30px;
          transition: all 0.4s ease;
        }

        .timeline-content:hover {
          border-color: rgba(197, 160, 89, 0.3); /* Ember hover */
          transform: translateX(5px);
        }

        .phase-label {
          display: inline-block;
          font-family: 'Inter', monospace;
          color: #c5a059;
          font-size: 0.7rem;
          letter-spacing: 3px;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .milestone-title {
          font-family: 'Cinzel', serif;
          font-size: 1.4rem;
          color: #f4f0eb;
          margin: 0 0 15px 0;
          font-weight: 400;
          letter-spacing: 1px;
        }

        .milestone-desc {
          color: #a09a90;
          font-size: 0.95rem;
          line-height: 1.7;
          font-weight: 300;
          margin: 0;
        }

        /* Future items styling to look 'upcoming' */
        .future .timeline-content {
          border-color: rgba(244, 240, 235, 0.03);
          background: rgba(10, 10, 10, 0.5);
        }
        .future .milestone-title { color: #888; }
        .future .milestone-desc { color: #666; }
        .future .phase-label { color: #555; }

        .future .timeline-content:hover {
          border-color: #222;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .timeline-section { padding: 60px 15px; }
          .timeline-center-line { left: 15px; }
          .timeline-dot { left: 11px; }
          .timeline-item { padding-left: 45px; }
          .sec-title { font-size: 2rem; }
          .timeline-content { padding: 25px 20px; }
          .milestone-title { font-size: 1.2rem; }
        }
      `}</style>
    </section>
  );
}