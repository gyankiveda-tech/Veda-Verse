// --- 🇮🇳 MASSIVE INDIAN NAMES POOL (200+ Combinations) ---
const firstNames = [
    "Aarav", "Vihaan", "Vivaan", "Ananya", "Diya", "Advait", "Kabir", "Aryan", "Ishaan", "Arjun", "Saanvi", "Pari", "Kyra", "Anvi", "Aadhya", 
    "Rahul", "Amit", "Sandeep", "Vikram", "Priyanka", "Sneha", "Anjali", "Rohan", "Deepak", "Suresh", "Meera", "Riya", "Aditya", "Tanvi", 
    "Sahil", "Neha", "Varun", "Simran", "Aman", "Shreya", "Kartik", "Abhishek", "Manish", "Divya", "Prateek", "Yash", "Swati", "Karan", 
    "Ishita", "Tushar", "Pooja", "Nikhil", "Siddharth", "Kavya", "Ritu", "Akash", "Preeti", "Sanjay", "Kritika", "Mohit", "Nisha", "Sameer", 
    "Vicky", "Jyoti", "Rajesh", "Komal", "Pankaj", "Bhavna", "Harsh", "Meghna", "Abhay", "Suman", "Sunil", "Lata", "Anil", "Sita", "Gaurav", 
    "Asha", "Vinay", "Radhika", "Sumit", "Kiran", "Vijay", "Shanti", "Mayank", "Mita", "Hemant", "Rekha", "Tarun", "Uma", "Pranay", "Aarti", 
    "Ashok", "Sarla", "Vivek", "Maya", "Alok", "Chitra", "Umesh", "Leela", "Arun", "Savitri", "Nitin", "Kamla", "Pawan", "Durga", "Satish", 
    "Lakshmi", "Brijesh", "Parvati", "Jitendra", "Saraswati", "Dharmendra", "Santosh", "Mukesh", "Pushpa", "Rakesh", "Vidya", "Manoj", "Anju", 
    "Shailesh", "Madhu", "Rajiv", "Gita", "Sanjeev", "Saroj", "Dinesh", "Kusum", "Surendra", "Vimala", "Narendra", "Indira", "Bhupendra", "Usha",
    "Prabhat", "Loki", "Gyan", "Kritik", "Sajal", "Rishabh", "Tanya", "Isha", "Rudra", "Om", "Dev", "Shivansh", "Ishani", "Zoya", "Myra"
];

const lastNames = [
    "Sharma", "Verma", "Gupta", "Singh", "Yadav", "Patel", "Jain", "Reddy", "Iyer", "Nair", "Das", "Dutta", "Chatterjee", "Mishra", "Pandey", 
    "Khan", "Malhotra", "Kapoor", "Chopra", "Mehta", "Bose", "Trivedi", "Pathak", "Srivastava", "Deshmukh", "Choudhary"
];

const usernameSuffixes = [
    "_op", "_veda", "007", "_the_one", ".theory", "_99", "_pro", ".protector", "_glitch", "24", "_shakti", 
    "_monk", "_king", "_vibe", ".live", "_X", "_shadow", ".ai", "_prime", "01"
];

// --- 💬 EMOTIONAL & LOGICAL COMMENT POOLS ---
const starter = [
    "Bhai,", "Yaar,", "Sunno,", "Dekho,", "Wait,", "OMG!", "Kasam se,", "Seriously,", "Unpopular Opinion:", "Mind Blowing!", "Bro,", "Abey,", 
    "Just Wow!", "Khatarnak!", "System hang,", "Kya baat hai,", "Literally,"
];

const middle = [
    "ye multiverse ka concept", "Gyan ka character development", "wo mysterious symbol wala scene", "Original Earth ka khatra", 
    "reality glitch hone ka tareeka", "Physics wale sir ki theory", "quantum theory wala dialogue", "board exams ki tension aur ye sab", 
    "Gyanvardhan ka reaction", "the mark that should not exist", "alternate reality protectors ki entry", "Gyan ka laptop glitch", 
    "reality shifting ka logic", "wo 11 February wali date", "Gyan aur uski maa ka interaction"
];

const ender = [
    "ekdum crazy hai!", "pagle kar dega.", "mujhe sach mein real lag raha hai.", "kaafi deep hai bhai.", "bawal cheez hai.", 
    "dil jeet liya art style ne.", "next level writing hai.", "itna relatable kaise hai?", "tension de raha hai ab toh.", 
    "fire hai! 🔥", "maza aa gaya.", "wait nahi ho raha ab.", "best webcomic in India fr.", "mind = blown 🤯"
];

