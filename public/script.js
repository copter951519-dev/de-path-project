/*
    This script file now contains only page-specific logic for components 
    that are not the main login or home dashboard pages.

    - The Firebase initialization and auth management have been REMOVED from this file.
    - Auth logic is now handled directly within login.html and home.html for clarity and to prevent conflicts.
*/

// --- Survey Logic (for survey.html) ---
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
        const topCareer = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        localStorage.setItem('dePath_surveyResult', topCareer);
        // *** FIXED: Redirect to the correct home.html, not the deleted dashboard.html ***
        window.location.href = 'home.html';
    }

    window.nextQuestion = function(answer) {
        if (answer === 'yes') {
            const currentCareer = questions[currentQuestionIndex].career;
            scores[currentCareer]++;
        }
        currentQuestionIndex++;
        displayQuestion();
    }

    // Initial call to display the first question
    if(questionText) { // Make sure the element exists before calling
        displayQuestion();
    }
}

// --- Analytics Page Chart Logic (for analytics.html) ---
const scoreTrendChartCanvas = document.getElementById('scoreTrendChart');
if (scoreTrendChartCanvas) {
    // Dynamically load Chart.js if not already loaded
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => createScoreTrendChart();
        document.head.appendChild(script);
    } else {
        createScoreTrendChart();
    }
}

function createScoreTrendChart() {
    const ctx = scoreTrendChartCanvas.getContext('2d');
    const scoreTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.'],
            datasets: [{
                label: 'แนวโน้มคะแนนสอบ',
                data: [65, 59, 80, 81, 75],
                backgroundColor: 'rgba(255, 77, 77, 0.1)',
                borderColor: 'rgba(255, 77, 77, 1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 0.9)'
                    }
                }
            }
        }
    });
}
