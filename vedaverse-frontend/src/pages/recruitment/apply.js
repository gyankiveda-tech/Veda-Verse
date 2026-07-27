import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Navbar = dynamic(() => import('../../components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../../components/Footer'), { ssr: false });

export default function Apply() {
  const router = useRouter();
  const { role } = router.query;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    portfolioUrl: '',
    message: '',
    aiDisclosure: false
  });

  // New States for Backend UX
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  useEffect(() => {
    if (role) {
      setFormData(prev => ({ ...prev, role: role }));
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Map formData to match our Backend schema
    const applicationData = {
      fullName: formData.name,
      email: formData.email,
      role: formData.role,
      portfolioLink: formData.portfolioUrl,
      coverLetter: formData.message
    };

    try {
      // API call to our backend (Replace localhost URL when deploying backend to Vercel/Render)
      const response = await fetch('http://localhost:5000/api/recruitment/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        // Redirect to confirmation page after a short delay for UX
        setTimeout(() => {
          router.push('/recruitment/confirmation');
        }, 1500);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="recruitment-root no-select">
      <Head>
        <title>Submit Application | Vedaverse Studio</title>
        <meta name="description" content="Submit your portfolio and application to Vedaverse Studio." />
      </Head>

      <Navbar />

      {/* Sticky Sub-Navigation */}
      <div className="sticky-subnav">
        <ul className="subnav-links">
          <li><Link href="/recruitment">Studio</Link></li>
          <li><Link href="/recruitment#culture">Culture</Link></li>
          <li><Link href="/recruitment/positions">Positions</Link></li>
          <li><Link href="/recruitment/process">Process</Link></li>
          <li><Link href="/recruitment/apply" className="active">Apply</Link></li>
        </ul>
      </div>

      <main className="apply-main">
        <div className="container">
          
          <header className="page-header">
            <h1 className="cinzel-title">SUBMIT <span className="gold">APPLICATION</span></h1>
            <div className="ember-line-center"></div>
          </header>

          <div className="apply-grid">
            
            {/* Left Column: Guidelines & Rules */}
            <div className="guidelines-column">
              <h3 className="utility-heading">APPLICATION GUIDELINES</h3>
              
              <div className="guideline-block">
                <h4>01. PORTFOLIO STANDARDS</h4>
                <p>Submit a curated link to your best work. We evaluate foundational understanding, composition, and narrative intent over pure rendering. Ensure your portfolio aligns with our published Evaluation Standards.</p>
              </div>

              <div className="guideline-block">
                <h4>02. AI DISCLOSURE POLICY</h4>
                <p>Vedaverse Studio respects human authorship. If AI tools were used for ideation or reference in your portfolio, they must be explicitly labeled. Submitting undisclosed AI-generated work as original manual craft will result in immediate disqualification.</p>
              </div>

              <div className="guideline-block">
                <h4>03. RESPONSE TIMELINE</h4>
                <p>Every application receives an automated confirmation within 24 hours. The portfolio review stage typically requires 1-2 weeks. You will be notified of the outcome regardless of the decision.</p>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="form-column">
              <form className="application-form" onSubmit={handleSubmit}>
                
                <div className="form-group">
                  <label htmlFor="name" className="utility-tag">FULL NAME</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rohan Pradhan"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="utility-tag">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter a monitored email"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role" className="utility-tag">POSITION</label>
                  <select 
                    id="role" 
                    name="role" 
                    required 
                    className="form-input select-input"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>Select a position...</option>
                    <option value="art-director">Art Director</option>
                    <option value="manga-artist">Manga Artist</option>
                    <option value="storyboard-artist">Storyboard Artist</option>
                    <option value="concept-artist">Concept Artist</option>
                    <option value="background-artist">Background Artist</option>
                    <option value="lettering-artist">Lettering Artist</option>
                    <option value="color-artist">Color Artist</option>
                    <option value="3d-artist">3D Artist</option>
                    <option value="open-application">Open Application (General)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="portfolioUrl" className="utility-tag">PORTFOLIO URL</label>
                  <input 
                    type="url" 
                    id="portfolioUrl" 
                    name="portfolioUrl" 
                    required 
                    className="form-input"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    placeholder="https://your-portfolio.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="utility-tag">DIRECTOR'S NOTE / COVER LETTER</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5"
                    className="form-input textarea-input"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us why you want to build worlds with Vedaverse Studio..."
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {/* AI & Originality Disclosure Checkbox */}
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="aiDisclosure" 
                      required 
                      checked={formData.aiDisclosure}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">
                      I confirm that all work submitted is my own, and any AI-assisted elements are explicitly disclosed in my portfolio, in accordance with Vedaverse Studio policy.
                    </span>
                  </label>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="status-message success">
                    Application successfully dispatched. Redirecting...
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="status-message error">
                    System error. Failed to dispatch application. Please try again later.
                  </div>
                )}

                <div className="form-submit">
                  <button type="submit" className="primary-cta submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
                  </button>
                </div>

              </form>
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
          max-width: 1000px;
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
          margin-bottom: 60px;
        }

        .cinzel-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 400;
          letter-spacing: 2px;
          margin: 0;
        }

        .gold { color: var(--ember, #c5a059); }

        .ember-line-center {
          width: 50px; height: 1px; background: var(--ember, #c5a059); margin: 25px auto;
        }

        .utility-heading {
          font-family: 'Inter', monospace;
          font-size: 0.85rem;
          letter-spacing: 2px;
          color: var(--ember, #c5a059);
          margin-bottom: 30px;
          text-transform: uppercase;
        }

        .utility-tag {
          display: block;
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          letter-spacing: 2px;
          color: var(--paper-dim, #d0c8be);
          margin-bottom: 8px;
        }

        /* Layout Grid */
        .apply-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
        }

        /* Guidelines Column */
        .guideline-block {
          margin-bottom: 40px;
        }

        .guideline-block h4 {
          font-family: 'Cinzel', serif;
          color: var(--paper, #f4f0eb);
          font-size: 1.1rem;
          font-weight: 400;
          margin: 0 0 10px 0;
          letter-spacing: 1px;
        }

        .guideline-block p {
          color: var(--paper-dim, #d0c8be);
          font-size: 0.95rem;
          line-height: 1.7;
          margin: 0;
          font-weight: 300;
        }

        /* Form Column */
        .application-form {
          background: #080808;
          border: 1px solid #1a1a1a;
          padding: 50px;
        }

        .form-group {
          margin-bottom: 30px;
        }

        .form-input {
          width: 100%;
          background: #050505;
          border: 1px solid #222;
          color: var(--paper, #f4f0eb);
          padding: 15px;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          outline: none;
          transition: 0.3s ease;
          border-radius: 2px;
        }

        .form-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .form-input:focus:not(:disabled) {
          border-color: var(--ember, #c5a059);
          box-shadow: 0 0 10px rgba(197, 160, 89, 0.1);
        }

        .form-input::placeholder {
          color: #444;
        }

        .select-input {
          appearance: none;
          cursor: pointer;
        }

        .textarea-input {
          resize: vertical;
          min-height: 120px;
        }

        /* Custom Checkbox */
        .checkbox-group {
          margin-top: 40px;
          margin-bottom: 40px;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          cursor: pointer;
        }

        .checkbox-label input {
          display: none;
        }

        .checkbox-custom {
          width: 20px;
          height: 20px;
          border: 1px solid #444;
          background: #050505;
          display: inline-block;
          flex-shrink: 0;
          position: relative;
          transition: 0.3s ease;
          margin-top: 2px;
        }

        .checkbox-label input:checked ~ .checkbox-custom {
          background: var(--ember, #c5a059);
          border-color: var(--ember, #c5a059);
        }

        .checkbox-label input:checked ~ .checkbox-custom::after {
          content: '';
          position: absolute;
          left: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid #030303;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .checkbox-text {
          color: var(--paper-dim, #d0c8be);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        /* Status Messages */
        .status-message {
          padding: 15px;
          margin-bottom: 25px;
          font-family: 'Inter', monospace;
          font-size: 0.8rem;
          letter-spacing: 1px;
          text-align: center;
          border: 1px solid;
        }

        .status-message.success {
          background: rgba(197, 160, 89, 0.1);
          color: var(--ember, #c5a059);
          border-color: var(--ember, #c5a059);
        }

        .status-message.error {
          background: rgba(255, 71, 87, 0.1);
          color: #ff4757;
          border-color: #ff4757;
        }

        /* Submit Button */
        .form-submit {
          text-align: right;
        }

        .submit-btn {
          background: var(--paper, #f4f0eb);
          color: var(--ink, #030303);
          padding: 16px 40px;
          border: none;
          border-radius: 2px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 2px;
          cursor: pointer;
          transition: 0.3s ease;
          text-transform: uppercase;
        }

        .submit-btn:hover:not(:disabled) {
          background: var(--ember, #c5a059);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          background: #555;
          color: #111;
        }

        @media (max-width: 768px) {
          .sticky-subnav {
            overflow-x: auto;
            justify-content: flex-start;
            padding: 15px 20px;
          }
          .subnav-links { gap: 20px; }
          .apply-grid { grid-template-columns: 1fr; gap: 40px; }
          .application-form { padding: 30px 20px; }
          .submit-btn { width: 100%; text-align: center; }
        }
      `}</style>
    </div>
  );
}