// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
// พี่ใส่ 'export' ไว้ข้างหน้าเพื่อให้ไฟล์อื่นเรียกใช้ได้
export const firebaseConfig = {
  apiKey: "AIzaSyDisD7UHc3OARcneQSV3nPXTqbcmPoith8",
  authDomain: "de-path-d0d15.firebaseapp.com",
  projectId: "de-path-d0d15",
  storageBucket: "de-path-d0d15.firebasestorage.app",
  messagingSenderId: "912797166743",
  appId: "1:912797166743:web:6c2949b9aaecd23fea4dd2",
  measurementId: "G-NL35T7XMK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export 'auth' ออกไปด้วย เผื่อไฟล์อื่นเรียกใช้แบบสั้นๆ
export const auth = getAuth(app);