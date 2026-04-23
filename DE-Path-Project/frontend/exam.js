import { DE_PATH_EXAMS } from './examData.js';

let currentQuestions = [];
let currentQuestionIndex = 0;
// เก็บผลแยกวิชาเพื่อส่งไปอัปเดตกราฟ Radar
let examResults = { 'TPAT3': 0, 'TGAT': 0, 'A-Level': 0, 'NETSAT': 0 };

// 1. เริ่มทำข้อสอบ (สุ่ม 10 ข้อจากคลัง 30 ข้อ)
function initExam() {
    // ก๊อปปี้ข้อมูลออกมาแล้ว Shuffle (สลับที่) จากนั้นตัดมาแค่ 10 ข้อ
    currentQuestions = [...DE_PATH_EXAMS]
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
    
    showQuestion();
}

// 2. ฟังก์ชันแสดงโจทย์และตัวเลือก
function showQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    
    // อัปเดตหัวข้อและเนื้อหาโจทย์
    document.getElementById('subject-title').innerText = `${q.subject} | ${q.topic}`;
    document.getElementById('question-text').innerText = q.question;

    const container = document.getElementById('options-container');
    container.innerHTML = ''; // ล้างตัวเลือกเก่า

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn'; // ใช้ Class เดิมใน CSS ของ Nas
        btn.innerText = opt;
        btn.onclick = () => handleAnswer(index);
        container.appendChild(btn);
    });

    // อัปเดต Progress Bar (ถ้าหน้า HTML มี ID นี้นะ)
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

// 3. จัดการเมื่อผู้ใช้กดตอบ
function handleAnswer(selectedIndex) {
    const q = currentQuestions[currentQuestionIndex];

    // ตรวจคำตอบ: ถ้าถูกบวกคะแนนในวิชานั้นๆ
    if (selectedIndex === q.answer) {
        examResults[q.subject]++;
    }

    // ไปข้อถัดไป หรือ ถ้าครบแล้วให้จบการสอบ
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        finishExam();
    }
}

// 4. สรุปผลและส่งข้อมูลกลับ Dashboard
function finishExam() {
    // บันทึกคะแนนล่าสุดลง LocalStorage
    localStorage.setItem('latestScores', JSON.stringify(examResults));
    
    alert("ทำข้อสอบครบ 10 ข้อแล้ว! ระบบกำลังบันทึกคะแนนไปที่ Dashboard ของคุณ");
    
    // เด้งกลับหน้าหลัก (เช็กชื่อไฟล์หน้า Dashboard มึงด้วยนะว่าชื่อ home.html หรือเปล่า)
    window.location.href = 'home.html'; 
}

// รันทันทีเมื่อโหลดไฟล์
initExam();