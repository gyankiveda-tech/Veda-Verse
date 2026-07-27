import Link from 'next/link';
import { useRouter } from 'next/router';

// The Founding Team Array
const team = [
  {
    name: "Gyan Vardhan",
    role: "Creator & Supreme Architect",
    desc: "The visionary behind the Vedaverse digital gateway and the narrative architecture of Gyan Ki Veda.",
    image: "/images/gyan.jpg" 
  },
  {
    name: "Rohan Pradhan",
    role: "Core Creative Partner",
    desc: "Driving the operational and narrative expansion of the studio's foundational lore.",
    image: "/images/rohan.jpg" 
  },
  
];

export default function Footer() {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <footer className="footer-root no-select">
      
      {/* CREATORS HALL - Only visible on Home Page */}
      {isHomePage && (
        <div className="creators-hall-wrapper">
          <div className="hall-header">
            <h4 className="utility-tag">THE ARCHITECTS</h4>
            <h2 className="hall-title">THE CREATOR'S <span className="gold">HALL</span></h2>
            <div className="ember-line-center"></div>
            <p className="hall-subtitle">The founding minds behind the Vedaverse Studio Legacy.</p>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="creator-card">
                <div className="image-container">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="member-photo"
                    onError={(e) => { 
                      e.target.style.opacity = '0'; 
                      e.target.nextElementSibling.style.opacity = '1';
                    }} 
                  />
                  <div className="photo-placeholder">
                    <span className="placeholder-text">IMAGE_REDACTED</span>
                  </div>
                  <div className="scanline-effect"></div>
                </div>
                <h3 className="member-name">{member.name}</h3>
                <h4 className="member-role">{member.role}</h4>
                <div className="ember-line-small"></div>
                <p className="member-desc">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MEGA FOOTER - Navigation & Links */}
      <div className="mega-footer">
        <div className="footer-grid">
          
          {/* Brand Column */}
          <div className="footer-brand">
            <h2 className="brand-title">VEDAVERSE</h2>
            <p className="brand-desc">
              India's First Supernatural Cyberpunk Manga Studio. We are building a universe from ground zero, prioritizing the craft of storytelling over everything else.
            </p>
            <div className="social-links">
              <a href="https://youtube.com/@vedaverse-gyan" target="_blank" rel="noopener noreferrer">YOUTUBE</a>
              <span className="separator">•</span>
              <a href="https://www.instagram.com/vedaverse.gyan/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            </div>
          </div>

          {/* Studio Column */}
          <div className="footer-column">
            <h4 className="column-title">THE STUDIO</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/studios">About Us</Link></li>
              <li><Link href="/recruitment">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Universe Column */}
          <div className="footer-column">
            <h4 className="column-title">THE UNIVERSE</h4>
            <ul className="footer-links">
              <li><Link href="/chronos">Chronos Archive</Link></li>
              <li><Link href="/production">Production Desk</Link></li>
              <li><Link href="/status">Dev Tracker</Link></li>
              <li><Link href="/community">Community Hub</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="footer-column">
            <h4 className="column-title">LEGAL</h4>
            <ul className="footer-links">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/refund">Refund Policy</Link></li>
              <li><Link href="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} VEDAVERSE STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="system-status">
            <span className="dot pulse"></span> SYSTEM SECURE
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-root {
          background-color: var(--ink, #030303);
          border-top: 1px solid rgba(244, 240, 235, 0.05);
          position: relative;
          z-index: 10;
          font-family: 'Inter', sans-serif;
        }

        .gold { color: var(--ember, #c5a059); }

        /* CREATORS HALL SECTION */
        .creators-hall-wrapper {
          padding: 100px 5% 50px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hall-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .utility-tag {
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          letter-spacing: 4px;
          color: var(--ember, #c5a059);
        }

        .hall-title {
          font-family: 'Cinzel', serif;
          color: var(--paper, #f4f0eb);
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 400;
          letter-spacing: 2px;
          margin: 15px 0 0 0;
        }

        .ember-line-center {
          width: 60px; height: 1px; background: var(--ember, #c5a059); margin: 25px auto;
        }

        .hall-subtitle {
          color: var(--paper-dim, #d0c8be);
          font-size: 1rem;
          font-weight: 300;
          letter-spacing: 1px;
        }

        .team-grid {
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
          gap: 40px;
        }

        .creator-card {
          text-align: center;
          padding: 40px 30px;
          background: #050505;
          border: 1px solid #1a1a1a;
          transition: 0.4s ease;
        }

        .creator-card:hover {
          border-color: var(--ember, #c5a059);
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.5);
        }

        .image-container {
          width: 150px;
          height: 150px;
          background: #030303;
          margin: 0 auto 25px;
          border: 1px solid #333;
          border-radius: 2px;
          overflow: hidden;
          position: relative;
          transition: 0.4s ease;
        }

        .creator-card:hover .image-container {
          border-color: var(--ember, #c5a059);
        }

        .member-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(80%) contrast(1.1);
          transition: 0.4s ease;
          position: relative;
          z-index: 2;
        }

        .creator-card:hover .member-photo {
          filter: grayscale(0%) contrast(1);
        }

        .photo-placeholder {
          position: absolute; 
          top: 0; left: 0; width: 100%; height: 100%;
          display: flex; justify-content: center; align-items: center;
          background: #080808;
          opacity: 0;
          z-index: 1;
        }

        .placeholder-text {
          font-family: 'Inter', monospace;
          font-size: 0.6rem;
          color: #555;
          letter-spacing: 2px;
          text-align: center;
        }

        .scanline-effect {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to bottom, transparent 50%, rgba(197, 160, 89, 0.05) 51%);
          background-size: 100% 4px; z-index: 3; pointer-events: none;
        }

        .member-name {
          font-family: 'Cinzel', serif;
          color: var(--paper, #f4f0eb);
          font-size: 1.5rem;
          font-weight: 400;
          margin: 0 0 10px 0;
          letter-spacing: 1px;
        }

        .member-role {
          font-family: 'Inter', monospace;
          font-size: 0.7rem;
          color: var(--ember, #c5a059);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0;
        }

        .ember-line-small {
          width: 30px; height: 1px; background: #333; margin: 20px auto;
          transition: 0.4s ease;
        }

        .creator-card:hover .ember-line-small {
          background: var(--ember, #c5a059);
        }

        .member-desc {
          color: var(--paper-dim, #d0c8be);
          font-size: 0.9rem;
          line-height: 1.7;
          font-weight: 300;
          margin: 0;
        }

        /* MEGA FOOTER SECTION */
        .mega-footer {
          padding: 80px 5% 30px;
          background: #050505;
          border-top: 1px solid #1a1a1a;
        }

        .footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .brand-title {
          font-family: 'Cinzel', serif;
          color: var(--paper, #f4f0eb);
          font-size: 1.8rem;
          font-weight: 400;
          letter-spacing: 3px;
          margin: 0 0 20px 0;
        }

        .brand-desc {
          color: var(--paper-dim, #d0c8be);
          font-size: 0.95rem;
          line-height: 1.8;
          font-weight: 300;
          margin: 0 0 30px 0;
          max-width: 350px;
        }

        .social-links {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .social-links a {
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          color: var(--ember, #c5a059);
          text-decoration: none;
          letter-spacing: 2px;
          transition: 0.3s ease;
        }

        .social-links a:hover {
          color: var(--paper, #f4f0eb);
        }

        .separator { color: #333; }

        .column-title {
          font-family: 'Inter', monospace;
          font-size: 0.85rem;
          color: var(--paper, #f4f0eb);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0 0 25px 0;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .footer-links a {
          color: var(--paper-dim, #d0c8be);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 300;
          transition: 0.3s ease;
        }

        .footer-links a:hover {
          color: var(--ember, #c5a059);
          padding-left: 5px;
        }

        /* Bottom Copyright */
        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 30px;
          border-top: 1px solid #1a1a1a;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .copyright {
          color: #666;
          font-size: 0.75rem;
          letter-spacing: 1px;
          font-family: 'Inter', sans-serif;
        }

        .system-status {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', monospace;
          font-size: 0.7rem;
          color: #555;
          letter-spacing: 2px;
        }

        .dot {
          width: 6px; height: 6px; background: var(--ember, #c5a059); border-radius: 50%;
        }
        .pulse { box-shadow: 0 0 8px rgba(197, 160, 89, 0.6); animation: pulse-gold 2s infinite; }
        @keyframes pulse-gold { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        /* Mobile Responsiveness */
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 50px; }
        }

        @media (max-width: 768px) {
          .creators-hall-wrapper { padding: 60px 20px 40px; }
          .team-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr; gap: 40px; }
          .footer-bottom { flex-direction: column; text-align: center; justify-content: center; }
        }
      `}</style>
    </footer>
  );
}