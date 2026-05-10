document.addEventListener('DOMContentLoaded', () => {
    const chatLog = document.getElementById('chat-log');
    const optionsContainer = document.getElementById('chat-options');

    const conversation = [
        {
            id: 'welcome',
            text: 'สวัสดีครับ! ผมคือ DE-PATH AI ผู้ช่วยที่จะพาคุณไปค้นหาเส้นทางวิศวะคอมที่ใช่... ก่อนอื่นเลย, อะไรคือสิ่งที่พาคุณมาที่นี่ในวันนี้ครับ?',
            options: [
                { text: 'อยากรู้จักตัวเองมากขึ้น', next: 'q_problem_solving' },
                { text: 'อยากเตรียมตัวสอบเข้า', next: 'q_problem_solving' },
                { text: 'แค่มาดูเฉยๆ', next: 'q_problem_solving' }
            ]
        },
        {
            id: 'q_problem_solving',
            text: 'เยี่ยมเลย! ลองจินตนาการดูนะ... ถ้าเจอปัญหาเขียนโค้ดที่ซับซ้อนมากๆ คุณมีแนวโน้มจะทำอะไรเป็นอย่างแรก?',
            options: [
                { text: 'ลงมือลองผิดลองถูกไปเรื่อยๆ', next: 'q_project_type' },
                { text: 'ค้นหาข้อมูล/ถามผู้เชี่ยวชาญ', next: 'q_project_type' },
                { text: 'ขอพักไปทำอย่างอื่นก่อน', next: 'q_project_type' }
            ]
        },
        {
            id: 'q_project_type',
            text: 'น่าสนใจมากครับ! คำถามสุดท้าย... โปรเจกต์แบบไหนที่ฟังแล้วทำให้คุณรู้สึกตื่นเต้นที่สุด?',
            options: [
                { text: 'สร้างเว็บ/แอปให้คนนับล้านใช้', next: 'finish' },
                { text: 'เขียน AI แก้ปัญหาเฉพาะทาง', next: 'finish' },
                { text: 'พัฒนาเกมสนุกๆ กับเพื่อน', next: 'finish' }
            ]
        },
        {
            id: 'finish',
            text: 'ขอบคุณสำหรับข้อมูลครับ! ผมพอจะเห็นภาพของคุณชัดขึ้นแล้ว... ตอนนี้เราไปสร้างโปรไฟล์ของคุณเพื่อเริ่มเส้นทาง DE-PATH กันเลยดีกว่า!',
            options: [] // No options, shows the final link
        }
    ];

    let currentStep = 'welcome';

    function displayStep(stepId) {
        const step = conversation.find(s => s.id === stepId);
        if (!step) return;

        addMessage(step.text, 'bot');

        optionsContainer.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'options-wrapper';

        setTimeout(() => {
            if (step.id === 'finish') {
                const finalLink = document.createElement('a');
                finalLink.href = 'login.html';
                finalLink.className = 'final-link';
                finalLink.textContent = 'ไปหน้าถัดไป';
                wrapper.appendChild(finalLink);
            } else {
                step.options.forEach(option => {
                    const button = document.createElement('button');
                    button.className = 'option-btn';
                    button.textContent = option.text;
                    button.onclick = () => handleOptionSelect(option);
                    wrapper.appendChild(button);
                });
            }
            optionsContainer.appendChild(wrapper);
        }, 600);
    }

    function handleOptionSelect(option) {
        addMessage(option.text, 'user');
        
        const wrapper = optionsContainer.querySelector('.options-wrapper');
        if(wrapper) {
            wrapper.innerHTML = '<p style="color: var(--text-secondary);">DE-PATH AI is typing...</p>';
        }

        setTimeout(() => {
            currentStep = option.next;
            displayStep(currentStep);
        }, 1200);
    }

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'message-content';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = text;
        
        contentWrapper.appendChild(bubble);
        messageElement.appendChild(contentWrapper);
        chatLog.appendChild(messageElement);
        
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    setTimeout(() => {
        displayStep(currentStep);
    }, 500);
});
