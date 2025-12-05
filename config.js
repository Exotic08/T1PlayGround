// config.js

// 1. CẤU HÌNH FIREBASE
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

try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    window.db = firebase.database();
} catch (e) {
    console.error("Firebase Init Error:", e);
}

// 2. DANH SÁCH THÀNH TỰU
window.LIST_ACH = [
    { id: 'win1', title: 'Tân Binh', desc: 'Thắng trận đầu tiên', stars: 1, icon: '🐣' },
    { id: 'win10', title: 'Chuyên Gia', desc: 'Thắng 10 trận', stars: 2, icon: '💣' },
    { id: 'speed60', title: 'Thần Tốc', desc: 'Thắng dưới 60 giây', stars: 3, icon: '⚡' },
    { id: 'num5', title: 'Tử Thần', desc: 'Mở ô số 5', stars: 2, icon: '💀' },
    { id: 'boss_slayer', title: 'Dũng Sĩ Diệt Boss', desc: 'Đánh bại Boss (Giải trí)', stars: 3, icon: '👹' }
];

// 3. DANH SÁCH SKIN
window.SKINS = [
    { id: 'default', name: 'Hiện Đại (Mặc định)', desc: 'Giao diện tối chuẩn', color: '#1e293b' },
    { id: 'classic', name: 'Windows 98', desc: 'Phong cách cổ điển', color: '#c0c0c0' },
    { id: 'pink',    name: 'Giấc Mơ Hồng', desc: 'Dễ thương', color: '#fce7f3' }
];

// 4. LOGIC CHUNG
window.checkLogin = function() {
    const user = localStorage.getItem('ms_user');
    if (user) return user;
    if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
        window.location.href = 'index.html';
    }
    return null;
}

window.App = window.App || {};

window.App.unlockAch = (id) => {
    const user = localStorage.getItem('ms_user');
    if(user) {
        db.ref('users/' + user + '/achievements/' + id).once('value', snap => {
            if (!snap.exists()) {
                db.ref('users/' + user + '/achievements/' + id).set(true);
                const ach = window.LIST_ACH.find(a => a.id === id);
                if(ach) showGlobalToast(ach.title);
            }
        });
    }
};

// --- HÀM SKIN (QUAN TRỌNG) ---
// Hàm này sẽ được gọi từ các file html chơi game
window.App.applySkin = () => {
    const skin = localStorage.getItem('ms_skin') || 'default';
    const board = document.getElementById('board-container');
    
    // Chỉ áp dụng nếu tìm thấy bàn cờ (tức là đang ở trang chơi game)
    if (board) {
        // Reset class
        board.classList.remove('skin-default', 'skin-classic', 'skin-pink');
        
        // Apply class mới
        if (skin !== 'default') {
            board.classList.add('skin-' + skin);
        }
        console.log("Đã áp dụng Skin:", skin);
    }
    return skin;
};

function showGlobalToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) { 
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = "position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#10b981; color:white; padding:12px 24px; border-radius:50px; z-index:9999; font-weight:bold; display:none";
        document.body.appendChild(toast);
    }
    toast.innerHTML = `🏆 Mở khóa: ${msg}`;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}
