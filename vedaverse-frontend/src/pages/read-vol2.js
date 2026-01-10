import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
    doc, getDoc, collection, addDoc, query, orderBy, 
    onSnapshot, serverTimestamp, updateDoc, increment, setDoc 
} from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ReadVol2() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const [stats, setStats] = useState({ likes: 0, dislikes: 0, views: 0 }); // Added views state
    const [userAction, setUserAction] = useState(null); 
    const [showHeart, setShowHeart] = useState(false);

    const totalPages = 46; 
    const clickAudio = useRef(null);

    // --- TIME FORMATTER ---
    const formatTime = (createdAt) => {
        if (!createdAt) return "Just now";
        const date = createdAt.seconds ? new Date(createdAt.seconds * 1000) : new Date(createdAt);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    useEffect(() => {
        clickAudio.current = new Audio('/sounds/click.mp3');
    }, []);

    const playClick = () => {
        if (clickAudio.current) {
            clickAudio.current.currentTime = 0;
            clickAudio.current.play().catch(e => console.log("Sound play blocked"));
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                router.push('/login');
            } else {
                setUser(currentUser);
                const userRef = doc(db, "users", currentUser.uid);
                const userSnap = await getDoc(userRef);
                
                if (userSnap.exists() && userSnap.data().unlocked_volumes?.includes(2)) {
                    setIsAuthorized(true);
                } else {
                    router.push('/vault');
                }
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        if (!db || !user || !isAuthorized) return;

        // 1. AUTO-INCREMENT VIEW (Real user entry)
        const incrementView = async () => {
            const statsRef = doc(db, "vol2_data", "stats");
            try {
                await updateDoc(statsRef, { views: increment(1) });
            } catch (e) {
                await setDoc(statsRef, { likes: 0, dislikes: 0, views: 1 }, { merge: true });
            }
        };
        incrementView();

        // 2. Fetch Comments
        const unsubComments = onSnapshot(query(collection(db, "vol2_comments"), orderBy("createdAt", "desc")), (snap) => {
            const fetchedComments = snap.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data(),
                displayTime: formatTime(doc.data().createdAt)
            }));
            setAllComments(fetchedComments);
        });

        // 3. Fetch Stats (Including Views)
        const unsubStats = onSnapshot(doc(db, "vol2_data", "stats"), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setStats({
                    likes: Math.max(0, data.likes || 0),
                    dislikes: Math.max(0, data.dislikes || 0),
                    views: data.views || 0
                });
            }
        });

        const unsubUserAction = onSnapshot(doc(db, "vol2_user_actions", user.uid), (docSnap) => {
            if (docSnap.exists()) setUserAction(docSnap.data().action);
            else setUserAction(null);
        });

        return () => { unsubComments(); unsubStats(); unsubUserAction(); };
    }, [user, isAuthorized]);

    const handleInteraction = async (newAction) => {
        if (!user) return;
        playClick();
        const statsRef = doc(db, "vol2_data", "stats");
        const userActionRef = doc(db, "vol2_user_actions", user.uid);
        let updates = {};

        if (userAction === newAction) {
            updates[newAction === 'liked' ? 'likes' : 'dislikes'] = increment(-1);
            try {
                await updateDoc(statsRef, updates);
                await setDoc(userActionRef, { action: null });
                setUserAction(null);
            } catch (e) { console.error(e); }
            return;
        }

        if (newAction === 'liked') {
            updates.likes = increment(1);
            if (userAction === 'disliked') updates.dislikes = increment(-1);
        } else if (newAction === 'disliked') {
            updates.dislikes = increment(1);
            if (userAction === 'liked') updates.likes = increment(-1);
        }

        try {
            await updateDoc(statsRef, updates);
            await setDoc(userActionRef, { action: newAction });
            setUserAction(newAction);
            if (newAction === 'liked') {
                setShowHeart(true);
                setTimeout(() => setShowHeart(false), 1500);
            }
        } catch (error) { console.error(error); }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        playClick();
        await addDoc(collection(db, "vol2_comments"), {
            text: comment,
            userName: user.displayName || "Commander",
            userId: user.uid,
            createdAt: serverTimestamp(),
            isFake: false 
        });
        setComment('');
    };

    if (loading) return <div className="loader">DECRYPTING_FILES...</div>;
    if (!isAuthorized) return null;

    return (
        <div className="read-page">
            <Navbar />
            {showHeart && <div className="heart-explosion">❤️</div>}
            
            <div className="comic-container">
                <header className="comic-header">
                    <h1>THE FIRST STIR IN REALITY</h1>
                    <p>PART 2: THE AWAKENING</p>
                </header>

                {/* VIEW COUNTER BADGE */}
                <div className="view-badge">
                    <span className="live-dot"></span> {stats.views.toLocaleString()} READS
                </div>

                <div className="social-actions">
                    <button 
                        onClick={() => handleInteraction('liked')} 
                        className={`action-btn ${userAction === 'liked' ? 'active-like' : ''}`}
                    >
                        <span className="icon">👍</span> {stats.likes}
                    </button>
                    <button 
                        onClick={() => handleInteraction('disliked')} 
                        className={`action-btn ${userAction === 'disliked' ? 'active-dislike' : ''}`}
                    >
                        <span className="icon">👎</span> {stats.dislikes}
                    </button>
                    <button className="action-btn share" onClick={() => { playClick(); navigator.clipboard.writeText(window.location.href); alert("Signal Copied!"); }}>
                        <span className="icon">🚀</span> SHARE
                    </button>
                </div>

                <div className="divider"></div>

                <div className="image-frame">
                    <img src={`/comics/vol2/${currentPage}.jpg`} alt={`Page ${currentPage}`} className="main-img" />
                </div>

                <div className="transmission-section">
                    <div className="section-title">
                        <h3>{allComments.length} TRANSMISSIONS</h3>
                        <div className="live-badge-red">● LIVE</div>
                    </div>
                    
                    <form onSubmit={handleComment} className="input-group">
                        <input type="text" placeholder="Enter transmission signal..." value={comment} onChange={(e) => setComment(e.target.value)} />
                        <button type="submit" className="post-btn">SEND</button>
                    </form>

                    <div className="comments-list">
                        {allComments.map(c => (
                            <div key={c.id} className={`comment-card ${c.isFake ? 'ghost-fade' : ''}`}>
                                <div className="comment-header">
                                    <span className="user-name">{c.userName}</span>
                                    <span className="comment-time">{c.displayTime}</span>
                                </div>
                                <p className="comment-text">{c.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sticky-nav">
                    <button onClick={() => { if(currentPage > 1) { playClick(); setCurrentPage(currentPage - 1); } }} className="nav-btn">PREV</button>
                    <span className="page-info">{currentPage} / {totalPages}</span>
                    <button onClick={() => { if(currentPage < totalPages) { playClick(); setCurrentPage(currentPage + 1); } }} className="nav-btn">NEXT</button>
                </div>
            </div>
            <Footer />

            <style jsx>{`
                .read-page { background: #000; min-height: 100vh; color: #fff; font-family: 'Courier New', monospace; }
                .comic-container { max-width: 800px; margin: 0 auto; padding: 120px 20px 150px; text-align: center; }
                .comic-header h1 { color: #ffcc00; font-size: 2rem; letter-spacing: 2px; margin-bottom: 5px; }
                
                /* View Badge Style */
                .view-badge { display: inline-flex; align-items: center; gap: 8px; background: #0a0a0a; border: 1px solid #222; padding: 5px 15px; border-radius: 20px; color: #00ff00; font-size: 0.8rem; margin-bottom: 20px; }
                .live-dot { width: 8px; height: 8px; background: #00ff00; border-radius: 50%; animation: blink-dot 1s infinite; }
                @keyframes blink-dot { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }

                .social-actions { display: flex; justify-content: center; gap: 15px; margin: 20px 0; }
                .action-btn { background: #0a0a0a; border: 1px solid #333; color: #fff; padding: 12px 25px; border-radius: 4px; cursor: pointer; transition: 0.3s; font-weight: bold; }
                .active-like { border-color: #ffcc00; color: #ffcc00; box-shadow: 0 0 10px rgba(255, 204, 0, 0.2); }
                .active-dislike { border-color: #ff4757; color: #ff4757; }
                
                .divider { height: 1px; background: linear-gradient(90deg, transparent, #333, transparent); margin: 40px 0; }
                .image-frame { border: 2px solid #1a1a1a; box-shadow: 0 0 40px rgba(0,0,0,0.5); line-height: 0; }
                .main-img { width: 100%; height: auto; }
                
                .transmission-section { text-align: left; margin-top: 60px; background: #050505; padding: 20px; border-radius: 8px; border: 1px solid #111; }
                .section-title { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .live-badge-red { color: #ff4757; font-size: 0.8rem; font-weight: bold; animation: blink-red 1.5s infinite; }
                @keyframes blink-red { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
                
                .input-group { display: flex; gap: 10px; margin-bottom: 30px; }
                .input-group input { flex: 1; background: #000; border: 1px solid #222; padding: 15px; color: #ffcc00; outline: none; }
                .post-btn { background: #ffcc00; color: #000; border: none; padding: 0 25px; font-weight: bold; cursor: pointer; }

                .comments-list { display: flex; flex-direction: column; gap: 15px; }
                .comment-card { background: #080808; padding: 15px; border-left: 3px solid #222; transition: 0.3s; }
                .comment-card:hover { border-left-color: #ffcc00; }
                .ghost-fade { border-left-style: dashed; }
                .user-name { color: #ffcc00; font-weight: bold; font-size: 0.9rem; }
                .comment-time { color: #444; font-size: 0.75rem; }
                
                .sticky-nav { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.9); border: 1px solid #ffcc00; padding: 10px 25px; border-radius: 4px; display: flex; align-items: center; gap: 20px; z-index: 1000; backdrop-filter: blur(10px); }
                .nav-btn { background: #ffcc00; border: none; padding: 8px 20px; font-weight: bold; cursor: pointer; color: #000; }
                
                .heart-explosion { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 5rem; z-index: 2000; animation: heart-out 1.5s forwards; pointer-events: none; }
                @keyframes heart-out { 0% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -150%) scale(2); } }
                .loader { height: 100vh; display: flex; align-items: center; justify-content: center; background: #000; color: #ffcc00; font-size: 1.2rem; }
            `}</style>
        </div>
    );
}
