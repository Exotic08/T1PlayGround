// config.js
const firebaseConfig = {
    apiKey: "AIzaSyDXn3IK3Td2WyegZkU0m1hESQQSRLM1Zb8",
    authDomain: "minesweeper-a7423.firebaseapp.com",
    databaseURL: "https://minesweeper-a7423-default-rtdb.firebaseio.com",
    projectId: "minesweeper-a7423",
    storageBucket: "minesweeper-a7423.firebasestorage.app",
    messagingSenderId: "305681879682",
    appId: "1:305681879682:web:31f1a90362b20b06cbda9b",
    measurementId: "G-XBJQF7Q242"
};

// Khởi tạo Firebase
try {
    firebase.initializeApp(firebaseConfig);
    window.db = firebase.database();
    console.log("Firebase Connected");
} catch (e) {
    console.error("Firebase Error:", e);
}

// Hàm kiểm tra đăng nhập
function checkLogin() {
    const user = localStorage.getItem('ms_user');
    if (user) {
        return user;
    } else {
        window.location.href = 'index.html';
        return null;
    }
}

// Seeded Random cho PvP
class SeededRandom {
    constructor(seed) { this.seed = seed; }
    next() {
        var t = this.seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}
