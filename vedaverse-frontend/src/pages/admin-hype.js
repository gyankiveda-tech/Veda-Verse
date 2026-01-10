import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { generateMassiveComments } from '../lib/ghostData';

export default function AdminHype() {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [volume, setVolume] = useState('vol1');
    const [count, setCount] = useState(10);
    const [status, setStatus] = useState('');
    const [isAutoBoosting, setIsAutoBoosting] = useState(false); // Engine Switch State
    const router = useRouter();

    const ADMIN_EMAIL = "prabhatsinghjsr75@gmail.com"; 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser && currentUser.email === ADMIN_EMAIL) {
                setUser(currentUser);
                setIsAdmin(true);
            } else {
                router.push('/'); 
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    // --- 🤖 AUTO-HYPE ENGINE LOGIC ---
    useEffect(() => {
        let interval;
        if (isAutoBoosting) {
            setStatus(`🔴 ENGINE ACTIVE: Boosting ${volume} naturally...`);
            interval = setInterval(async () => {
                const statsRef = doc(db, `${volume}_data`, "stats");
                
                // Random values for natural look
                const randomViews = Math.floor(Math.random() * 7) + 2; // 2 to 8 views
                const chanceOfLike = Math.random() > 0.8 ? 1 : 0; // 20% chance of a random like

                try {
                    await updateDoc(statsRef, {
                        views: increment(randomViews),
                        likes: increment(chanceOfLike)
                    });
                } catch (e) {
                    console.error("Engine Error:", e);
                }
            }, 12000); // Har 12 second mein injection
        } else {
            setStatus("⚪ Engine Standby.");
        }
        return () => clearInterval(interval);
    }, [isAutoBoosting, volume]);

    // --- MASSIVE COMMENT INJECTOR ---
    const injectHype = async () => {
        setStatus(`🚀 Commencing injection of ${count} Indian users into ${volume}...`);
        try {
            const fakeComments = generateMassiveComments(volume, parseInt(count));
            const colName = `${volume}_comments`;
            for (const comment of fakeComments) {
                await addDoc(collection(db, colName), comment);
            }
            setStatus(`✅ Mission AccomplISHED! ${count} organic comments added.`);
        } catch (error) {
            console.error(error);
            setStatus("❌ Error: Check Firebase permissions.");
        }
    };

    // --- STATS MANIPULATOR ---
    const updateStats = async (type, amount) => {
        setStatus(`⚡ Updating ${type} by ${amount}...`);
        const statsRef = doc(db, `${volume}_data`, "stats");
        try {
            const snap = await getDoc(statsRef);
            if (!snap.exists()) {
                await setDoc(statsRef, { likes: 0, dislikes: 0, views: amount }, {merge: true});
            } else {
                await updateDoc(statsRef, { [type]: increment(amount) });
            }
            setStatus(`✨ ${type.toUpperCase()} boosted by ${amount}!`);
        } catch (error) {
            console.error(error);
            setStatus("❌ Stat update failed.");
        }
    };

    if (loading) return <div className="admin-loading">Checking Identity...</div>;
    if (!isAdmin) return null;

    return (
        <div className="admin-container">
            <h1>🛠 VEDAVERSE GOD MODE</h1>
            <p className="user-badge">Authenticated Commander: {user.email}</p>

            <div className="control-panel">
                {/* 1. VOLUME SELECTION */}
                <section className="card">
                    <h3>1. Target Timeline</h3>
                    <select value={volume} onChange={(e) => setVolume(e.target.value)}>
                        <option value="vol1">Volume 1 (Gyan Ki Veda)</option>
                        <option value="vol2">Volume 2 (The Awakening)</option>
                    </select>
                </section>

                {/* 2. THE AUTO-ENGINE SWITCH */}
                <section className="card engine-card">
                    <h3>🤖 24/7 AUTO-HYPE ENGINE</h3>
                    <p>Dheere-dheere views aur likes badhata rahega.</p>
                    <button 
                        onClick={() => setIsAutoBoosting(!isAutoBoosting)} 
                        className={isAutoBoosting ? 'btn-stop' : 'btn-start'}
                    >
                        {isAutoBoosting ? "STOP AUTO-BOOST" : "START AUTO-BOOST"}
                    </button>
                </section>

                {/* 3. VIEWS BOOSTER */}
                <section className="card">
                    <h3>3. Instant Views (Manual)</h3>
                    <div className="btn-group">
                        <button onClick={() => updateStats('views', 1000)} style={{background: '#00d1ff', color: '#000'}}>+1K</button>
                        <button onClick={() => updateStats('views', 5000)} style={{background: '#00d1ff', color: '#000'}}>+5K</button>
                    </div>
                </section>

                {/* 4. COMMENTS INJECTOR */}
                <section className="card">
                    <h3>4. Ghost Transmission</h3>
                    <input 
                        type="number" 
                        value={count} 
                        onChange={(e) => setCount(e.target.value)}
                        placeholder="Amount..."
                    />
                    <button onClick={injectHype} className="btn-inject">RUN MASS INJECTION</button>
                </section>

                {/* 5. LIKES/DISLIKES */}
                <section className="card">
                    <h3>5. Engagement Control</h3>
                    <div className="btn-group">
                        <button onClick={() => updateStats('likes', 100)}>+100 👍</button>
                        <button className="btn-dis" onClick={() => updateStats('dislikes', 10)}>+10 👎</button>
                    </div>
                </section>
            </div>

            <p className="status-msg">SYSTEM STATUS: {status}</p>

            <style jsx>{`
                .admin-container { background: #000; color: #ffcc00; min-height: 100vh; padding: 50px; font-family: 'Courier New', monospace; }
                h1 { border-bottom: 2px solid #ffcc00; padding-bottom: 10px; }
                .user-badge { color: #00ff00; margin-bottom: 30px; }
                .control-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .card { background: #0a0a0a; padding: 20px; border: 1px solid #222; border-radius: 8px; }
                .engine-card { border: 1px solid #00ff00; box-shadow: 0 0 10px rgba(0, 255, 0, 0.1); }
                
                select, input { background: #000; border: 1px solid #ffcc00; color: #fff; padding: 10px; margin-bottom: 10px; width: 100%; }
                button { background: #ffcc00; color: #000; border: none; padding: 12px; font-weight: bold; cursor: pointer; text-transform: uppercase; transition: 0.3s; }
                
                .btn-start { background: #00ff00; width: 100%; }
                .btn-stop { background: #ff4757; color: #fff; width: 100%; }
                .btn-inject { background: #ff4757; color: #fff; width: 100%; }
                .btn-dis { background: #333; color: #ff4757; border: 1px solid #ff4757; }
                .btn-group { display: flex; gap: 10px; }
                
                .status-msg { margin-top: 30px; color: #00ff00; background: #111; padding: 15px; border-radius: 4px; border-left: 5px solid #00ff00; }
                @media (max-width: 768px) { .control-panel { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
}
