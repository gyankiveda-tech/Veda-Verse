import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('../../components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../../components/Footer'), { ssr: false });

export default function RoleDetail() {
  const router = useRouter();
  const { role } = router.query;

  // Feature 16: Full Role Data from Recruitment Document Chapter 07
  const roleDataDB = {
    "art-director": {
      title: "Art Director",
      department: "LEADERSHIP",
      type: "FULL-TIME",
      location: "ON-SITE OR HYBRID",
      mission: "To define and maintain the visual vision of the studio, ensuring cohesive aesthetic quality across all original IP and guiding the creative development of every artist in the studio.",
      responsibilities: [
        "Establish the visual language and style guides for new IP.",
        "Review and approve character, environment, and prop designs.",
        "Mentor senior artists and provide high-level creative feedback.",
        "Collaborate with producers to balance creative ambition with production realities."
      ],
      requirements: [
        "8+ years of professional experience in manga, anime, or related visual media.",
        "Proven track record leading art teams on published works.",
        "Exceptional understanding of composition, colour theory, and visual storytelling.",
        "Ability to articulate feedback clearly and constructively."
      ],
      preferred: [
        "Experience across both 2D manga and animation pipelines.",
        "Familiarity with transmedia adaptation (print to screen)."
      ],
      software: "Clip Studio Paint, Photoshop, SketchUp.",
      portfolio: "15-20 pieces demonstrating range, IP development, and finished published pages/frames."
    },
    "manga-artist": {
      title: "Manga Artist",
      department: "CORE CREATIVE",
      type: "FULL-TIME OR CONTRACT",
      location: "REMOTE-FRIENDLY",
      mission: "To draw, pencil, and ink original manga pages, translating scripts into compelling sequential art that meets the studio's standards for pacing, emotion, and draftsmanship.",
      responsibilities: [
        "Produce 15-20 finished inked pages per month (or equivalent).",
        "Work closely with the writer and editor to interpret scripts.",
        "Maintain character and environmental consistency across chapters.",
        "Deliver files according to the File Standards Manual."
      ],
      requirements: [
        "3+ years of professional sequential art experience.",
        "Demonstrable mastery of anatomy, perspective, and panel pacing.",
        "Ability to meet monthly deadlines without supervision."
      ],
      preferred: [
        "Ability to draw mecha, architecture, or animal anatomy.",
        "Experience with digital screentone techniques."
      ],
      software: "Clip Studio Paint (required), Photoshop.",
      portfolio: "10-15 sequential pages (with scripts if possible) showing pacing, inking, and emotional range."
    },
    "storyboard-artist": {
      title: "Storyboard Artist",
      department: "PRE-PRODUCTION",
      type: "CONTRACT",
      location: "HYBRID",
      mission: "To translate scripts and concepts into visual blueprints for animation, establishing camera angles, character blocking, and pacing before full production begins.",
      responsibilities: [
        "Create sequential storyboard panels based on episode scripts.",
        "Establish camera movements and transitions.",
        "Iterate on boards based on Director feedback."
      ],
      requirements: [
        "2+ years of storyboard experience in animation.",
        "Strong understanding of cinematic language and composition.",
        "Ability to draw quickly and expressively."
      ],
      preferred: [
        "Animatic timing experience.",
        "Understanding of 2D animation mechanics."
      ],
      software: "Storyboard Pro, Photoshop.",
      portfolio: "2-3 complete storyboard sequences demonstrating pacing and camera work."
    },
    "concept-artist": {
      title: "Concept Artist",
      department: "PRE-PRODUCTION",
      type: "FULL-TIME",
      location: "ON-SITE",
      mission: "To design the characters, environments, props, and visual motifs that define the look of a new IP before production begins.",
      responsibilities: [
        "Produce character turnarounds, expression sheets, and environment paintings.",
        "Explore multiple visual directions for new projects.",
        "Collaborate with the Art Director to finalise style guides."
      ],
      requirements: [
        "3+ years of concept art experience in games, film, or animation.",
        "Exceptional painting and design fundamentals."
      ],
      preferred: [
        "3D blockout skills for environment design.",
        "Costume and historical fashion knowledge."
      ],
      software: "Photoshop, Blender.",
      portfolio: "15 pieces showing character and environment design, including iteration processes."
    },
    "background-artist": {
      title: "Background Artist",
      department: "PRODUCTION",
      type: "FULL-TIME OR CONTRACT",
      location: "REMOTE-FRIENDLY",
      mission: "To paint the environments and settings that ground the characters in a believable, emotionally resonant world.",
      responsibilities: [
        "Paint detailed background art for manga panels or animation shots.",
        "Maintain lighting and colour consistency across scenes."
      ],
      requirements: [
        "2+ years of background painting experience.",
        "Mastery of perspective and atmospheric lighting."
      ],
      preferred: [
        "Architectural drawing skills.",
        "Matte painting experience."
      ],
      software: "Photoshop, Clip Studio Paint.",
      portfolio: "10 background paintings demonstrating varied lighting and perspectives."
    },
    "lettering-artist": {
      title: "Lettering Artist",
      department: "POST-PRODUCTION",
      type: "CONTRACT",
      location: "REMOTE",
      mission: "To place dialogue, sound effects, and narration onto manga pages or animation subs, ensuring readability and aesthetic harmony with the art.",
      responsibilities: [
        "Hand-letter or digitally letter manga pages.",
        "Design custom sound effects (SFX).",
        "Ensure text does not obscure vital artwork."
      ],
      requirements: [
        "1+ years of lettering experience.",
        "Excellent typography and layout instincts."
      ],
      preferred: [
        "Fluency in Japanese and English typography.",
        "Hand-drawn calligraphy skills."
      ],
      software: "Illustrator, Clip Studio Paint, InDesign.",
      portfolio: "5-10 lettered pages showing SFX design and dialogue placement."
    },
    "color-artist": {
      title: "Color Artist",
      department: "PRODUCTION",
      type: "CONTRACT",
      location: "REMOTE",
      mission: "To apply colour to inked manga pages or animation frames, establishing mood, depth, and visual hierarchy through colour theory.",
      responsibilities: [
        "Flat and render colours for sequential pages or animation cels.",
        "Establish and maintain colour scripts for characters and environments."
      ],
      requirements: [
        "2+ years of digital colouring experience.",
        "Strong understanding of colour theory and lighting."
      ],
      preferred: [
        "Painterly rendering styles.",
        "Understanding of cel-shading techniques."
      ],
      software: "Photoshop, Clip Studio Paint.",
      portfolio: "10 pages/frames showing flatting and rendering, including different lighting scenarios."
    },
    "3d-artist": {
      title: "3D Artist",
      department: "PRODUCTION",
      type: "FULL-TIME",
      location: "HYBRID",
      mission: "To create 3D assets, blockouts, and renders that support the 2D pipeline, enhancing environments and complex camera movements.",
      responsibilities: [
        "Model, texture, and render 3D environments or props for reference.",
        "Set up cameras for complex sequences.",
        "Integrate 3D elements seamlessly with 2D art."
      ],
      requirements: [
        "3+ years of 3D modeling experience in Maya, Blender, or equivalent.",
        "Strong understanding of perspective and form."
      ],
      preferred: [
        "Experience matching 3D elements to a 2D anime/manga aesthetic."
      ],
      software: "Blender, Maya, ZBrush.",
      portfolio: "Demo reel or 10+ renders showing environments, props, and integration tests."
    }
  };

  const currentRole = roleDataDB[role];

  if (!currentRole) {
    return (
      <div className="recruitment-root no-select loading-state">
        <Navbar />
        <div className="container" style={{ textAlign: 'center', paddingTop: '20vh' }}>
          <p className="utility-tag">LOADING PROTOCOL...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recruitment-root no-select">
      <Head>
        <title>{currentRole.title} | Vedaverse Studio</title>
        <meta name="description" content={`Apply for the ${currentRole.title} position at Vedaverse Studio.`} />
      </Head>

      <Navbar />

      {/* Sticky Sub-Navigation */}
      <div className="sticky-subnav">
        <ul className="subnav-links">
          <li><Link href="/recruitment">Studio</Link></li>
          <li><Link href="/recruitment#culture">Culture</Link></li>
          <li><Link href="/recruitment/positions" className="active">Positions</Link></li>
          <li><Link href="/recruitment/process">Process</Link></li>
          <li><Link href="/recruitment/apply">Apply</Link></li>
        </ul>
      </div>

      <main className="role-detail-main">
        <div className="container">
          
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <Link href="/">Home</Link> <span className="separator">{'>'}</span> 
            <Link href="/recruitment">Recruitment</Link> <span className="separator">{'>'}</span> 
            <Link href="/recruitment/positions">Positions</Link> <span className="separator">{'>'}</span> 
            <span className="current">{currentRole.title}</span>
          </div>

          {/* Role Header */}
          <header className="role-header">
            <div className="role-meta">
              <span className="utility-tag">{currentRole.department}</span>
              <span className="utility-tag separator">•</span>
              <span className="utility-tag">{currentRole.type}</span>
              <span className="utility-tag separator">•</span>
              <span className="utility-tag">{currentRole.location}</span>
            </div>
            <h1 className="cinzel-title">{currentRole.title}</h1>
            <div className="ember-line"></div>
            <p className="mission-statement">{currentRole.mission}</p>
          </header>

          {/* Role Content Grid */}
          <div className="role-content">
            
            <section className="detail-section">
              <h3 className="utility-heading">RESPONSIBILITIES</h3>
              <ul className="editorial-list">
                {currentRole.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="detail-section">
              <h3 className="utility-heading">REQUIREMENTS</h3>
              <ul className="editorial-list">
                {currentRole.requirements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="detail-section">
              <h3 className="utility-heading">PREFERRED SKILLS</h3>
              <ul className="editorial-list">
                {currentRole.preferred.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="detail-section bg-dark">
              <h3 className="utility-heading">SOFTWARE & PORTFOLIO</h3>
              <div className="req-block">
                <strong>Software:</strong> <p>{currentRole.software}</p>
              </div>
              <div className="req-block">
                <strong>Portfolio:</strong> <p>{currentRole.portfolio}</p>
              </div>
            </section>

          </div>

          {/* Action Footer */}
          <div className="action-footer">
            <Link href={`/recruitment/apply?role=${role}`} className="primary-cta">
              BEGIN APPLICATION
            </Link>
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
          padding: 60px 20px 150px 20px;
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

        /* Breadcrumbs */
        .breadcrumbs {
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          letter-spacing: 1px;
          color: #777;
          margin-bottom: 50px;
          text-transform: uppercase;
        }

        .breadcrumbs a {
          color: #777;
          text-decoration: none;
          transition: 0.3s ease;
        }

        .breadcrumbs a:hover {
          color: var(--ember, #c5a059);
        }

        .breadcrumbs .separator {
          margin: 0 10px;
          color: #444;
        }

        .breadcrumbs .current {
          color: var(--paper-dim, #d0c8be);
        }

        /* Header */
        .role-header {
          margin-bottom: 60px;
        }

        .role-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .utility-tag {
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          letter-spacing: 2px;
          color: var(--ember, #c5a059);
          text-transform: uppercase;
        }

        .separator {
          color: #444;
        }

        .cinzel-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 400;
          letter-spacing: 2px;
          margin: 0;
        }

        .ember-line {
          width: 50px; height: 1px; background: var(--ember, #c5a059); margin: 30px 0;
        }

        .mission-statement {
          font-size: 1.2rem;
          color: var(--paper-dim, #d0c8be);
          line-height: 1.8;
          font-weight: 300;
          max-width: 800px;
        }

        /* Content Grid */
        .role-content {
          display: flex;
          flex-direction: column;
          gap: 50px;
          margin-bottom: 80px;
        }

        .utility-heading {
          font-family: 'Inter', monospace;
          font-size: 0.85rem;
          letter-spacing: 2px;
          color: var(--ember, #c5a059);
          margin-bottom: 25px;
          text-transform: uppercase;
        }

        .editorial-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .editorial-list li {
          margin-bottom: 15px;
          position: relative;
          padding-left: 20px;
          color: var(--paper-dim, #d0c8be);
          line-height: 1.7;
          font-size: 1.05rem;
        }

        .editorial-list li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--ember, #c5a059);
        }

        .bg-dark {
          background: #080808;
          border: 1px solid #1a1a1a;
          padding: 40px;
        }

        .req-block {
          margin-bottom: 20px;
        }

        .req-block:last-child {
          margin-bottom: 0;
        }

        .req-block strong {
          display: block;
          color: var(--paper, #f4f0eb);
          margin-bottom: 5px;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .req-block p {
          color: var(--paper-dim, #d0c8be);
          line-height: 1.7;
          margin: 0;
        }

        /* Action Footer */
        .action-footer {
          border-top: 1px solid var(--border-subtle, rgba(244,240,235,0.08));
          padding-top: 60px;
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
          .bg-dark { padding: 30px 20px; }
          .primary-cta { width: 100%; text-align: center; }
        }
      `}</style>
    </div>
  );
}