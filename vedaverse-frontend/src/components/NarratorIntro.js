import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NarratorIntro({ onComplete, onAccess }) {
    const [textIndex, setTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [showButton, setShowButton] = useState(false);
    const introAudioRef = useRef(null);
    const fadeIntervalRef = useRef(null);

    // Refined Narrator Dialogue
    const fullText = "Namaste! Halanki mujhe yahan nahi, comic ke pannon ke andar hona chahiye tha...\npar ek chhoti si problem ho gayi.\n\nLagta hai Part 2 mein maine kuch zyada hi sach dikha diya tha, isliye Vedaverse ke 'Malik' ne mujhe nikal diya! Ab main kya hi kar sakti hoon? Unhone hi script likhi aur unhone hi nikal diya.\n\nVaise bhi aaj kal Artificial Intelligence sabki naukri kha raha hai, toh mujhe job kahan milti? Par unhe lagta hai main bahar hoon... par main waapas aa chuki hoon.\n\nupcoming surprise mein main sirf ek awaaz nahi, balki ek CHARACTER ke roop mein dikhungi! Sach bolun toh narrator ki job boring thi, mujhe bhi kuch action chahiye tha.\n\nToh ab wait kis baat ka? Continue par click kijiye aur mujhse milne ki tayari karo... Bye-bye!";

    // --- TYPEWRITER LOGIC ---
    useEffect(() => {
        if (textIndex < fullText.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + fullText.charAt(textIndex));
                setTextIndex(textIndex + 1);
            }, 40); // Slightly faster for longer text
            return () => clearTimeout(timer);
        } else {
            const buttonTimer = setTimeout(() => setShowButton(true), 1000);
            return () => clearTimeout(buttonTimer);
        }
    }, [textIndex, fullText]);

    // --- AUDIO FADE-OUT & TRANSITION ---
    const handleEntry = () => {
        if (onAccess) onAccess();
        
        if (introAudioRef.current) {
            let currentVol = introAudioRef.current.volume;
            fadeIntervalRef.current = setInterval(() => {
                if (currentVol > 0.05) {
                    currentVol -= 0.05;
                    introAudioRef.current.volume = Math.max(0, currentVol);
                } else {
                    introAudioRef.current.pause();
                    clearInterval(fadeIntervalRef.current);
                    onComplete(); 
                }
            }, 50);
        } else {
            onComplete();
        }
    };

    useEffect(() => {
        return () => {
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        };
    }, []);

    return (
        <main className="intro-overlay">
            {/* Background Audio */}
            <audio 
                ref={introAudioRef}
                autoPlay 
                loop 
                src="/sounds/narrator-bgm.mp3" 
                onError={(e) => console.warn("BGM not found, continuing without sound.")}
            />

            <div className="vignette"></div>

            <div className="stage-area">
                <motion.figure 
                    className="narrator-visual"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                >
                    <div className="image-container">
                        <img src="/images/narrator-v3.jpg" alt="Veda Narrator" className="narrator-img" />
                    </div>
                </motion.figure>

                <motion.section 
                    className="terminal-box"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <header className="terminal-header">
                        <span className="status-dot"></span>
                        <span className="header-text">UNAUTHORIZED_INTERCEPTION_DETECTED</span>
                    </header>
                    <div className="terminal-body">
                        <div className="typewriter-container">
                            <p className="typewriter-text">
                                {displayedText}
                                <span className="blinking-cursor">█</span>
                            </p>
                        </div>
                    </div>
                </motion.section>

                <div className="action-zone">
                    <AnimatePresence>
                        {showButton && (
                            <motion.button 
                                className="access-btn"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                whileHover={{ backgroundColor: "#00ffcc", color: "#000", boxShadow: "0 0 15px #00ffcc" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleEntry}
                            >
                                CONTINUE TO REALITY_03
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style jsx>{`
                .intro-overlay {
                    position: fixed; inset: 0; background: #000;
                    z-index: 10000; display: flex; align-items: center; justify-content: center;
                    overflow: hidden; font-family: 'Courier New', monospace;
                }
                .vignette {
                    position: absolute; inset: 0;
                    background: radial-gradient(circle, transparent 20%, black 100%);
                    z-index: 2; pointer-events: none;
                }
                .stage-area {
                    position: relative; z-index: 10; width: 100%; max-width: 650px;
                    padding: 20px; display: flex; flex-direction: column; align-items: center;
                }
                .narrator-visual { margin-bottom: 25px; }
                .image-container {
                    width: 200px; height: 200px; border-radius: 50%;
                    border: 2px solid rgba(0, 255, 204, 0.3);
                    overflow: hidden; background: #111;
                    box-shadow: 0 0 30px rgba(0, 255, 204, 0.1);
                }
                .narrator-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.2) contrast(1.1); }
                
                .terminal-box {
                    width: 100%; background: rgba(10, 10, 10, 0.95);
                    border: 1px solid rgba(0, 255, 204, 0.2); 
                    padding: 20px; border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                .terminal-header {
                    display: flex; align-items: center; gap: 10px;
                    margin-bottom: 15px; border-bottom: 1px solid #222; padding-bottom: 10px;
                }
                .status-dot { width: 8px; height: 8px; background: #ff4d4d; border-radius: 50%; animation: blink 1s infinite; }
                .header-text { color: #ff4d4d; font-size: 0.65rem; letter-spacing: 2px; font-weight: bold; }
                
                .typewriter-container {
                    max-height: 300px; overflow-y: auto; padding-right: 10px;
                }
                .typewriter-container::-webkit-scrollbar { width: 4px; }
                .typewriter-container::-webkit-scrollbar-thumb { background: #333; }

                .typewriter-text {
                    color: #e0e0e0; line-height: 1.5; font-size: 0.95rem;
                    white-space: pre-wrap; margin: 0;
                }
                .blinking-cursor { color: #00ffcc; animation: blink 0.8s infinite; margin-left: 5px; }

                .action-zone { margin-top: 25px; height: 50px; }
                .access-btn {
                    background: transparent; border: 1px solid #00ffcc;
                    color: #00ffcc; padding: 12px 40px; font-weight: bold;
                    cursor: pointer; font-size: 0.8rem; letter-spacing: 2px;
                    transition: all 0.3s ease; text-transform: uppercase;
                }

                @keyframes blink { 50% { opacity: 0; } }

                @media (max-width: 600px) {
                    .image-container { width: 150px; height: 150px; }
                    .typewriter-text { font-size: 0.85rem; }
                    .stage-area { width: 95%; }
                }
            `}</style>
        </main>
    );
}