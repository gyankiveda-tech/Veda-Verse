// --- MASSIVE INDIAN NAMES POOL (150+ Names) ---
const firstNames = [
    "Aarav", "Vihaan", "Vivaan", "Ananya", "Diya", "Advait", "Kabir", "Aryan", "Ishaan", "Arjun", "Saanvi", "Pari", "Kyra", "Anvi", "Aadhya", 
    "Rahul", "Amit", "Sandeep", "Vikram", "Priyanka", "Sneha", "Anjali", "Rohan", "Deepak", "Suresh", "Meera", "Riya", "Aditya", "Tanvi", 
    "Sahil", "Neha", "Varun", "Simran", "Aman", "Shreya", "Kartik", "Abhishek", "Manish", "Divya", "Prateek", "Yash", "Swati", "Karan", 
    "Ishita", "Tushar", "Pooja", "Nikhil", "Siddharth", "Kavya", "Ritu", "Akash", "Preeti", "Sanjay", "Kritika", "Mohit", "Nisha", "Sameer", 
    "Vicky", "Jyoti", "Rajesh", "Komal", "Pankaj", "Bhavna", "Harsh", "Meghna", "Abhay", "Suman", "Sunil", "Lata", "Anil", "Sita", "Gaurav", 
    "Asha", "Vinay", "Radhika", "Sumit", "Kiran", "Vijay", "Shanti", "Mayank", "Mita", "Hemant", "Rekha", "Tarun", "Uma", "Pranay", "Aarti", 
    "Ashok", "Sarla", "Vivek", "Maya", "Alok", "Chitra", "Umesh", "Leela", "Arun", "Savitri", "Nitin", "Kamla", "Pawan", "Durga", "Satish", 
    "Lakshmi", "Brijesh", "Parvati", "Jitendra", "Saraswati", "Dharmendra", "Santosh", "Mukesh", "Pushpa", "Rakesh", "Vidya", "Manoj", "Anju", 
    "Shailesh", "Madhu", "Rajiv", "Gita", "Sanjeev", "Saroj", "Dinesh", "Kusum", "Surendra", "Vimala", "Narendra", "Indira", "Bhupendra", "Usha"
];

const lastNames = ["Sharma", "Verma", "Gupta", "Singh", "Yadav", "Patel", "Jain", "Reddy", "Iyer", "Nair", "Das", "Dutta", "Chatterjee", "Mishra", "Pandey", "Khan", "Malhotra", "Kapoor", "Chopra", "Mehta"];

const usernameSuffixes = ["_op", "_veda", "007", "_the_one", ".theory", "_99", "_pro", ".protector", "_glitch", "24", "_shakti", "_monk", "_king", "_vibe"];

// --- RE-STRUCTURED COMMENT POOLS FOR MAXIMUM PROBABILITY ---
const starter = ["Bhai,", "Yaar,", "Sunno,", "Dekho,", "Wait,", "OMG!", "Kasam se,", "Seriously,", "Unpopular Opinion:", "Mind Blowing!", "Bro,", "Abey,", "Just Wow!"];

const middle = [
    "ye multiverse ka concept", "Gyan ka character development", "wo mysterious symbol wala scene", "Original Earth ka khatra", 
    "reality glitch hone ka tareeka", "Physics wale sir ki theory", "quantum theory wala dialogue", "board exams ki tension aur ye sab", 
    "Gyanvardhan ka reaction", "the mark that should not exist", "alternate reality protectors ki entry"
];

const ender = [
    "ekdum crazy hai!", "pagle kar dega.", "mujhe sach mein real lag raha hai.", "kaafi deep hai bhai.", "bawal cheez hai.", 
    "dil jeet liya art style ne.", "next level writing hai.", "itna relatable kaise hai?", "tension de raha hai ab toh.", "fire hai! 🔥"
];

const theories = [
    "Mujhe lagta hai Gyan hi wo symbol create kar raha hai anjaane mein.",
    "Kya 11 Feb ko sach mein portals khulenge? Board exam ke din hi kyun lol.",
    "Symbol gayab nahi hua, wo uski eyes mein chala gaya hai, dhyan se dekho.",
    "Alternate protectors humare beech mein hi hain, ye comic humein warn kar rahi hai.",
    "Wo laptop wala chhed portal ka rasta hai, edit nahi hai wo.",
    "Original Earth shayad destroy ho chuki hai, ye koi simulation hai.",
    "Gyan ka naam 'Gyanvardhan' hai, uska matlab hi hai knowledge barhane wala.",
    "Har panel mein ek hidden symbol hai, kisi ne notice kiya?",
    "Reality has taken its first breath... matlab Earth ab zinda ho gayi hai?"
];

// Volume Specific Hype
export const VOL_CONTEXT = {
    vol1: [
        "Starting bahut solid hai, hook kar diya!",
        "Gyan ka setup ekdum desi superhero vibes deta hai.",
        "School, Coaching aur Multiverse... har Indian student ki story.",
        "Physics sir ka part best tha, ekdum real lagta hai.",
        "We need you - ye sunte hi rone ka mann kar gaya."
    ],
    vol2: [
        "Part 2 ki pacing bahut tagdi hai!",
        "Symbol ka glow hona aur fir gayab hona... mysterious.",
        "Gyan ko ab training ki zaroorat hai, wo abhi tak darr raha hai.",
        "Panel 12 ka art dekhna, shadows mein koi chhupa hai.",
        "Reality is shifting, Gyan ko jaldi samajhna hoga."
    ]
};

// --- THE INFINITY GENERATOR ---
export const generateMassiveComments = (volType, count = 100) => {
    let generated = [];
    
    for (let i = 0; i < count; i++) {
        // 1. Generate Highly Random Indian Username
        const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const suffix = usernameSuffixes[Math.floor(Math.random() * usernameSuffixes.length)];
        
        // Randomly choose between Name+Suffix, Name+LastName, or just Name+Number
        const nameFormats = [
            `${fName}${suffix}`,
            `${fName}_${lName}`,
            `${fName}${Math.floor(Math.random() * 999)}`,
            `${fName}.${lName}${suffix}`,
            `${lName}_${fName}_op`
        ];
        const user = nameFormats[Math.floor(Math.random() * nameFormats.length)];

        // 2. Mix Sentence Structures for Maximum Variety
        const s = starter[Math.floor(Math.random() * starter.length)];
        const m = middle[Math.floor(Math.random() * middle.length)];
        const e = ender[Math.floor(Math.random() * ender.length)];
        const t = theories[Math.floor(Math.random() * theories.length)];
        const c = VOL_CONTEXT[volType][Math.floor(Math.random() * VOL_CONTEXT[volType].length)];

        const structureOptions = [
            `${s} ${m} ${e}`,
            `${c} ${t}`,
            `${s} ${t}`,
            `${m} ${e} 🔥`,
            `${t} #Vedaverse`,
            `${c} ${e}`,
            `${s} ${c}`
        ];

        const text = structureOptions[Math.floor(Math.random() * structureOptions.length)];

        // 3. Random Past Date (Within last 5 days)
        const randomDaysAgo = Math.floor(Math.random() * 5);
        const randomHoursAgo = Math.floor(Math.random() * 23);
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - randomDaysAgo);
        pastDate.setHours(pastDate.getHours() - randomHoursAgo);

        generated.push({
            userName: user,
            text: text,
            createdAt: pastDate,
            isFake: true
        });
    }
    return generated;
};