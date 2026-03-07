import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
    doc, onSnapshot, collection, query, orderBy, 
    updateDoc, increment, setDoc, addDoc, serverTimestamp 
} from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NarratorIntro from '../components/NarratorIntro';

export default function ReadVol3() {
    const router = useRouter();
    const [showIntro, setShowIntro] = useState(false); 
    const [user, setUser] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const [stats, setStats] = useState({ likes: 0, dislikes: 0, views: 0 });
    const [userAction, setUserAction] = useState(null); 
    const [showHeart, setShowHeart] = useState(false);

    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');

    const totalPages = 24; 
    const clickAudio = useRef(null);
    const bgmAudio = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    
    // NAYA REF: Comic Image ki position track karne ke liye
    const comicTopRef = useRef(null);

    const stopAllAudio = useCallback(() => {
        if (bgmAudio.current) {
            bgmAudio.current.pause();
            bgmAudio.current.currentTime = 0;
        }
        if (clickAudio.current) {
            clickAudio.current.pause();
        }
    }, []);

    const formatTime = useCallback((createdAt) => {
        if (!createdAt) return "Just now";
        const date = createdAt.seconds ? new Date(createdAt.seconds * 1000) : new Date(createdAt);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    }, []);

    // --- ONE-TIME INTRO LOGIC ---
    useEffect(() => {
        const hasSeenIntro = localStorage.getItem('vol3_intro_seen');
        if (!hasSeenIntro) {
            setShowIntro(true);
        }
    }, []);

    const handleIntroComplete = () => {
        localStorage.setItem('vol3_intro_seen', 'true');
        setShowIntro(false);
        startMusicSequence();
    };

    // --- AUDIO INITIALIZATION ---
    useEffect(() => {
        clickAudio.current = new Audio('/sounds/click.mp3');
        const audio = new Audio('/sounds/vol3-bgm.mp3');
        audio.loop = true;
        audio.volume = 0.4;
        bgmAudio.current = audio;

        const hasSeenIntro = localStorage.getItem('vol3_intro_seen');
        if (hasSeenIntro && !loading) {
            startMusicSequence();
        }

        return () => { stopAllAudio(); };
    }, [loading, stopAllAudio]);

    const playClick = () => {
        if (clickAudio.current) {
            clickAudio.current.currentTime = 0;
            clickAudio.current.play().catch(() => {});
        }
    };

    const startMusicSequence = () => {
        if (bgmAudio.current) {
            bgmAudio.current.play()
                .then(() => setIsMuted(false))
                .catch(e => console.warn("BGM_AUTO_PLAY_PREVENTED: Interaction needed"));
        }
    };

    const toggleMusic = () => {
        if (!bgmAudio.current) return;
        playClick();
        if (bgmAudio.current.paused) {
            bgmAudio.current.play().catch(e => console.error(e));
            setIsMuted(false);
        } else {
            bgmAudio.current.pause();
            setIsMuted(true);
        }
    };

    // NAYA FUNCTION: Smart Scroll Control
    const changePage = (newPage) => {
        playClick();
        setCurrentPage(newPage);
        
        // Agar user pehle se wahan nahi hai, toh smooth scroll karke image par le aao
        // 90px ka offset diya hai taaki Navbar image ko chhupaye nahi
        if (comicTopRef.current) {
            const yOffset = -90; 
            const y = comicTopRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    // --- AUTH & DATA SYNC ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                stopAllAudio();
                router.push('/login');
            } else {
                setUser(currentUser);
                setIsAuthorized(true);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [router, stopAllAudio]);

    useEffect(() => {
        if (!isAuthorized || !user) return;
        const statsRef = doc(db, "vol3_data", "stats");
        updateDoc(statsRef, { views: increment(1) }).catch(() => {
            setDoc(statsRef, { likes: 0, dislikes: 0, views: 1 }, { merge: true });
        });
        const q = query(collection(db, "vol3_comments"), orderBy("createdAt", "desc"));
        const unsubComments = onSnapshot(q, (snap) => {
            setAllComments(snap.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data(),
                displayTime: formatTime(doc.data().createdAt)
            })));
        });
        const unsubStats = onSnapshot(statsRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setStats({
                    likes: Math.max(0, data.likes || 0),
                    dislikes: Math.max(0, data.dislikes || 0),
                    views: data.views || 0
                });
            }
        });
        const unsubAction = onSnapshot(doc(db, "vol3_user_actions", user.uid), (docSnap) => {
            setUserAction(docSnap.exists() ? docSnap.data().action : null);
        });
        return () => { unsubComments(); unsubStats(); unsubAction(); };
    }, [user, isAuthorized, formatTime]);

    const handleInteraction = async (newAction) => {
        if (!user) return;
        playClick();
        const statsRef = doc(db, "vol3_data", "stats");
        const userActionRef = doc(db, "vol3_user_actions", user.uid);
        let updates = {};
        if (userAction === newAction) {
            updates[newAction === 'liked' ? 'likes' : 'dislikes'] = increment(-1);
            await updateDoc(statsRef, updates);
            await setDoc(userActionRef, { action: null });
        } else {
            if (newAction === 'liked') {
                updates.likes = increment(1);
                if (userAction === 'disliked') updates.dislikes = increment(-1);
                setShowHeart(true);
                setTimeout(() => setShowHeart(false), 1500);
            } else {
                updates.dislikes = increment(1);
                if (userAction === 'liked') updates.likes = increment(-1);
            }
            await updateDoc(statsRef, updates);
            await setDoc(userActionRef, { action: newAction });
        }
    };

    const handlePostComment = async (e, parentId = null) => {
        e.preventDefault();
        const textToPost = parentId ? replyText : comment;
        if (!textToPost.trim()) return;
        playClick();
        try {
            await addDoc(collection(db, "vol3_comments"), {
                text: textToPost,
                userName: user.displayName || "Agent",
                userId: user.uid,
                createdAt: serverTimestamp(),
                parentId: parentId,
                pageRef: currentPage,
                likes: 0
            });
            parentId ? setReplyText('') : setComment('');
            setReplyingTo(null);
        } catch (error) { console.error("TRANS_ERR:", error); }
    };

    if (loading) return (
        <div className="decryption-loader">
            <div className="loader-content">SYSTEM_DECRYPTING_VOL_03...</div>
        </div>
    );

    if (showIntro) {
        return <NarratorIntro onComplete={handleIntroComplete} onAccess={startMusicSequence} />;
    }

    return (
        <div className="read-page">
            <Navbar />
            {showHeart && <div className="heart-fx">❤️</div>}

            <main className="comic-viewer">
                <header className="comic-meta">
                    <h1 className="glow-text">THE NEW REALITY</h1>
                    <p className="sub-glow">VOL_03: BEYOND THE FOURTH WALL</p>
                </header>

                <section className="engagement-bar">
                    <div className="stats-info">
                        <span className="live-indicator"></span>
                        {stats.views.toLocaleString()} RECEPTIONS
                    </div>
                    <div className="btn-group">
                        <button onClick={() => handleInteraction('liked')} className={`ui-btn ${userAction === 'liked' ? 'liked' : ''}`}>
                            👍 {stats.likes}
                        </button>
                        <button onClick={() => handleInteraction('disliked')} className={`ui-btn ${userAction === 'disliked' ? 'disliked' : ''}`}>
                            👎 {stats.dislikes}
                        </button>
                        <button className="ui-btn" onClick={() => { navigator.clipboard.writeText(window.location.href); alert("LINK_COPIED"); }}>
                            🚀
                        </button>
                    </div>
                </section>

                {/* NAYA REF ATTACHED HERE: Scroll browser ko is section tak layega */}
                <section className="image-pipeline" ref={comicTopRef}>
                    <img 
                        src={`/comics/vol3/${currentPage}.jpg`} 
                        alt={`Page ${currentPage}`} 
                        className="comic-img" 
                        loading="eager"
                        onError={(e) => { e.target.src = '/comics/fallback.jpg'; }}
                    />
                </section>

                <section className="comms-hub">
                    <header className="hub-header">
                        <h3>{allComments.length} TRANSMISSIONS</h3>
                        <span className="glitch-text">FEED_ACTIVE</span>
                    </header>

                    <form onSubmit={(e) => handlePostComment(e)} className="comms-input">
                        <input placeholder={`Inject signal at Page ${currentPage}...`} value={comment} onChange={(e) => setComment(e.target.value)} />
                        <button type="submit">SEND</button>
                    </form>

                    <div className="feed-container">
                        {allComments.filter(c => !c.parentId).map(c => (
                            <article key={c.id} className="feed-item">
                                <header className="item-meta">
                                    <span className="user-id">{c.userName}</span>
                                    <span className="timestamp">{c.displayTime}</span>
                                    <span className="pg-mark">PG_{c.pageRef}</span>
                                </header>
                                <p className="item-text">{c.text}</p>
                                <footer className="item-actions">
                                    <button onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}>REPLY</button>
                                </footer>
                                {replyingTo === c.id && (
                                    <form onSubmit={(e) => handlePostComment(e, c.id)} className="reply-box">
                                        <input autoFocus value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Type reply..." />
                                        <button type="submit">➤</button>
                                    </form>
                                )}
                            </article>
                        ))}
                    </div>
                </section>

                <nav className="os-nav">
                    {/* BUTTONS UPDATED: Ab ye changePage function ko call karenge */}
                    <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>PREV</button>
                    <span className="pos-indicator">{currentPage} / {totalPages}</span>
                    <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>NEXT</button>
                    <div className="os-sep"></div>
                    <button onClick={toggleMusic} className={`music-toggle ${!isMuted ? 'active' : ''}`}>
                        {isMuted ? '🔇' : '🔊'}
                    </button>
                </nav>
            </main>

            <Footer />

            <style jsx>{`
                .read-page { background: #000; min-height: 100vh; color: #fff; font-family: 'Courier New', monospace; }
                .comic-viewer { max-width: 650px; margin: 0 auto; padding: 100px 15px 150px; }
                .glow-text { color: #00ffcc; text-shadow: 0 0 10px rgba(0,255,204,0.5); font-size: 2rem; text-align: center; }
                .sub-glow { color: #444; letter-spacing: 5px; font-size: 0.7rem; margin-top: 5px; text-align: center; }
                .engagement-bar { display: flex; justify-content: space-between; margin: 25px 0; padding: 15px 0; border-top: 1px solid #111; border-bottom: 1px solid #111; }
                .stats-info { color: #00ffcc; font-size: 0.8rem; display: flex; align-items: center; gap: 10px; }
                .live-indicator { width: 8px; height: 8px; background: #00ffcc; border-radius: 50%; animation: blink 1.2s infinite; }
                .btn-group { display: flex; gap: 12px; }
                .ui-btn { background: #0a0a0a; border: 1px solid #222; color: #fff; padding: 6px 14px; cursor: pointer; transition: 0.3s; font-size: 0.8rem; border-radius: 4px; }
                .liked { border-color: #00ffcc; color: #00ffcc; }
                
                .image-pipeline { 
                    background: #050505; 
                    border: 1px solid #1a1a1a; 
                    padding: 40px; 
                    border-radius: 8px; 
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .comic-img { 
                    width: auto; 
                    max-width: 100%;
                    max-height: 85vh; 
                    height: auto; 
                    display: block; 
                    border-radius: 4px; 
                    box-shadow: 0 0 30px rgba(0,0,0,0.8);
                }
                
                .comms-hub { margin-top: 80px; background: #020202; padding: 30px; border: 1px solid #0f0f0f; border-radius: 12px; }
                .hub-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .comms-input { display: flex; gap: 15px; margin-bottom: 50px; }
                .comms-input input { flex: 1; background: #000; border: 1px solid #1a1a1a; padding: 15px; color: #00ffcc; border-radius: 6px; }
                .comms-input button { background: #00ffcc; color: #000; border: none; padding: 0 30px; font-weight: 800; cursor: pointer; border-radius: 6px; }
                .feed-item { background: #050505; padding: 25px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #111; }
                
                .os-nav { position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%); background: rgba(5,5,5,0.95); border: 1px solid rgba(0,255,204,0.3); padding: 12px 30px; border-radius: 50px; display: flex; align-items: center; gap: 25px; z-index: 1000; backdrop-filter: blur(15px); }
                .os-nav button { background: #00ffcc; color: #000; border: none; padding: 10px 22px; font-weight: 900; cursor: pointer; border-radius: 25px; font-size: 0.75rem; }
                .os-nav button:disabled { background: #1a1a1a; color: #444; }
                .pos-indicator { font-size: 0.9rem; font-weight: 800; min-width: 80px; text-align: center; color: #fff; }
                .music-toggle { background: transparent !important; color: #fff !important; font-size: 1.4rem !important; }

                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
                .decryption-loader { height: 100vh; display: flex; align-items: center; justify-content: center; background: #000; color: #00ffcc; letter-spacing: 8px; }

                @media (max-width: 768px) {
                    .comic-viewer { padding-top: 80px; max-width: 100%; }
                    .image-pipeline { padding: 10px; border: none; }
                    .comic-img { width: 100%; max-height: none; } 
                    .os-nav { width: 92%; gap: 15px; padding: 12px 20px; bottom: 20px; }
                }
            `}</style>
        </div>
    );
}