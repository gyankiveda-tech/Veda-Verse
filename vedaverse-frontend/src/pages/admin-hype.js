import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
    collection, addDoc, doc, updateDoc, increment, 
    getDoc, setDoc, getDocs, writeBatch, query, limit 
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { generateMassiveComments } from '../lib/ghostData';

export default function AdminHype() {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [volume, setVolume] = useState('vol1');
    const [count, setCount] = useState(10);
    const [status, setStatus] = useState('');
    const [isAutoBoosting, setIsAutoBoosting] = useState(false);
    const [isInjecting, setIsInjecting] = useState(false);
    
    const stopSignal = useRef(false);
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

    // --- 🤖 AUTO-HYPE ENGINE ---
    useEffect(() => {
        let interval;
        if (isAutoBoosting) {
            setStatus(`🔴 ENGINE ACTIVE: Injecting signals into ${volume.toUpperCase()}...`);
            interval = setInterval(async () => {
                const statsRef = doc(db, `${volume}_data`, "stats");
                try {
                    await updateDoc(statsRef, {
                        views: increment(Math.floor(Math.random() * 5) + 1),
                        likes: increment(Math.random() > 0.85 ? 1 : 0)
                    });
                } catch (e) {
                    await setDoc(statsRef, { likes: 1, dislikes: 0, views: 10 }, { merge: true });
                }
            }, 15000); 
        } else {
            setStatus("⚪ Engine Standby.");
        }
        return () => clearInterval(interval);
    }, [isAutoBoosting, volume]);

    // --- 🚀 MASSIVE COMMENT INJECTOR (DATE FIX APPLIED) ---
    const injectHype = async () => {
        const totalToInject = parseInt(count);
        if (totalToInject > 100 && !confirm(`Confirm: Injecting ${totalToInject} comments with PAST dates?`)) return;
        
        setIsInjecting(true);
        stopSignal.current = false;
        setStatus(`🚀 Starting injection of ${totalToInject} signals...`);

        try {
            const fakeComments = generateMassiveComments(volume, totalToInject);
            const colName = `${volume}_comments`;
            let successCount = 0;

            for (const comment of fakeComments) {
                if (stopSignal.current) {
                    setStatus(`🛑 TERMINATED: Killed at ${successCount} units.`);
                    setIsInjecting(false);
                    return;
                }

                // FIXED: 'serverTimestamp()' ko hatakar 'comment.createdAt' bhej rahe hain
                await addDoc(collection(db, colName), {
                    userName: comment.userName,
                    text: comment.text,
                    isFake: true, 
                    likes: comment.likes || 0,
                    createdAt: comment.createdAt // Yeh ghostData se aayi hui random date lega
                });
                
                successCount++;
                if (successCount % 10 === 0) setStatus(`📡 Injected: ${successCount}/${totalToInject}...`);
            }
            setStatus(`✅ COMPLETE: ${totalToInject} signals active with unique past dates.`);
        } catch (error) {
            console.error(error);
            setStatus("❌ CRITICAL ERROR: Injection failed.");
        }
        setIsInjecting(false);
    };

    const terminateInjection = () => {
        stopSignal.current = true;
        setStatus("⚠️ Sending kill signal...");
    };

    // --- 🗑 SMART WIPE ---
    const clearDatabase = async () => {
        const check = confirm(`DANGER: This will wipe ALL comments in ${volume}. Proceed?`);
        if (!check) return;

        setStatus("🧹 Initializing Deep Clean...");
        const colName = `${volume}_comments`;
        
        try {
            let deletedTotal = 0;
            while (true) {
                const q = query(collection(db, colName), limit(400)); 
                const snapshot = await getDocs(q);
                if (snapshot.size === 0) break;

                const batch = writeBatch(db);
                snapshot.docs.forEach((doc) => {
                    batch.delete(doc.ref);
                });

                await batch.commit();
                deletedTotal += snapshot.size;
                setStatus(`🧹 Wiping... Deleted ${deletedTotal} so far.`);
            }
            setStatus(`✨ SUCCESS: Database Purged. Total ${deletedTotal} comments removed.`);
        } catch (error) {
            console.error(error);
            setStatus("❌ WIPE ERROR: Firebase denied the request.");
        }
    };

    // --- ⚡ STATS OVERRIDE ---
    const updateStats = async (type, amount) => {
        setStatus(`⚡ Modifying ${type} in ${volume}...`);
        const statsRef = doc(db, `${volume}_data`, "stats");
        try {
            await updateDoc(statsRef, { [type]: increment(amount) });
            setStatus(`✨ ${type.toUpperCase()} Updated.`);
        } catch (error) {
            setStatus("❌ Error: Stat update failed.");
        }
    };

    if (loading) return <div className="admin-loading">BOOTING_GOD_MODE...</div>;
    if (!isAdmin) return null;

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>🛠 VEDAVERSE GOD MODE</h1>
                <div className="status-bar">
                    <span>ADMIN: {user.email}</span>
                    <span>SYSTEM_READY</span>
                </div>
            </header>

            <div className="control-panel">
                <section className="card highlight">
                    <h3>1. TARGET COLLECTION</h3>
                    <select value={volume} onChange={(e) => setVolume(e.target.value)}>
                        <option value="vol1">VOLUME 1 (GYAN KI VEDA)</option>
                        <option value="vol2">VOLUME 2 (THE AWAKENING)</option>
                    </select>
                </section>

                <section className={`card engine-card ${isAutoBoosting ? 'active-glow' : ''}`}>
                    <h3>🤖 AUTO-GROWTH ENGINE</h3>
                    <button onClick={() => setIsAutoBoosting(!isAutoBoosting)} className={isAutoBoosting ? 'btn-stop' : 'btn-start'}>
                        {isAutoBoosting ? "OFFLINE ENGINE" : "ONLINE ENGINE"}
                    </button>
                </section>

                <section className="card">
                    <h3>3. STATS INJECTION</h3>
                    <div className="btn-group">
                        <button onClick={() => updateStats('views', 500)}>+500 Views</button>
                        <button onClick={() => updateStats('views', 1000)}>+1K Views</button>
                    </div>
                </section>

                <section className="card">
                    <h3>4. MASS COMMENT INJECTION</h3>
                    <div className="input-row">
                        <input type="number" value={count} onChange={(e) => setCount(e.target.value)} />
                        {!isInjecting ? (
                            <button onClick={injectHype} className="btn-inject">EXECUTE</button>
                        ) : (
                            <button onClick={terminateInjection} className="btn-stop">TERMINATE</button>
                        )}
                    </div>
                </section>

                <section className="card">
                    <h3>5. SENTIMENT CONTROL</h3>
                    <div className="btn-group">
                        <button onClick={() => updateStats('likes', 50)}>+50 👍</button>
                        <button className="btn-dis" onClick={() => updateStats('dislikes', 10)}>+10 👎</button>
                    </div>
                </section>

                <section className="card danger-zone">
                    <h3>🚨 SYSTEM PURGE</h3>
                    <p>Wipe all signals from current collection.</p>
                    <button onClick={clearDatabase} className="btn-purge">WIPE ALL COMMENTS</button>
                </section>
            </div>

            <div className="console-output">
                <p className="status-msg">{`>> ${status}`}</p>
            </div>

            <style jsx>{`
                .admin-container { background: #000; color: #ffcc00; min-height: 100vh; padding: 40px; font-family: 'Courier New', monospace; }
                .admin-header { border-bottom: 2px solid #ffcc00; margin-bottom: 30px; }
                .status-bar { display: flex; justify-content: space-between; color: #00ff00; font-size: 0.8rem; }
                .control-panel { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
                .card { background: #0a0a0a; padding: 20px; border: 1px solid #222; border-radius: 4px; }
                .highlight { border-color: #ffcc00; }
                .danger-zone { border: 1px solid #ff4757; }
                .active-glow { border-color: #00ff00; box-shadow: 0 0 15px rgba(0, 255, 0, 0.2); }
                select, input { background: #111; border: 1px solid #333; color: #ffcc00; padding: 12px; width: 100%; margin: 10px 0; }
                button { background: #ffcc00; color: #000; border: none; padding: 12px; font-weight: bold; cursor: pointer; }
                .btn-start { background: #00ff00; width: 100%; }
                .btn-stop { background: #ff4757; color: #fff; width: 100%; }
                .btn-inject { background: #ffcc00; color: #000; width: 100%; }
                .btn-purge { background: #ff4757; color: #fff; width: 100%; }
                .btn-group { display: flex; gap: 10px; }
                .btn-dis { background: #222; color: #ff4757; border: 1px solid #ff4757; }
                .input-row { display: flex; gap: 10px; }
                .console-output { margin-top: 40px; background: #050505; border: 1px dashed #333; padding: 15px; }
                .status-msg { color: #00ff00; margin: 0; }
            `}</style>
        </div>
    );
}
