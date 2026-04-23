import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// WARNING: This configuration is exposed on the client-side.
// For improved security in a production environment, consider using a backend proxy 
// or environment variables with a build process.
const firebaseConfig = {
    apiKey: "AIzaSyDisD7UHc3OARcneQSV3nPXTqbcmPoith8",
    authDomain: "de-path-d0d15.firebaseapp.com",
    projectId: "de-path-d0d15",
    storageBucket: "de-path-d0d15.firebasestorage.app",
    messagingSenderId: "912797166743",
    appId: "1:912797166743:web:6c2949b9aaecd23fea4dd2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let isLoginMode = true;

// Make functions globally accessible so HTML onclick handlers can find them
window.toggleMode = function() {
    isLoginMode = !isLoginMode;
    const title = document.getElementById('auth-title');
    const desc = document.getElementById('auth-desc');
    const btn = document.getElementById('main-btn');
    const toggleText = document.getElementById('toggle-link');

    if (isLoginMode) {
        title.innerText = "LOGIN";
        desc.innerText = "ยืนยันตัวตนเพื่อเข้าสู่ระบบ";
        btn.innerText = "GO";
        toggleText.innerHTML = 'ยังไม่มีบัญชี? <span style="color: #ff4d4d;">ลงทะเบียนที่นี่</span>';
    } else {
        title.innerText = "REGISTER";
        desc.innerText = "สร้างบัญชีใหม่";
        btn.innerText = "SUBMIT";
        toggleText.innerHTML = 'มีบัญชีแล้ว? <span style="color: #ff4d4d;">เข้าสู่ระบบที่นี่</span>';
    }
};

window.handleSubmit = async function() {
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('pass').value.trim();

    if (!email || !pass) {
        alert("กรอกข้อมูลให้ครบก่อน Nas!");
        return;
    }

    try {
        if (isLoginMode) {
            await signInWithEmailAndPassword(auth, email, pass);
            console.log("Login Success!");
        } else {
            await createUserWithEmailAndPassword(auth, email, pass);
            console.log("Register Success!");
        }
        
        localStorage.setItem('dePath_user', email);
        
        console.log("Redirecting to index.html...");
        window.location.assign('index.html');

    } catch (error) {
        console.error("Auth Error:", error.code);
        let msg = "เกิดข้อผิดพลาด!";
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') msg = "อีเมลหรือรหัสผ่านผิด!";
        if (error.code === 'auth/weak-password') msg = "รหัสผ่านต้องมี 6 ตัวขึ้นไป!";
        if (error.code === 'auth/email-already-in-use') msg = "อีเมลนี้มีคนใช้แล้ว!";
        alert("❌ " + msg);
    }
};
