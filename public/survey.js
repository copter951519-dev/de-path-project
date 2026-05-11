document.addEventListener('DOMContentLoaded', () => {
    const chatLog = document.getElementById('chat-log');
    const chatOptions = document.getElementById('chat-options');
    let step = 0;
    const userData = {};

    const surveySteps = [
        {
            question: "สวัสดีครับ! ยินดีต้อนรับสู่ DE-PATH! <br>เพื่อให้เราสร้างเส้นทางสู่คณะวิศวะฯ ที่ใช่สำหรับคุณ ขอสอบถามข้อมูลเล็กน้อยนะครับ<br><br><b>เป้าหมายคณะ/มหาวิทยาลัยของคุณคืออะไร?</b>",
            type: 'text',
            key: 'universityGoal',
            placeholder: 'เช่น วิศวะคอมฯ จุฬาฯ, วิศวะเครื่องกล บางมด'
        },
        {
            question: "เยี่ยมเลย! แล้วคุณเน้นวิชาไหนเป็นพิเศษครับ? (เลือกได้มากกว่า 1 ข้อ)",
            type: 'checkbox',
            key: 'subjects',
            options: ['A-Level Math 1', 'TPAT 3', 'A-Level Physics', 'A-Level Chemistry', 'A-Level English']
        },
        {
            question: "สุดท้ายแล้ว เป้าหมายการเรียนรู้ของคุณคืออะไร?",
            type: 'radio',
            key: 'learningGoal',
            options: ['ปูพื้นฐานให้แน่น', 'ตะลุยโจทย์ขั้นสูง', 'ฝึกทำข้อสอบจับเวลา']
        },
        {
            question: "ขอบคุณสำหรับข้อมูลครับ! เราได้จัดทำแผนการเรียนรู้เบื้องต้นให้คุณแล้ว",
            type: 'final',
        }
    ];

    function addMessage(text, sender = 'bot') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble');
        messageBubble.innerHTML = text; 

        messageContent.appendChild(messageBubble);
        messageElement.appendChild(messageContent);
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll to bottom
    }

    function showOptions(stepConfig) {
        chatOptions.innerHTML = ''; // Clear previous options
        const wrapper = document.createElement('div');
        wrapper.className = 'options-wrapper';

        switch(stepConfig.type) {
            case 'text':
                const form = document.createElement('form');
                form.style.display = 'flex';
                form.style.gap = '10px';
                form.style.width = '100%';
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = stepConfig.placeholder;
                input.style.flexGrow = '1';
                input.className = 'option-btn'; // Reuse style
                input.style.padding = '10px 20px';
                const submitBtn = document.createElement('button');
                submitBtn.type = 'submit';
                submitBtn.innerText = 'ส่ง';
                submitBtn.className = 'option-btn';

                form.appendChild(input);
                form.appendChild(submitBtn);
                wrapper.appendChild(form);

                form.addEventListener('submit', e => {
                    e.preventDefault();
                    if (input.value) {
                        userData[stepConfig.key] = input.value;
                        addMessage(input.value, 'user');
                        step++;
                        runStep();
                    }
                });
                break;

            case 'checkbox':
            case 'radio':
                stepConfig.options.forEach(optionText => {
                    const button = document.createElement('button');
                    button.className = 'option-btn';
                    button.innerText = optionText;
                    button.dataset.value = optionText;
                    wrapper.appendChild(button);
                    
                    button.addEventListener('click', () => {
                        button.classList.toggle('selected'); // Visual feedback
                    });
                });

                const confirmBtn = document.createElement('button');
                confirmBtn.innerText = 'ยืนยัน';
                confirmBtn.className = 'option-btn';
                confirmBtn.style.backgroundColor = 'var(--primary-orange)';
                confirmBtn.style.color = 'white';
                wrapper.appendChild(confirmBtn);

                confirmBtn.addEventListener('click', () => {
                    const selected = wrapper.querySelectorAll('.option-btn.selected');
                    if (selected.length > 0) {
                        const values = Array.from(selected).map(btn => btn.dataset.value);
                        userData[stepConfig.key] = (stepConfig.type === 'radio') ? values[0] : values;
                        addMessage(values.join(', '), 'user');
                        step++;
                        runStep();
                    }
                });
                break;

            case 'final':
                const finalLink = document.createElement('a');
                finalLink.href = 'home.html';
                finalLink.className = 'final-link';
                finalLink.innerText = 'เริ่มต้นเส้นทางของฉัน';
                wrapper.appendChild(finalLink);
                break;
        }
        chatOptions.appendChild(wrapper);
    }

    function runStep() {
        if (step < surveySteps.length) {
            const currentStep = surveySteps[step];
            addMessage(currentStep.question, 'bot');
            showOptions(currentStep);
        } else {
            console.log("Survey Complete:", userData);
        }
    }

    runStep(); // Start the survey
});