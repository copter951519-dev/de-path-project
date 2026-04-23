
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const userDisplay = document.getElementById('user-email-display');
const logoutButton = document.getElementById('logout-button');

// --- Firebase Auth State Change ---
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Firebase auth state: User is logged in.", user);
    if (userDisplay) {
      userDisplay.textContent = `Logged in as: ${user.email}`;
    }
    localStorage.setItem('dePath_user', user.email);
  } else {
    console.log("Firebase auth state: User is not logged in. Redirecting to login.html");
    const currentPage = window.location.pathname;
    if (!currentPage.endsWith('login.html') && !currentPage.endsWith('register.html') && !currentPage.endsWith('index.html') && !currentPage.endsWith('/')) {
        window.location.href = 'login.html';
    }
  }
});

// --- Logout Functionality ---
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        signOut(auth).then(() => {
            console.log('User signed out successfully.');
            localStorage.removeItem('dePath_user');
            window.location.href = 'login.html';
        }).catch((error) => {
            console.error('Sign out error', error);
        });
    });
}

// --- Survey Logic (NEW) ---
const surveyContainer = document.getElementById('survey-container');

if (surveyContainer) {
    const questions = [
        { text: "ชอบคำนวณโครงสร้างตึก/สะพาน (แรงกด-แรงดึง) ไหม?", career: "Civil" },
        { text: "สนุกกับการต่อวงจรไฟฟ้า หรือเขียนโปรแกรมควบคุมหุ่นยนต์?", career: "Electrical" },
        { text: "สนใจกระบวนการผลิตในโรงงาน การปรับปรุงประสิทธิภาพสายการผลิต?", career: "Industrial" },
        { text: "ชอบเขียนโค้ด สร้างเว็บ/แอป หรือวิเคราะห์ข้อมูล?", career: "Computer" },
        { text: "สนใจการออกแบบผลิตภัณฑ์ การใช้งานง่าย (UX/UI)?", career: "Design" },
        { text: "ชอบวางแผน จัดการโครงการให้สำเร็จลุล่วงตามเป้าหมาย?", career: "Management" }
    ];

    let currentQuestionIndex = 0;
    const scores = {
        Civil: 0,
        Electrical: 0,
        Industrial: 0,
        Computer: 0,
        Design: 0,
        Management: 0
    };

    const stepText = document.getElementById('step-text');
    const questionText = document.getElementById('question-text');

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            stepText.textContent = `STEP 0${currentQuestionIndex + 1}/0${questions.length}`;
            questionText.textContent = questions[currentQuestionIndex].text;
        } else {
            showResults();
        }
    }

    function showResults() {
        // Find the career with the highest score
        const topCareer = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

        // Store result and redirect
        localStorage.setItem('dePath_surveyResult', topCareer);
        window.location.href = 'dashboard.html';
    }

    // Make nextQuestion globally available
    window.nextQuestion = function(answer) {
        if (answer === 'yes') {
            const currentCareer = questions[currentQuestionIndex].career;
            scores[currentCareer]++;
        }
        currentQuestionIndex++;
        displayQuestion();
    }

    // Initial display
    displayQuestion();
}
