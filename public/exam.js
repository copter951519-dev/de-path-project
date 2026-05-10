// DE-Path/frontend/exam.js

import { EXAM_STRUCTURE } from './examData.js';

// The API endpoint is now a relative path.
// This allows the frontend to call the backend API when they are hosted on the same domain.
const API_ENDPOINT = '/api/generate';

document.addEventListener('DOMContentLoaded', () => {

    // --- VIEWS & ELEMENTS ---
    const subjectSelectionView = document.getElementById('subject-selection-view');
    const topicSelectionView = document.getElementById('topic-selection-view');
    const aiTutorView = document.getElementById('ai-tutor-view');
    const examView = document.getElementById('exam-view');
    const subjectGridContainer = document.getElementById('subject-grid-container');
    const topicListContainer = document.getElementById('topic-list-container');
    const topicSelectionTitle = document.getElementById('topic-selection-title');
    const aiTutorTitle = document.getElementById('ai-tutor-title');
    const aiTutorSubject = document.getElementById('ai-tutor-subject');
    const aiSummaryText = document.getElementById('ai-summary-text');
    const backToSubjectsBtn = document.getElementById('back-to-subjects');
    const backToTopicsBtn = document.getElementById('back-to-topics');
    const startMockExamBtn = document.getElementById('start-mock-exam-btn');
    const loadingOverlay = document.getElementById('loading-overlay');

    // --- STATE MANAGEMENT ---
    let currentSubjectKey = null;
    let currentTopic = null;

    // --- CORE FUNCTIONS ---

    function showView(viewName) {
        [subjectSelectionView, topicSelectionView, aiTutorView, examView].forEach(v => v.classList.add('hidden'));
        const viewToShow = document.getElementById(`${viewName}-view`);
        if(viewToShow) viewToShow.classList.remove('hidden');
    }

    function renderSubjectSelection() {
        subjectGridContainer.innerHTML = '';
        for (const subjectKey in EXAM_STRUCTURE) {
            const subject = EXAM_STRUCTURE[subjectKey];
            const card = document.createElement('div');
            card.className = 'subject-card';
            card.innerHTML = `<i class="${subject.icon} subject-card-icon"></i><h3 class="subject-card-title">${subject.title}</h3><p class="subject-card-desc">${subject.description}</p>`;
            card.addEventListener('click', () => onSubjectSelect(subjectKey));
            subjectGridContainer.appendChild(card);
        }
    }

    function renderTopicSelection(subjectKey) {
        currentSubjectKey = subjectKey;
        const subject = EXAM_STRUCTURE[subjectKey];
        topicSelectionTitle.textContent = subject.title;
        topicListContainer.innerHTML = '';
        subject.topics.forEach(topic => {
            const topicItem = document.createElement('div');
            topicItem.className = 'topic-item';
            topicItem.innerHTML = `<h3>${topic.title}</h3><i class="fas fa-chevron-right"></i>`;
            topicItem.addEventListener('click', () => onTopicSelect(topic));
            topicListContainer.appendChild(topicItem);
        });
        showView('topic-selection');
    }

    async function callGeminiAPI(prompt, outputElement, loadingText = "AI กำลังทำงาน...") {
        if(loadingOverlay) loadingOverlay.style.display = 'flex';
        outputElement.innerHTML = `<div class="loading">${loadingText}</div>`;

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            outputElement.innerHTML = data.generatedText.replace(/\n/g, '<br>');

        } catch (error) {
            console.error('API Call Error:', error);
            outputElement.innerHTML = `<div class="error">เกิดข้อผิดพลาดในการเรียก AI: ${error.message}</div>`;
            alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        } finally {
            if(loadingOverlay) loadingOverlay.style.display = 'none';
        }
    }

    function renderAiTutor(topic) {
        currentTopic = topic;
        const subject = EXAM_STRUCTURE[currentSubjectKey];

        aiTutorTitle.textContent = topic.title;
        aiTutorSubject.textContent = `สรุปเนื้อหาสำคัญสำหรับวิชา ${subject.title}`;
        showView('ai-tutor');
        
        const summaryPrompt = `ในฐานะติวเตอร์มืออาชีพ ช่วยสรุปเนื้อหาเรื่อง \"${topic.title}\" สำหรับการเตรียมสอบวิชา \"${subject.title}\" ให้หน่อยครับ เน้นประเด็นสำคัญที่มักออกสอบ, สูตรที่ต้องจำ, และยกตัวอย่างโจทย์สั้นๆ ถ้าเป็นไปได้ เพื่อให้นักเรียนเข้าใจง่ายที่สุด`;
        callGeminiAPI(summaryPrompt, aiSummaryText, "AI ติวเตอร์กำลังเตรียมสรุปเนื้อหาให้คุณ...");
    }
    
    function startMockExam() {
        const subject = EXAM_STRUCTURE[currentSubjectKey];
        const examPrompt = `ในฐานะอาจารย์ผู้ออกข้อสอบ, จงสร้างข้อสอบปรนัย (multiple choice) 4 ตัวเลือก พร้อมเฉลย (ใส่เครื่องหมาย * หน้าคำตอบที่ถูก) จำนวน 5 ข้อ จากหัวข้อเรื่อง \"${currentTopic.title}\" ของวิชา \"${subject.title}\" สำหรับนักเรียนที่กำลังเตรียมสอบเข้ามหาวิทยาลัย`;

        showView('exam');
        const examOutputElement = document.getElementById('exam-output');
        callGeminiAPI(examPrompt, examOutputElement, "AI กำลังสร้างชุดข้อสอบแบบปรนัยสำหรับคุณ");
    }

    // --- EVENT HANDLERS ---
    function onSubjectSelect(subjectKey) { renderTopicSelection(subjectKey); }
    function onTopicSelect(topic) { renderAiTutor(topic); }
    backToSubjectsBtn.addEventListener('click', () => showView('subject-selection'));
    backToTopicsBtn.addEventListener('click', () => renderTopicSelection(currentSubjectKey));
    startMockExamBtn.addEventListener('click', startMockExam);

    // --- INITIALIZATION ---
    function initialize() {
        const urlParams = new URLSearchParams(window.location.search);
        const topicId = urlParams.get('topic');

        if (topicId) {
            for (const subjKey in EXAM_STRUCTURE) {
                const foundTopic = EXAM_STRUCTURE[subjKey].topics.find(t => t.id === topicId);
                if (foundTopic) {
                    currentSubjectKey = subjKey;
                    renderAiTutor(foundTopic);
                    return; 
                }
            }
        }

        renderSubjectSelection();
        showView('subject-selection');
    }

    initialize();
});