// --- 🧠 DEEP THEORIES POOL ---
const theories = [
    "Mujhe lagta hai Gyan hi wo symbol create kar raha hai anjaane mein.",
    "Kya 11 Feb ko sach mein portals khulenge? Board exam ke din hi kyun lol.",
    "Symbol gayab nahi hua, wo uski eyes mein chala gaya hai, dhyan se dekho.",
    "Alternate protectors humare beech mein hi hain, ye comic humein warn kar rahi hai.",
    "Wo laptop wala chhed portal ka rasta hai, edit nahi hai wo.",
    "Original Earth shayad destroy ho chuki hai, ye koi simulation hai.",
    "Gyan ka naam 'Gyanvardhan' hai, uska matlab hi hai knowledge barhane wala.",
    "Har panel mein ek hidden symbol hai, kisi ne notice kiya?",
    "Reality has taken its first breath... matlab Earth ab zinda ho gayi hai?",
    "Gyan is not the chosen one, he is the creator of the glitch!",
    "Loki ka character kab aayega? I'm waiting for the duo!",
    "Board exams aur Multiverse war... Gyan ki life toh barbaad hai 😂",
    "The Mark is actually a key to other dimensions."
];

// --- 📚 VOLUME SPECIFIC HYPE ---
export const VOL_CONTEXT = {
    vol1: [
        "Starting bahut solid hai, hook kar diya!",
        "Gyan ka setup ekdum desi superhero vibes deta hai.",
        "School, Coaching aur Multiverse... har Indian student ki story.",
        "Physics sir ka part best tha, ekdum real lagta hai.",
        "We need you - ye sunte hi goosebumps aa gaye.",
        "Laptop wala glitch scene ekdum relatable hai, mera bhi aise hi hota hai!",
        "Original Earth ka concept Marvel se better lag raha hai.",
        "Gyanvardhan ka reaction ekdum natural tha, 'Kaun ho tum?'"
    ],
    vol2: [
        "Part 2 ki pacing bahut tagdi hai!",
        "Symbol ka glow hona aur fir gayab hona... mysterious.",
        "Gyan ko ab training ki zaroorat hai, wo abhi tak darr raha hai.",
        "Panel 12 ka art dekhna, shadows mein koi chhupa hai.",
        "Reality is shifting, Gyan ko jaldi samajhna hoga.",
        "Wo 'The mark that should not exist' wala line epic tha.",
        "Maa ka breakfast ke liye bulana aur wahan itna bada kaand ho jana, relatable level 100!",
        "Iska symbol ab glowing se permanent hone wala hai kya?",
        "Wait, kya Gyan ab school jayega is mark ke saath?"
    ]
};

// --- 🛠 THE INFINITY GENERATOR ENGINE ---
export const generateMassiveComments = (volType, count = 100) => {
    let generated = [];
    
    for (let i = 0; i < count; i++) {
        // 1. Generate Highly Random Indian Username
        const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const suffix = usernameSuffixes[Math.floor(Math.random() * usernameSuffixes.length)];
        
        const nameFormats = [
            `${fName}${suffix}`,
            `${fName}_${lName}`,
            `${fName}${Math.floor(Math.random() * 999)}`,
            `${fName.toLowerCase()}.${lName.toLowerCase()}`,
            `${lName}_${fName}_op`,
            `${fName}_${suffix.replace('_', '')}`
        ];
        const user = nameFormats[Math.floor(Math.random() * nameFormats.length)];

        // 2. Mix Sentence Structures
        const s = starter[Math.floor(Math.random() * starter.length)];
        const m = middle[Math.floor(Math.random() * middle.length)];
        const e = ender[Math.floor(Math.random() * ender.length)];
        const t = theories[Math.floor(Math.random() * theories.length)];
        const c = VOL_CONTEXT[volType] ? VOL_CONTEXT[volType][Math.floor(Math.random() * VOL_CONTEXT[volType].length)] : "Amazing work!";

        const structureOptions = [
            `${s} ${m} ${e}`,
            `${c} ${t}`,
            `${s} ${t}`,
            `${m} ${e} 🔥`,
            `${t} #Vedaverse`,
            `${c} ${e}`,
            `${s} ${c}`,
            `${t}`,
            `${s} ${e}`
        ];

        const text = structureOptions[Math.floor(Math.random() * structureOptions.length)];

        // 3. 📅 FIXED DATE LOGIC: 1st Jan to 19th Jan 2026
        // January 2026 ke dates pick karega
        const start = new Date(2026, 0, 1).getTime(); // 1 Jan 2026
        const end = new Date(2026, 0, 19).getTime();  // 19 Jan 2026
        
        const randomTimestamp = Math.floor(Math.random() * (end - start + 1) + start);
        const pastDate = new Date(randomTimestamp);

        // Ghante aur minute bhi random set kar rahe hain taaki pattern na dikhe
        pastDate.setHours(Math.floor(Math.random() * 24));
        pastDate.setMinutes(Math.floor(Math.random() * 60));

        generated.push({
            userName: user,
            text: text,
            createdAt: pastDate, // Yeh ab Javascript Date Object hai
            isFake: true,
            likes: Math.floor(Math.random() * 50)
        });
    }

    // Sort by date: Naya comment pehle dikhega
    return generated.sort((a, b) => b.createdAt - a.createdAt);
};
