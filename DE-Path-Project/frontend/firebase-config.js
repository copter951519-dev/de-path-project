// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
const analytics = getAnalytics(app);  