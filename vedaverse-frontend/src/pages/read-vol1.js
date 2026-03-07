import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../lib/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, addDoc, query, orderBy, onSnapshot, 
  serverTimestamp, doc, updateDoc, increment, setDoc, getDoc, arrayUnion, arrayRemove 
} from 'firebase/firestore';
import Navbar from '../components/Navbar';

export default function ReadVol1() {
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [stats, setStats] = useState({ likes: 0, dislikes: 0, views: 0 });
  const [userAction, setUserAction] = useState(null); 
  const [showHeart, setShowHeart] = useState(false);
  
  const [replyingTo, setReplyingTo] = useState(null); 
  const [replyText, setReplyText] = useState('');
  
  const totalPages = 28; 
  const router = useRouter();
  const clickAudio = useRef(null);

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
    if (typeof window !== 'undefined') {
      clickAudio.current = new Audio('/sounds/click.mp3');
    }
  }, []);

  const playClick = () => {
    if (clickAudio.current) {
      clickAudio.current.currentTime = 0;
      clickAudio.current.play().catch(e => console.log("Sound play blocked"));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push('/login');
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!db || !user) return;

    const incrementView = async () => {
        const statsRef = doc(db, "vol1_data", "stats");
        try {
            await updateDoc(statsRef, { views: increment(1) });
        } catch (e) {
            await setDoc(statsRef, { likes: 0, dislikes: 0, views: 1 }, { merge: true });
        }
    };
    incrementView();

    const unsubComments = onSnapshot(query(collection(db, "vol1_comments"), orderBy("createdAt", "desc")), (snap) => {
      const fetched = snap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        displayTime: formatTime(doc.data().createdAt) 
      }));
      setAllComments(fetched);
    });

    const unsubStats = onSnapshot(doc(db, "vol1_data", "stats"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStats({
          likes: Math.max(0, data.likes || 0),
          dislikes: Math.max(0, data.dislikes || 0),
          views: data.views || 0 
        });
      }
    });

    const unsubUserAction = onSnapshot(doc(db, "vol1_user_actions", user.uid), (docSnap) => {
      if (docSnap.exists()) setUserAction(docSnap.data().action);
      else setUserAction(null);
    });

    return () => { unsubComments(); unsubStats(); unsubUserAction(); };
  }, [user]);

  const handleInteraction = async (newAction) => {
    if (!user) return;
    playClick();

    const statsRef = doc(db, "vol1_data", "stats");
    const userActionRef = doc(db, "vol1_user_actions", user.uid);
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
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1500);
    } else if (newAction === 'disliked') {
      updates.dislikes = increment(1);
      if (userAction === 'liked') updates.likes = increment(-1);
    }

    try {
      await updateDoc(statsRef, updates);
      await setDoc(userActionRef, { action: newAction });
      setUserAction(newAction);
    } catch (error) { console.error(error); }
  };

  const isDuplicate = (newText, existingComments) => {
    const cleanNew = newText.toLowerCase().replace(/\s/g, '');
    return existingComments.some(c => {
        const cleanOld = c.text.toLowerCase().replace(/\s/g, '');
        return cleanOld.includes(cleanNew) || cleanNew.includes(cleanOld);
    });
  };

  const handlePostComment = async (e, parentId = null) => {
    e.preventDefault();
    const textToPost = parentId ? replyText : comment;
    if (!textToPost.trim()) return;
    
    const recentComments = allComments.slice(0, 10);
    if (isDuplicate(textToPost, recentComments)) {
        alert("Transmission Error: Similar signal already exists via Quantum Entanglement.");
        return;
    }

    playClick(); 
    try {
      await addDoc(collection(db, "vol1_comments"), {
        text: textToPost,
        userName: user.displayName || "Agent",
        userId: user.uid,
        userPhoto: user.photoURL || null,
        createdAt: serverTimestamp(),
        parentId: parentId,
        isFake: false,
        likes: 0,
        dislikes: 0,
        pageRef: currentPage
      });
      
      if (parentId) {
          setReplyingTo(null);
          setReplyText('');
      } else {
          setComment('');
      }
    } catch (error) { console.error(error); }
  };

  const handleCommentReaction = async (commentId, type) => {
      const commentRef = doc(db, "vol1_comments", commentId);
      await updateDoc(commentRef, { [type]: increment(1) });
  };

  const rootComments = allComments.filter(c => !c.parentId);
  const getReplies = (parentId) => allComments.filter(c => c.parentId === parentId).sort((a,b) => a.createdAt - b.createdAt);

  if (!user) return <div className="cosmic-bg"></div>;

  return (
    <div className="no-select" style={{ background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'monospace' }}>
      <Navbar />
      <div className="cosmic-bg"></div>
      
      {showHeart && <div className="heart-explosion">🔥</div>}

      <main style={{ paddingTop: '80px', paddingBottom: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <h1 style={{ color: '#ffcc00', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '1.2rem', marginBottom: '10px' }}>Gyan Ki Veda - Vol 1</h1>
        
        <div className="view-badge">
            <span className="live-dot"></span> {stats.views.toLocaleString()} READS
        </div>

        {/* --- OPTIMIZED COMIC BOX --- */}
        <div className="comic-box">
          <img 
            src={`/comics/vol1/${currentPage}.jpg`} 
            alt={`Page ${currentPage}`}
            className="comic-img"
          />
        </div>

        <div className="stats-bar">
          <button onClick={() => handleInteraction('liked')} className={`inter-btn ${userAction === 'liked' ? 'btn-active-like' : ''}`}>
            👍 {stats.likes}
          </button>
          
          <button onClick={() => handleInteraction('disliked')} className={`inter-btn ${userAction === 'disliked' ? 'btn-active-dislike' : ''}`}>
            👎 {stats.dislikes}
          </button>

          <button className="inter-btn share-btn" onClick={() => { playClick(); navigator.clipboard.writeText(window.location.href); alert("Signal Encrypted & Copied!");}}>
            🚀 SHARE
          </button>
        </div>

        <div className="floating-nav">
          <button onClick={() => { if(currentPage > 1) { playClick(); setCurrentPage(p => p-1); } }} className="btn-gold-nav">PREV</button>
          <span className="page-indicator">{currentPage} / {totalPages}</span>
          <button onClick={() => { if(currentPage < totalPages) { playClick(); setCurrentPage(p => p+1); } }} className="btn-gold-nav">NEXT</button>
        </div>

        <hr style={{ width: '90%', maxWidth: '650px', borderColor: '#111', margin: '40px 0' }} />

        <section style={{ width: '95%', maxWidth: '650px', paddingBottom: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ color: '#ffcc00' }}>{allComments.length} TRANSMISSIONS</h3>
            <span style={{ color: '#00ff00', fontSize: '0.8rem' }}>● ENCRYPTED_FEED</span>
          </div>

          <form onSubmit={(e) => handlePostComment(e, null)} style={{ display: 'flex', gap: '10px', marginBottom: '40px' }}>
            <input 
              type="text" 
              placeholder={`Write a transmission for Page ${currentPage}...`} 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ flex: 1, background: '#050505', border: '1px solid #222', padding: '15px', color: '#ffcc00', outline: 'none' }}
            />
            <button type="submit" className="btn-post">SEND</button>
          </form>

          <div className="comments-list">
            {rootComments.map(c => (
              <div key={c.id} className={`comment-card ${c.isFake ? 'ghost-effect' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <strong style={{ color: '#ffcc00', fontSize: '0.9rem' }}>{c.userName}</strong>
                    {c.pageRef && <span style={{fontSize:'0.6rem', background:'#222', padding:'2px 6px', borderRadius:'4px', color:'#777'}}>Pg {c.pageRef}</span>}
                  </div>
                  <span style={{ color: '#333', fontSize: '0.7rem' }}>{c.displayTime}</span>
                </div>
                <p style={{ color: '#bbb', fontSize: '0.9rem', margin: '5px 0 10px' }}>{c.text}</p>
                <div className="comment-actions">
                    <button onClick={() => handleCommentReaction(c.id, 'likes')} className="action-btn">▲ {c.likes || 0}</button>
                    <button onClick={() => handleCommentReaction(c.id, 'dislikes')} className="action-btn">▼ {c.dislikes || 0}</button>
                    <button onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)} className="action-btn" style={{color:'#ffcc00'}}>
                        {replyingTo === c.id ? 'CANCEL' : 'REPLY'}
                    </button>
                </div>
                {replyingTo === c.id && (
                    <form onSubmit={(e) => handlePostComment(e, c.id)} style={{ marginTop:'10px', display:'flex', gap:'5px' }}>
                        <input autoFocus type="text" placeholder="Reply to this signal..." value={replyText} onChange={(e)=>setReplyText(e.target.value)} style={{ flex:1, background: '#111', border: 'none', padding: '8px', color: '#fff', fontSize:'0.8rem' }} />
                        <button type="submit" style={{background:'#ffcc00', border:'none', cursor:'pointer', fontWeight:'bold', fontSize:'0.7rem', padding: '0 10px'}}>➤</button>
                    </form>
                )}
                {getReplies(c.id).map(reply => (
                    <div key={reply.id} className="reply-card">
                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong style={{ color: '#999', fontSize: '0.8rem' }}>{reply.userName}</strong>
                            <span style={{ color: '#333', fontSize: '0.6rem' }}>{reply.displayTime}</span>
                        </div>
                        <p style={{ color: '#ccc', fontSize: '0.8rem', margin: '2px 0' }}>{reply.text}</p>
                    </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      <style jsx>{`
        .view-badge { background: #111; padding: 5px 15px; border-radius: 20px; color: #00ff00; font-size: 0.8rem; border: 1px solid #222; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
        .live-dot { width: 8px; height: 8px; background: #00ff00; border-radius: 50%; animation: blink 1s infinite; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
        
        .stats-bar { display: flex; gap: 15px; margin: 20px 0; }

        /* --- COMIC ZOOM FIX --- */
        .comic-box { 
          width: 100%; 
          max-width: 800px; 
          display: flex; 
          justify-content: center; 
          background: #000; 
          overflow: hidden;
        }
        .comic-img { 
          width: 100%; 
          height: auto; 
          max-height: 85vh; /* PC par screen height ke andar rahega */
          object-fit: contain; 
          box-shadow: 0 0 50px rgba(0,0,0,0.9);
        }

        .inter-btn { background: #0a0a0a; border: 1px solid #222; color: #fff; padding: 12px 25px; border-radius: 4px; cursor: pointer; transition: 0.3s; font-weight: bold; }
        .share-btn:hover { background: #fff; color: #000; }
        .btn-active-like { border-color: #ffcc00; color: #ffcc00; background: rgba(255, 204, 0, 0.05); }
        .btn-active-dislike { border-color: #ff4757; color: #ff4757; }
        
        .floating-nav { position: fixed; bottom: 30px; background: rgba(0,0,0,0.9); padding: 10px 25px; border-radius: 4px; border: 1px solid #ffcc00; display: flex; gap: 20px; align-items: center; left: 50%; transform: translateX(-50%); z-index: 1000; backdrop-filter: blur(10px); }
        .btn-gold-nav { background: #ffcc00; color: #000; border: none; padding: 8px 18px; font-weight: bold; cursor: pointer; }
        .page-indicator { color: #ffcc00; font-family: monospace; font-weight: bold; }
        .btn-post { background: #ffcc00; color: #000; padding: 0 25px; font-weight: bold; cursor: pointer; border: none; }
        
        .comment-card { background: #050505; padding: 15px; border-left: 2px solid #222; margin-bottom: 15px; transition: 0.3s; }
        .comment-card:hover { border-left-color: #ffcc00; background: #080808; }
        .reply-card { margin-left: 20px; margin-top: 10px; padding: 10px; background: #111; border-left: 1px solid #444; }
        .ghost-effect { border-left-style: dashed; opacity: 0.9; }
        
        .comment-actions { display: flex; gap: 15px; margin-top: 10px; border-top: 1px solid #1a1a1a; padding-top: 5px; }
        .action-btn { background: none; border: none; color: #666; font-size: 0.75rem; cursor: pointer; padding: 0; }
        .action-btn:hover { color: #fff; }

        .heart-explosion { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 5rem; z-index: 2000; animation: heart-out 1.5s forwards; pointer-events: none; }
        @keyframes heart-out { 0% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -150%) scale(2); } }
      `}</style>
    </div>
  );
}
