import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // New state for scroll dynamics

  const clickAudio = useRef(null);

  useEffect(() => {
    clickAudio.current = new Audio('/sounds/click.mp3');
    clickAudio.current.preload = "auto";
  }, []);

  // UX Feature: Dynamic Navbar on Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playClick = () => {
    if (clickAudio.current) {
      clickAudio.current.currentTime = 0;
      clickAudio.current.play().catch(() => {});
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isActive = (path) => {
    if (path === '/') return router.pathname === '/';
    return router.pathname.startsWith(path);
  };

  const navLinkStyle = (path) => ({
    color: isActive(path) ? '#c5a059' : '#d0c8be', 
    textDecoration: 'none',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    fontWeight: isActive(path) ? '600' : '400',
    position: 'relative', // For hover animation
  });

  return (
    <nav className={`nav-container ${scrolled ? 'nav-scrolled' : ''}`}>
      
      {/* LEFT: Logo & Back Button */}
      <div className="nav-left">
        {router.pathname !== "/" && (
          <button className="nav-back-btn" onClick={() => { playClick(); router.back(); }} aria-label="Go Back">
            ←
          </button>
        )}
        <div className="brand-wrapper" onClick={playClick}>
          {/* Logo and Brand Title aligned perfectly */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div className="logo-container">
              <Image 
                src="/images/veda-logo.png" 
                alt="Vedaverse Logo" 
                width={150} 
                height={100} 
                priority 
                className="brand-logo"
              />
            </div>
            <h2 className="brand-title">VEDAVERSE</h2>
          </Link>
        </div>
      </div>

      {/* MOBILE HAMBURGER */}
      <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
        <div className={`line ${menuOpen ? 'open' : ''}`}></div>
        <div className={`line ${menuOpen ? 'open' : ''}`}></div>
      </div>

      {/* Mobile Overlay Backdrop */}
      <div className={`mobile-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}></div>

      {/* RIGHT: Links & Profile */}
      <div className={`nav-links-wrapper ${menuOpen ? 'mobile-active' : ''}`}>
        
        <Link href="/studios" style={navLinkStyle('/studios')} onClick={playClick}>
          <span className={`nav-text ${isActive('/studios') ? 'active-text' : ''}`}>STUDIO</span>
        </Link>
        
        <Link href="/production" style={navLinkStyle('/production')} onClick={playClick}>
          <span className={`nav-text ${isActive('/production') ? 'active-text' : ''}`}>PRODUCTION</span>
        </Link>

        <Link href="/status" style={navLinkStyle('/status')} onClick={playClick}>
          <span className={`nav-text ${isActive('/status') ? 'active-text' : ''}`}>STATUS</span>
        </Link>
        
        <Link href="/chronos" style={navLinkStyle('/chronos')} onClick={playClick}>
          <span className={`nav-text ${isActive('/chronos') ? 'active-text' : ''}`}>CHRONOS</span>
        </Link>
        
        <Link href="/recruitment" style={navLinkStyle('/recruitment')} onClick={playClick}>
          <span className={`nav-text ${isActive('/recruitment') ? 'active-text' : ''}`}>CAREERS</span>
        </Link>

        <Link href="/community" style={navLinkStyle('/community')} onClick={playClick}>
          <span className={`nav-text ${isActive('/community') ? 'active-text' : ''}`}>COMMUNITY</span>
        </Link>

        {user ? (
          <Link href="/profile" className="profile-link" onClick={playClick}>
            <div className="profile-wrapper">
              <img 
                src={user.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gyan'} 
                alt="Profile" 
                className="nav-avatar" 
              />
            </div>
          </Link>
        ) : (
          <Link href="/login" onClick={playClick} style={{ textDecoration: 'none' }}>
            <button className="btn-editorial">
              SIGN IN
            </button>
          </Link>
        )}
      </div>

      <style jsx>{`
        /* Navbar Base */
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px 5%;
          background: rgba(3, 3, 3, 0.85);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border-bottom: 1px solid rgba(244, 240, 235, 0.05);
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); /* Smooth UX transition */
        }

        /* Scrolled State Enhancements */
        .nav-scrolled {
          padding: 15px 5%;
          background: rgba(3, 3, 3, 0.98);
          border-bottom: 1px solid rgba(197, 160, 89, 0.15);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
        }

        /* Left Side */
        .nav-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-back-btn {
          background: transparent;
          color: #c5a059;
          border: 1px solid #c5a059;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .nav-back-btn:hover {
          background: #c5a059;
          color: #030303;
          transform: translateX(-3px); /* Micro-interaction */
        }

        .brand-wrapper {
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        /* Logo Styling & Animation */
        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-logo {
          object-fit: contain;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          /* अगर तुम्हारा लोगो काले रंग का है और डार्क बैकग्राउंड में नहीं दिख रहा, तो नीचे वाली लाइन से /* हटा देना */
          /* filter: invert(1) brightness(1.2); */
        }

        .brand-wrapper:hover .brand-logo {
          transform: scale(1.1) rotate(5deg);
        }

        .brand-title {
          font-family: 'Cinzel', serif;
          color: #f4f0eb;
          font-size: 1.5rem;
          margin: 0;
          font-weight: 400;
          letter-spacing: 3px;
          transition: color 0.3s ease;
        }

        .brand-wrapper:hover .brand-title {
          color: #c5a059;
        }

        /* Right Side Links */
        .nav-links-wrapper {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .nav-text {
          position: relative;
          padding-bottom: 4px;
        }

        /* Hover Underline Micro-interaction */
        .nav-text::after {
          content: '';
          position: absolute;
          width: 0%;
          height: 1px;
          bottom: 0;
          left: 50%;
          background-color: #c5a059;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          transform: translateX(-50%);
        }

        .nav-text:hover::after, .active-text::after {
          width: 100%;
        }

        /* Buttons & Profile */
        .btn-editorial {
          padding: 10px 20px;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 2px;
          background: transparent;
          border: 1px solid #f4f0eb;
          color: #f4f0eb;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .btn-editorial:hover {
          background: #f4f0eb;
          color: #030303;
          box-shadow: 0 0 15px rgba(244, 240, 235, 0.3);
        }

        .profile-link {
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        .profile-wrapper {
          width: 38px;
          height: 38px;
          border: 1px solid #333;
          border-radius: 50%;
          padding: 2px;
          transition: all 0.3s ease;
        }

        .profile-wrapper:hover {
          border-color: #c5a059;
          transform: scale(1.05);
        }

        .nav-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          filter: grayscale(80%);
          transition: filter 0.3s ease;
        }

        .profile-wrapper:hover .nav-avatar {
          filter: grayscale(0%);
        }

        /* Mobile Menu Icon */
        .mobile-menu-icon {
          display: none;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
          z-index: 1002;
        }

        .line {
          width: 25px;
          height: 1px;
          background: #f4f0eb;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          transform-origin: left center;
        }

        .mobile-overlay {
          display: none;
        }

        /* Mobile Responsiveness */
        @media (max-width: 1100px) {
          .nav-links-wrapper { gap: 20px; }
          .nav-text { font-size: 0.7rem; letter-spacing: 1px; }
        }

        @media (max-width: 900px) {
          .nav-container { padding: 15px 20px; }
          .nav-scrolled { padding: 10px 20px; }
          .mobile-menu-icon { display: flex; }
          .brand-title { font-size: 1.2rem; letter-spacing: 2px; }
          
          /* UX Polish: Dark Overlay for Mobile Menu */
          .mobile-overlay {
            display: block;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100vh;
            background: rgba(0, 0, 0, 0.7);
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s ease;
            z-index: 1000;
          }
          .mobile-overlay.active {
            opacity: 1;
            visibility: visible;
          }

          .nav-links-wrapper {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 400px;
            height: 100vh;
            background: rgba(5, 5, 5, 0.98);
            border-left: 1px solid rgba(197, 160, 89, 0.1);
            flex-direction: column;
            justify-content: center;
            transition: right 0.5s cubic-bezier(0.77, 0, 0.175, 1);
            gap: 35px;
            backdrop-filter: blur(25px);
            z-index: 1001;
            box-shadow: -10px 0 30px rgba(0, 0, 0, 0.8);
          }

          .nav-links-wrapper.mobile-active {
            right: 0;
          }

          .nav-links-wrapper .nav-text {
            font-size: 1.2rem;
            letter-spacing: 3px;
          }

          /* Smooth Hamburger Animation */
          .line.open:nth-child(1) { transform: rotate(45deg); background: #c5a059; }
          .line.open:nth-child(2) { transform: rotate(-45deg); background: #c5a059; }
          
          .btn-editorial {
            font-size: 0.9rem;
            padding: 15px 40px;
          }
        }
      `}</style>
    </nav>
  );
}