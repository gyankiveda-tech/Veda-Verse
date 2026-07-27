import Head from 'next/head';
// Retaining your existing global styles
import '../styles/globals.css';
import '../styles/gta-style.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Mobile responsiveness & UX fix */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover" />
        <meta name="theme-color" content="#030303" />
        
        {/* 🚀 SEO & Meta Tags for Google Search 🚀 */}
        <title>Vedaverse Studio | India's First Supernatural Cyberpunk Manga</title>
        <meta name="description" content="Enter the Vedaverse. We create original manga, anime, and intellectual property from ground zero. Read Gyan Ki Veda and explore a universe built to outlast us." />
        <meta name="keywords" content="Vedaverse, Gyan Ki Veda, Indian Manga, Cyberpunk Anime, Digital Comics, Vedaverse Studio, Supernatural Manga, Webcomics" />
        <meta name="author" content="Vedaverse Studio" />

        {/* Open Graph Tags (For Discord, WhatsApp, Facebook, LinkedIn) */}
        <meta property="og:title" content="Vedaverse Studio | Premium Original IP" />
        <meta property="og:description" content="Craft before speed. Explore India's first supernatural cyberpunk manga universe." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Vedaverse Studio" />
        <meta property="og:image" content="/images/teaser-thumbnail.jpg" />

        {/* Twitter Card Tags (For X/Twitter shares) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vedaverse Studio | Gyan Ki Veda" />
        <meta name="twitter:description" content="Craft before speed. Explore India's first supernatural cyberpunk manga universe." />
        <meta name="twitter:image" content="/images/teaser-thumbnail.jpg" />

        {/* Google Crawlers Access */}
        <meta name="robots" content="index, follow" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Root Wrapper */}
      <div className="vedaverse-root">
        <Component {...pageProps} />
      </div>

      <style jsx global>{`
        /* Global Reset & Performance UX */
        html, body {
          padding: 0;
          margin: 0;
          background: #030303; /* Ink */
          color: #f4f0eb; /* Paper */
          width: 100%;
          min-height: 100%;
          overflow-x: hidden; /* Horizontal scroll block */
          overflow-y: auto;   /* Vertical scroll allow */
          scroll-behavior: smooth; /* Smooth scrolling UX */
          -webkit-text-size-adjust: 100%; /* Mobile text scaling fix */
          -webkit-tap-highlight-color: transparent; /* Removes blue tap highlight on mobile */
        }
        
        * {
          box-sizing: border-box;
        }

        .vedaverse-root {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* Professional Vedaverse Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #030303; /* Ink */
        }
        ::-webkit-scrollbar-thumb {
          background: #c5a059; /* Ember */
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #dcb873;
        }
      `}</style>
    </>
  );
}

export default MyApp;