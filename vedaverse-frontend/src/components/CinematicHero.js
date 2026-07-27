import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicHero() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.hero-content');
      
      // 🎬 1. Elegant Entrance Animation (Runs only once on load)
      const entranceTl = gsap.timeline();
      
      entranceTl.fromTo(".main-title", 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.8, ease: "power3.out", stagger: 0.3 }
      )
      .fromTo(".status-tag, .divider, .agenda-text", 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", stagger: 0.15 },
        "-=1.2" // Overlaps smoothly with the title animation
      );

      // 🛠️ 2. Cinematic Fade-Out on Scroll
      slides.forEach((slide) => {
        // Animating the whole slide container instead of children avoids conflicts
        gsap.to(slide, {
          opacity: 0,
          y: -80, 
          filter: "blur(8px)",
          scrollTrigger: {
            trigger: slide,
            start: "top 10%", // Starts fading when it reaches near top
            end: "bottom 40%", // Completely faded out by here
            scrub: 1,
          }
        });
      });

    }, containerRef);

    return () => {
      ctx.revert(); // Clean up all GSAP instances on unmount to prevent glitches
    };
  }, []); // Removed isMobile dependency to stop infinite re-renders on mobile scroll

  return (
    <div ref={containerRef} className="hero-wrapper">
      
      {/* SECTION 1 - The Identity */}
      <div className="hero-content first-hero">
        <div className="status-tag">INDIA'S ORIGINAL IP STUDIO</div>
        <h1 className="main-title">VEDAVERSE</h1>
        <div className="divider"></div>
        <p className="agenda-text">WE DON'T CREATE HEROES.</p>
      </div>

      {/* SECTION 2 - The Philosophy */}
      <div className="hero-content">
        <div className="status-tag">CRAFT BEFORE SPEED</div>
        <h1 className="main-title">VEDAVERSE</h1>
        <div className="divider"></div>
        <p className="agenda-text">WE CREATE PEOPLE WHOSE CHOICES BECOME LEGENDS.</p>
      </div>

      {/* SECTION 3 - The Legacy */}
      <div className="hero-content last-hero">
        <div className="status-tag">THE FOUNDATION</div>
        <h1 className="main-title">A NEW MYTHOLOGY</h1>
        <div className="divider"></div>
        <p className="agenda-text">BUILT TO OUTLAST US. WORLDS WORTH INHERITING.</p>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <div className="scroll-text">SCROLL TO EXPLORE</div>
      </div>

      <style jsx>{`
        .hero-wrapper {
          position: relative;
          width: 100%;
          background: transparent;
          z-index: 10; 
          pointer-events: none; 
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .hero-content {
          height: 100vh; /* Fallback */
          height: 100svh; /* Dynamic viewport height (fixes mobile address bar issue) */
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 10%;
          margin-bottom: 40vh; 
        }

        .last-hero { margin-bottom: 0; }

        .status-tag, .main-title, .divider, .agenda-text {
          will-change: transform, opacity, filter;
        }

        .status-tag {
          font-family: 'Inter', sans-serif;
          color: #c5a059; /* Ember / Muted Gold */
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 5px;
          text-transform: uppercase;
          margin-bottom: 15px;
        }

        .main-title {
          font-family: 'Cinzel', serif; /* Literary, timeless serif */
          font-size: clamp(3rem, 10vw, 7.5rem);
          font-weight: 400;
          line-height: 1.1;
          color: #f4f0eb; /* Paper White */
          margin: 0;
          letter-spacing: 2px;
        }

        .divider { 
          width: 40px; 
          height: 2px; 
          background: #c5a059; 
          margin: 25px auto; 
        }

        .agenda-text { 
          font-family: 'Cinzel', serif;
          font-size: 1.2rem; 
          letter-spacing: 2px; 
          color: #a0a0a0; 
          max-width: 800px; 
          font-weight: 400;
          text-transform: uppercase;
        }

        .scroll-indicator {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          opacity: 0.6;
        }

        .scroll-line {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, transparent, #c5a059, transparent);
          animation: scroll-down 2s infinite ease-in-out;
        }

        .scroll-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 4px;
          color: #a0a0a0;
          text-transform: uppercase;
        }

        @keyframes scroll-down {
          0% { transform: translateY(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }

        /* Mobile Optimization */
        @media only screen and (max-width: 768px) {
          .hero-content {
            padding: 0 5%;
            margin-bottom: 30vh;
          }
          .status-tag {
            font-size: 0.65rem;
            letter-spacing: 3px;
          }
          .main-title {
            font-size: 2.8rem;
          }
          .divider {
            margin: 20px auto;
          }
          .agenda-text {
            font-size: 0.9rem;
            letter-spacing: 1px;
            line-height: 1.6;
          }
          .scroll-indicator { display: none; }
        }
      `}</style>
    </div>
  );
}