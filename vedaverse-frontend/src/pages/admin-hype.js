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

    // --- MASSIVE COMMENT INJECTOR ---
    const injectHype = async () => {
        setStatus(`🚀 Commencing injection of ${count} Indian users into ${volume}...`);
        try {
            const fakeComments = generateMassiveComments(volume, parseInt(count));
            const colName = `${volume}_comments`;

            for (const comment of fakeComments) {
                await addDoc(collection(db, colName), comment);
            }
            setStatus(`✅ Mission Accomplished! ${count} organic comments added.`);
        } catch (error) {
            console.error(error);
            setStatus("❌ Error: Check Firebase permissions.");
        }
    };

    // --- STATS MANIPULATOR (Likes, Dislikes, Views) ---
    const updateStats = async (type, amount) => {
        setStatus(`⚡ Updating ${type} by ${amount}...`);
        const statsRef = doc(db, `${volume}_data`, "stats");
        try {
            const snap = await getDoc(statsRef);
            if (!snap.exists()) {
                await setDoc(statsRef, { 
                    likes: type === 'likes' ? amount : 0, 
                    dislikes: type === 'dislikes' ? amount : 0,
                    views: type === 'views' ? amount : 0
                });
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
                <section className="card">
                    <h3>1. Select Target Volume</h3>
                    <select value={volume} onChange={(e) => setVolume(e.target.value)}>
                        <option value="vol1">Volume 1 (Gyan Ki Veda)</option>
                        <option value="vol2">Volume 2 (The Awakening)</option>
                    </select>
                </section>

                <section className="card">
                    <h3>2. Views Booster (Popularity)</h3>
                    <div className="btn-group">
                        <button onClick={() => updateStats('views', 1000)} style={{background: '#00d1ff', color: '#000'}}>+1000 VIEWS</button>
                        <button onClick={() => updateStats('views', 5000)} style={{background: '#00d1ff', color: '#000'}}>+5000 VIEWS</button>
                        <button onClick={() => updateStats('views', 10000)} style={{background: '#00d1ff', color: '#000'}}>+10K VIEWS</button>
                    </div>
                </section>

                <section className="card">
                    <h3>3. Ghost Transmission (Comments)</h3>
                    <input 
                        type="number" 
                        value={count} 
                        onChange={(e) => setCount(e.target.value)}
                        placeholder="Enter amount (e.g. 500)"
                    />
                    <button onClick={injectHype} className="btn-inject">RUN MASS INJECTION</button>
                </section>

                <section className="card">
                    <h3>4. Likes Manipulation</h3>
                    <div className="btn-group">
                        <button onClick={() => updateStats('likes', 50)}>+50</button>
                        <button onClick={() => updateStats('likes', 100)}>+100</button>
                        <button onClick={() => updateStats('likes', 500)}>+500</button>
                    </div>
                </section>

                <section className="card">
                    <h3>5. Dislikes (For Realism)</h3>
                    <div className="btn-group">
                        <button className="btn-dis" onClick={() => updateStats('dislikes', 10)}>+10 Dislikes</button>
                        <button className="btn-dis" onClick={() => updateStats('dislikes', 50)}>+50 Dislikes</button>
                    </div>
                </section>
            </div>

            <p className="status-msg">SYSTEM STATUS: {status}</p>

            <style jsx>{`
                .admin-container { background: #000; color: #ffcc00; min-height: 100vh; padding: 50px; font-family: 'Courier New', monospace; }
                h1 { border-bottom: 2px solid #ffcc00; padding-bottom: 10px; text-shadow: 0 0 10px #ffcc00; }
                .user-badge { color: #00ff00; margin-bottom: 30px; }
                .control-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
                .card { background: #0a0a0a; padding: 25px; border: 1px solid #222; border-radius: 8px; }
                section { display: flex; flex-direction: column; gap: 10px; }
                select, input { background: #000; border: 1px solid #ffcc00; color: #fff; padding: 12px; font-size: 1rem; }
                button { background: #ffcc00; color: #000; border: none; padding: 12px; font-weight: bold; cursor: pointer; text-transform: uppercase; transition: 0.2s; }
                button:hover { background: #fff; transform: scale(1.02); }
                .btn-inject { background: #ff4757; color: #fff; font-size: 1.2rem; margin-top: 10px; }
                .btn-dis { background: #333; color: #ff4757; border: 1px solid #ff4757; }
                .btn-group { display: flex; gap: 10px; flex-wrap: wrap; }
                .status-msg { margin-top: 30px; color: #00ff00; background: #111; padding: 15px; border-radius: 4px; border-left: 5px solid #00ff00; }
                @media (max-width: 768px) { .control-panel { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
}