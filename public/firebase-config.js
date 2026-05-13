import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDisD7UHc3OARcneQSV3nPXTqbcmPoith8",
  authDomain: "de-path-d0d15.firebaseapp.com",
  projectId: "de-path-d0d15",
  storageBucket: "de-path-d0d15.firebasestorage.app",
  messagingSenderId: "912797166743",
  appId: "1:912797166743:web:6c2949b9aaecd23fea4dd2",
  databaseURL: "https://de-path-d0d15-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
