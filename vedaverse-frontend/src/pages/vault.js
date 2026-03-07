import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

export default function Vault() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [tokens, setTokens] = useState(0);
    const [showKeypad, setShowKeypad] = useState(false);
    const [activeTarget, setActiveTarget] = useState(null); 
    const [enteredCode, setEnteredCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isError, setIsError] = useState(false); 
    
    // UPDATE: Added '3' to the default unlocked volumes array
    const [unlockedVolumes, setUnlockedVolumes] = useState([1, 2, 3]);
    const [showMeme, setShowMeme] = useState(false);

    // Audio References
    const clickAudio = useRef(null);
    const successAudio = useRef(null);
    const errorAudio = useRef(null);
    const narratorAudio = useRef(null);
    const memeVideoRef = useRef(null);

    // 1. Sound effects initialization & Cleanup
    useEffect(() => {
        // Initialization with Lower Volumes
        clickAudio.current = new Audio('/sounds/click.mp3');
        clickAudio.current.volume = 0.4; // 40% Volume

        successAudio.current = new Audio('/sounds/success.mp3');
        successAudio.current.volume = 0.4;

        errorAudio.current = new Audio('/sounds/error.mp3');
        errorAudio.current.volume = 0.4;

        narratorAudio.current = new Audio('/sounds/Narrator.mp3');
        narratorAudio.current.volume = 0.3; // 30% Volume (Best for background narration)

        // Cleanup function: Jab user page chhod kar jaye toh audio stop ho jaye
        return () => {
            stopAllAudio();
        };
    }, []);

    const stopAllAudio = () => {
        [clickAudio, successAudio, errorAudio, narratorAudio].forEach(ref => {
            if (ref.current) {
                ref.current.pause();
                ref.current.currentTime = 0;
            }
        });
    };

    const playSound = (type) => {
        const audioMap = { 
            click: clickAudio, 
            success: successAudio, 
            error: errorAudio,
            narrator: narratorAudio 
        };
        const ref = audioMap[type];
        if (ref?.current) {
            ref.current.currentTime = 0;
            ref.current.play().catch((e) => console.warn("Audio play blocked", e));
        }
    };

    // Meme video volume control
    useEffect(() => {
        if (showMeme && memeVideoRef.current) {
            memeVideoRef.current.volume = 0.5; // 50% volume for the meme video
        }
    }, [showMeme]);

    const allComics = [
        { id: 1, title: "VEDA GENESIS", part: "VOL_01", path: "/read-vol1", cover: "/comics/page-1.jpg" },
        { id: 2, title: "FIRST STIR", part: "VOL_02", path: "/read-vol2", cover: "/comics/vol2_cover.jpg" },
        { id: 3, title: "VOID ECHO", part: "VOL_03", path: "/read-vol3", cover: "/comics/vol3_cover.jpg" }
    ];

    // Auth & Firestore logic
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                stopAllAudio();
                router.push('/login');
            } else {
                const userRef = doc(db, "users", user.uid);
                const unsubDoc = onSnapshot(userRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setTokens(docSnap.data().tokens_owned || 0);
                        const dbUnlocked = docSnap.data().unlocked_volumes || [];
                        // UPDATE: Ensure 1, 2, AND 3 are permanently unlocked even if DB doesn't have them
                        setUnlockedVolumes([...new Set([1, 2, 3, ...dbUnlocked])]);
                    }
                    setLoading(false);
                });
                return () => unsubDoc();
            }
        });
        return () => unsubscribe();
    }, [router]);

    const verifyKey = async () => {
        if (isVerifying || !activeTarget) return;
        setIsVerifying(true);
        setIsError(false);
        
        try {
            const q = query(
                collection(db, "access_codes"),
                where("code", "==", enteredCode),
                where("userId", "==", auth.currentUser.uid),
                where("used", "==", false)
            );
            
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                playSound('success'); 
                setShowKeypad(false);
                setShowMeme(true);
                setTimeout(() => setShowMeme(false), 4500);

                const codeDoc = querySnapshot.docs[0];
                await updateDoc(doc(db, "access_codes", codeDoc.id), { used: true, usedAt: new Date() });
                
                const newUnlockedList = [...new Set([...unlockedVolumes, activeTarget])];
                await updateDoc(doc(db, "users", auth.currentUser.uid), { unlocked_volumes: newUnlockedList });
                
                setEnteredCode("");
            } else {
                playSound('error');
                setIsError(true);
                setTimeout(() => setIsError(false), 600);
            }
        } catch (err) { 
            console.error("Decryption Error:", err); 
        } finally { 
            setIsVerifying(false); 
        }
    };

    const handleKeypadEntry = (num) => {
        playSound('click');
        if (num === "CLR") setEnteredCode("");
        else if (num === "OK") { if (enteredCode.length === 6) verifyKey(); }
        else if (enteredCode.length < 6) setEnteredCode(enteredCode + num);
    };

    const handleAccessData = (id, path) => {
        stopAllAudio();
        if (id === 3) {
            console.log("Initiating Volume 3 (Narrator) Transition...");
        }
        router.push(path);
    };

    if (loading) return (
        <div className="loader-container" role="status" aria-live="polite">
            <div className="loader-text">INITIALIZING_VAULT_DECRYPTION...</div>
            <div className="loader-bar"></div>
        </div>
    );

    return (
        <div className="vault-page no-select">
            <Navbar />
            <div className="nebula-bg" aria-hidden="true"></div>

            <main className="vault-container">
                <section className="status-bar-new" aria-label="System Status">
                    <div className="status-item" title="Gyan & Loki Monitoring Active">
                        <span className="pulse-green"></span> GYAN-LOKI_PROTOCOL: ONLINE
                    </div>
                    <div className="status-item gold">CORE_POWER: {tokens} TOKENS</div>
                </section>

                <header className="header-section">
                    <h1 className="cyber-h1">THE <span className="glitch-gold">VAULT</span></h1>
                    <p className="scanner-text">STATUS: SCANNING_ENCRYPTED_DATA_PACKETS...</p>
                </header>

                <section className="comic-grid" aria-label="Data Volumes">
                    {allComics.map((item) => {
                        const isUnlocked = unlockedVolumes.includes(item.id);
                        return (
                            <article key={item.id} className={`vault-card ${isUnlocked ? 'active' : 'locked'}`}>
                                <div className="card-inner">
                                    <figure 
                                        className="poster-area" 
                                        onClick={() => { 
                                            if(!isUnlocked) { playSound('click'); setActiveTarget(item.id); setShowKeypad(true); } 
                                        }}
                                        aria-label={isUnlocked ? `Cover image for ${item.title}` : `Locked volume ${item.id}`}
                                        role={!isUnlocked ? "button" : "img"}
                                        tabIndex={!isUnlocked ? 0 : -1}
                                    >
                                        <div className="scan-line"></div>
                                        {isUnlocked ? (
                                            <img src={item.cover} alt={`${item.title} Cover`} className="cover-img" />
                                        ) : (
                                            <div className="lock-state">
                                                <div className="lock-hex"><span className="lock-icon" aria-hidden="true">🔒</span></div>
                                                <p className="lock-text">ENCRYPTED_BLOCK</p>
                                            </div>
                                        )}
                                    </figure>

                                    <div className="meta-area">
                                        <div className="meta-labels">
                                            <span className="vol-id">{item.part}</span>
                                            <span className={`status-tag ${isUnlocked ? 'on' : 'off'}`} role="status">
                                                {isUnlocked ? 'DECRYPTED' : 'LOCKED'}
                                            </span>
                                        </div>
                                        <h2 className="comic-title">{isUnlocked ? item.title : `DATA_CHUNKS_0${item.id}`}</h2>
                                        
                                        {isUnlocked ? (
                                            <button 
                                                onClick={() => handleAccessData(item.id, item.path)} 
                                                className="read-link-btn"
                                                aria-label={`Read ${item.title}`}
                                            >
                                                ACCESS_DATA
                                            </button>
                                        ) : (
                                            <button 
                                                className="unlock-trigger" 
                                                onClick={() => { playSound('click'); setActiveTarget(item.id); setShowKeypad(true); }}
                                                aria-label={`Unlock volume ${item.id}`}
                                            >
                                                REDEEM_ACCESS
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>
            </main>

            {/* Modals & Overlays */}
            {showMeme && (
                <div className="meme-overlay" role="alertdialog" aria-modal="true">
                    <div className="meme-content">
                        <video ref={memeVideoRef} autoPlay src="/videos/meme-unlock.mp4" className="meme-video" />
                        <h2 className="success-text">DECRYPTION SUCCESSFUL!</h2>
                    </div>
                </div>
            )}

            {showKeypad && (
                <div className="keypad-overlay" role="dialog" aria-modal="true" aria-labelledby="keypad-title">
                    <div className={`keypad-ui ${isError ? 'shake' : ''}`}>
                        <header className="ui-header">
                            <h3 id="keypad-title" className="ui-title">DECRYPTION_UNIT_{activeTarget}</h3>
                            <button className="close-ui" onClick={() => { playSound('click'); setShowKeypad(false); }} aria-label="Close Keypad">×</button>
                        </header>
                        <div className="code-display" aria-live="polite">
                            {enteredCode.padEnd(6, "•").split("").map((c, i) => (
                                <span key={i} className={c !== "•" ? "digit highlight" : "digit"} aria-hidden="true">{c}</span>
                            ))}
                            <span className="sr-only">Entered code: {enteredCode || "empty"}</span>
                        </div>
                        <div className="keys-grid">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "CLR", 0, "OK"].map(k => (
                                <button 
                                    key={k} 
                                    onClick={() => handleKeypadEntry(k)} 
                                    className="key-btn"
                                    aria-label={`Keypad button ${k}`}
                                >
                                    {k === "OK" && isVerifying ? "..." : k}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <Footer />

            <style jsx>{`
                /* CSS Remains the Same */
                .vault-page { background: #000; min-height: 100vh; position: relative; color: #fff; font-family: 'Cinzel', serif; overflow-x: hidden; }
                .no-select { user-select: none; }
                .nebula-bg { position: fixed; inset: 0; background: radial-gradient(circle at 50% 0%, #1a1a00 0%, #000 70%); opacity: 0.6; z-index: 0; }
                .loader-container { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #000; gap: 20px; }
                .loader-text { color: #ffcc00; font-family: monospace; letter-spacing: 3px; }
                .loader-bar { width: 200px; height: 2px; background: #222; position: relative; overflow: hidden; }
                .loader-bar::after { content: ''; position: absolute; left: -100%; width: 100%; height: 100%; background: #ffcc00; animation: loading 1.5s infinite; }
                @keyframes loading { 100% { left: 100%; } }
                .vault-container { position: relative; z-index: 10; padding: 120px 20px 80px; max-width: 1200px; margin: 0 auto; width: 100%; }
                .status-bar-new { display: flex; justify-content: space-between; padding: 15px 20px; background: rgba(10,10,10,0.8); border: 1px solid #222; font-family: monospace; font-size: 0.75rem; margin-bottom: 40px; border-radius: 4px; }
                .pulse-green { width: 8px; height: 8px; background: #00ff88; border-radius: 50%; display: inline-block; margin-right: 5px; box-shadow: 0 0 10px #00ff88; animation: blink 1.5s infinite; }
                .gold { color: #ffcc00; text-shadow: 0 0 5px #ffcc00; }
                .cyber-h1 { font-size: 2.5rem; text-align: center; letter-spacing: 8px; margin-bottom: 5px; font-weight: 900; }
                .glitch-gold { color: #ffcc00; text-shadow: 0 0 20px rgba(255,204,0,0.4); }
                .scanner-text { text-align: center; color: #555; font-family: monospace; font-size: 0.65rem; letter-spacing: 2px; margin-bottom: 50px; }
                .comic-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 40px; }
                .vault-card { background: rgba(15,15,15,0.9); border: 1px solid #1a1a1a; border-radius: 8px; padding: 15px; transition: 0.4s ease; position: relative; }
                .vault-card:hover { border-color: #ffcc00; transform: translateY(-8px); box-shadow: 0 12px 40px rgba(255,204,0,0.15); }
                .poster-area { height: 420px; background: #050505; position: relative; overflow: hidden; border-radius: 4px; cursor: pointer; border: 1px solid rgba(255,255,255,0.05); margin: 0; }
                .cover-img { width: 100%; height: 100%; object-fit: cover; filter: contrast(1.1) brightness(0.9); transition: 0.5s; }
                .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: rgba(255, 204, 0, 0.2); animation: scan 3s linear infinite; z-index: 2; pointer-events: none; }
                @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
                .lock-state { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #080808; gap: 15px; }
                .lock-hex { padding: 20px; border: 1px solid #1a1a1a; border-radius: 50%; background: #0c0c0c; }
                .lock-icon { font-size: 2rem; color: #222; }
                .lock-text { font-family: monospace; font-size: 0.7rem; color: #333; letter-spacing: 2px; }
                .meta-area { padding-top: 20px; }
                .meta-labels { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
                .vol-id { font-family: monospace; color: #ffcc00; font-size: 0.7rem; font-weight: bold; }
                .status-tag { font-family: monospace; font-size: 0.6rem; padding: 3px 8px; border-radius: 3px; text-transform: uppercase; }
                .status-tag.on { background: rgba(0,255,136,0.1); color: #00ff88; border: 1px solid #00ff88; }
                .status-tag.off { background: rgba(255,0,0,0.05); color: #ff4757; border: 1px solid #ff4757; }
                .comic-title { font-size: 1.2rem; margin: 0 0 15px 0; letter-spacing: 2px; }
                .read-link-btn { width: 100%; padding: 12px; background: #ffcc00; color: #000; border: none; font-weight: bold; cursor: pointer; font-size: 0.85rem; border-radius: 4px; transition: 0.3s; font-family: 'Cinzel'; }
                .read-link-btn:hover { background: #fff; box-shadow: 0 0 20px rgba(255,204,0,0.4); }
                .unlock-trigger { width: 100%; padding: 12px; background: transparent; border: 1px solid #333; color: #888; cursor: pointer; font-size: 0.8rem; font-family: 'Cinzel'; border-radius: 4px; transition: 0.3s; }
                .unlock-trigger:hover { border-color: #ffcc00; color: #ffcc00; background: rgba(255,204,0,0.05); }
                .keypad-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 2000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px); }
                .keypad-ui { background: #0a0a0a; border: 2px solid #ffcc00; padding: 30px; border-radius: 12px; width: 100%; max-width: 350px; }
                .ui-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 1px solid #222; padding-bottom: 10px; }
                .ui-title { font-family: monospace; color: #ffcc00; margin: 0; font-size: 0.8rem; }
                .close-ui { background: none; border: none; color: #444; font-size: 2rem; cursor: pointer; line-height: 1; }
                .code-display { display: flex; gap: 10px; justify-content: center; margin-bottom: 30px; position: relative;}
                .digit { width: 40px; height: 55px; border-bottom: 2px solid #222; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #222; }
                .digit.highlight { color: #ffcc00; border-bottom-color: #ffcc00; text-shadow: 0 0 10px #ffcc00; }
                .keys-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
                .key-btn { padding: 15px; background: #0f0f0f; border: 1px solid #1a1a1a; color: #fff; font-family: monospace; cursor: pointer; font-size: 1.2rem; border-radius: 6px; }
                .key-btn:hover { background: #ffcc00; color: #000; }
                .meme-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.98); z-index: 3000; display: flex; align-items: center; justify-content: center; }
                .meme-content { text-align: center; }
                .meme-video { width: 95%; max-width: 550px; border-radius: 12px; border: 2px solid #ffcc00; box-shadow: 0 0 50px rgba(255,204,0,0.5); }
                .success-text { color: #ffcc00; margin-top: 30px; font-family: monospace; letter-spacing: 6px; font-size: 1.5rem; }
                .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }
                @keyframes blink { 50% { opacity: 0.3; } }
                .shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
                @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
                @media (max-width: 768px) { .vault-container { padding-top: 100px; } .comic-grid { grid-template-columns: 1fr; } .poster-area { height: 450px; } }
            `}</style>
        </div>
    );
}