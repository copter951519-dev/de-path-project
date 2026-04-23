// frontend/examData.js

// --- 1. สรุปเนื้อหาตามหมวดหมู่ (สำหรับดึงไปโชว์ที่ Dashboard) ---
export const SUBJECT_CONTENT = {
    "Engineering-Core": {
        description: "หัวใจวิศวกรรม: กลศาสตร์, ไฟฟ้า, พลังงาน และทักษะเครื่องมือช่าง",
        topics: ["กลศาสตร์ & สมดุล", "ไฟฟ้าประยุกต์", "ทักษะงานช่าง & การอ่านแบบ"],
        importance: "เน้นสอบ TPAT3 และสอบตรงมหาลัยดัง"
    },
    "Applied-Sciences": {
        description: "วิทยาศาสตร์และคณิตศาสตร์ประยุกต์",
        topics: ["เคมีวิศวะ", "คณิตศาสตร์ประยุกต์ 1 (A-Level)", "ตรรกะและการคิดเชิงระบบ"],
        importance: "คะแนนส่วนตัดตัวจริงสำหรับสายวิชาการ"
    },
    "General-Competency": {
        description: "ความฉลาดรู้ทั่วไปและการสื่อสาร",
        topics: ["TGAT 1-3", "NETSAT ภาษาและตรรกะ"],
        importance: "วัดทัศนคติและสมรรถนะการทำงานในอนาคต"
    }
};

// --- 2. คลังข้อสอบรวม (30 ข้อสมบูรณ์) ---
export const DE_PATH_EXAMS = [
    // --- TPAT3: Engineering (ID 1-10) ---
    { id: 1, subject: "TPAT3", topic: "Mechanics", question: "วัตถุหนัก 20 นิวตัน วางอยู่บนพื้นเอียงทำมุม 30 องศา แรงที่กดพื้นในแนวตั้งฉากกับพื้นเอียงมีค่าเท่าใด? (cos 30° = 0.866)", options: ["10.0 N", "17.3 N", "20.0 N", "34.6 N"], answer: 1 },
    { id: 2, subject: "TPAT3", topic: "Mechanics", question: "แรง 2 แรง ขนาด 3N และ 4N กระทำต่อวัตถุทำมุม 90 องศาต่อกัน แรงลัพธ์จะมีขนาดกี่นิวตัน?", options: ["1 N", "5 N", "7 N", "12 N"], answer: 1 },
    { id: 3, subject: "TPAT3", topic: "Mechanics", question: "โมเมนต์ของแรงจะมีค่ามากที่สุดเมื่อแรงกระทำในทิศทางใดต่อวัตถุ?", options: ["ทำมุม 0 องศา", "ทำมุม 45 องศา", "ทำมุม 90 องศา", "ทำมุม 180 องศา"], answer: 2 },
    { id: 4, subject: "TPAT3", topic: "Electricity", question: "หลอดไฟ 100W 220V เมื่อใช้งานจะมีกระแสไฟฟ้าไหลผ่านกี่แอมแปร์?", options: ["0.45 A", "2.2 A", "4.5 A", "22 A"], answer: 0 },
    { id: 5, subject: "TPAT3", topic: "Fluid", question: "ความหนาแน่นของน้ำมีค่าประมาณเท่าใดในหน่วย kg/m³?", options: ["1", "10", "100", "1,000"], answer: 3 },
    { id: 6, subject: "TPAT3", topic: "Logic", question: "หากเฟือง A หมุนตามเข็มนาฬิกาและขบกับเฟือง B เฟือง B จะหมุนอย่างไร?", options: ["ตามเข็ม", "ทวนเข็ม", "หยุดนิ่ง", "หมุนสลับไปมา"], answer: 1 },
    { id: 7, subject: "TPAT3", topic: "Drawing", question: "เส้นประ (Dashed Line) ในการเขียนแบบวิศวกรรมใช้แทนสิ่งใด?", options: ["เส้นขอบรูป", "เส้นร่าง", "เส้นขอบที่มองไม่เห็น", "เส้นแสดงขนาด"], answer: 2 },
    { id: 8, subject: "TPAT3", topic: "Tools", question: "หากต้องการวัดความโตในของรูท่อให้แม่นยำที่สุด ควรใช้เครื่องมือใด?", options: ["ไม้บรรทัด", "เวอร์เนียร์คาลิปเปอร์", "ตลับเมตร", "ระดับน้ำ"], answer: 1 },
    { id: 9, subject: "TPAT3", topic: "Energy", question: "พลังงานศักย์โน้มถ่วงขึ้นอยู่กับปัจจัยใดมากที่สุด?", options: ["ความเร็ว", "มวลและความสูง", "เวลา", "แรงเสียดทาน"], answer: 1 },
    { id: 10, subject: "TPAT3", topic: "Physics", question: "กฎของโอห์ม (Ohm's Law) ความสัมพันธ์ที่ถูกต้องคือข้อใด?", options: ["V = IR", "I = VR", "R = VI", "V = I/R"], answer: 0 },

    // --- TGAT: General (ID 11-18) ---
    { id: 11, subject: "TGAT", topic: "English", question: "Friend: 'What do you think of this laptop?'\nYou: '__________ It's fast and has great battery life.'", options: ["I couldn't agree more.", "In my opinion, it's worth the price.", "I'm not sure.", "None of my business."], answer: 1 },
    { id: 12, subject: "TGAT", topic: "Thai", question: "ข้อใดใช้ภาษาเหมาะสมที่สุดสำหรับการเขียนรายงานเชิงวิชาการ?", options: ["ค่อนข้างดีโอเคเลย", "ผู้วิจัยดำเนินการเก็บข้อมูลอย่างเป็นระบบ", "ไปถามชาวบ้านมาแล้ว", "ทำแบบงูๆ ปลาๆ"], answer: 1 },
    { id: 13, subject: "TGAT", topic: "Working", question: "หากพบข้อผิดพลาดร้ายแรงก่อนวันส่งงาน 1 วัน ควรทำอย่างไร?", options: ["ลาป่วยหนีปัญหา", "ปกปิดไว้", "แจ้งทีมและหัวหน้าทันที", "ยกเลิกงานเงียบๆ"], answer: 2 },
    { id: 14, subject: "TGAT", topic: "Logic", question: "แดงสูงกว่าขาว ขาวเตี้ยกว่าดำ ดำสูงกว่าแดง ใครเตี้ยที่สุด?", options: ["แดง", "ขาว", "ดำ", "ข้อมูลไม่เพียงพอ"], answer: 1 },
    { id: 15, subject: "TGAT", topic: "Logic", question: "ถ้า 'นก' คู่กับ 'ปีก' แล้ว 'ปลา' จะคู่กับอะไร?", options: ["เหงือก", "เกล็ด", "ครีบ", "หาง"], answer: 2 },
    { id: 16, subject: "TGAT", topic: "Social", question: "การมี Digital Literacy สำคัญอย่างไรในยุคปัจจุบัน?", options: ["ใช้เล่นเกมเก่งขึ้น", "คัดกรองข่าวปลอมได้", "คอมพิวเตอร์ไม่พัง", "ไม่ต้องจ้างช่าง"], answer: 1 },
    { id: 17, subject: "TGAT", topic: "English", question: "Which word is a synonym of 'Crucial'?", options: ["Small", "Easy", "Essential", "Optional"], answer: 2 },
    { id: 18, subject: "TGAT", topic: "Math", question: "2, 4, 8, 16, ... เลขถัดไปคืออะไร?", options: ["20", "24", "32", "64"], answer: 2 },

    // --- A-Level: Academic (ID 19-25) ---
    { id: 19, subject: "A-Level", topic: "Math1", question: "กำหนด A = {1, 2, {1, 2}, 3} ข้อใดผิด?", options: ["{1, 2} ∈ A", "{1, 2} ⊂ A", "{{1, 2}} ⊂ A", "{3} ∈ A"], answer: 3 },
    { id: 20, subject: "A-Level", topic: "Physics", question: "วัตถุเคลื่อนที่วงกลมด้วยอัตราเร็วคงที่ ข้อใดถูกต้องเกี่ยวกับความเร่ง?", options: ["ไม่มีความเร่ง", "ทิศเดียวกับการเคลื่อนที่", "ทิศเข้าสู่ศูนย์กลาง", "ทิศออกจากศูนย์กลาง"], answer: 2 },
    { id: 21, subject: "A-Level", topic: "Chemistry", question: "ในคาบเดียวกัน เมื่อเลขอะตอมเพิ่มขึ้น ขนาดอะตอมจะเป็นอย่างไร?", options: ["ใหญ่ขึ้น", "เล็กลง", "เท่าเดิม", "ไม่แน่นอน"], answer: 1 },
    { id: 22, subject: "A-Level", topic: "Math1", question: "log 100 มีค่าเท่ากับเท่าใด?", options: ["1", "2", "10", "100"], answer: 1 },
    { id: 23, subject: "A-Level", topic: "Physics", question: "หน่วยของความถี่คืออะไร?", options: ["Newton", "Joule", "Watt", "Hertz"], answer: 3 },
    { id: 24, subject: "A-Level", topic: "Chemistry", question: "สารใดมีพันธะไอออนิก?", options: ["H2O", "CO2", "NaCl", "CH4"], answer: 2 },
    { id: 25, subject: "A-Level", topic: "Physics", question: "ความเร่งเนื่องจากแรงโน้มถ่วง (g) มีค่าประมาณเท่าใด?", options: ["9.8 m/s²", "1.6 m/s²", "0 m/s²", "100 m/s²"], answer: 0 },

    // --- NETSAT: KKU Style (ID 26-30) ---
    { id: 26, subject: "NETSAT", topic: "Math", question: "ผลิต 500 ชิ้นเสีย 2% ถ้าผลิต 2,000 ชิ้นจะเสียกี่ชิ้น?", options: ["10", "40", "100", "200"], answer: 1 },
    { id: 27, subject: "NETSAT", topic: "Sci-Tech", question: "สร้าง Smart Farm ปลูกผักออร์แกนิก เทคโนโลยีใดจำเป็นน้อยที่สุด?", options: ["เซนเซอร์ความชื้น", "ระบบรดน้ำออโต้", "ระบบ Chiller ขนาดใหญ่", "แอปติดตามการโต"], answer: 2 },
    { id: 28, subject: "NETSAT", topic: "Sci", question: "เพิ่มแรงดันในถังแก๊สปิดสนิทที่อุณหภูมิคงที่ ปริมาตรแก๊สจะเป็นอย่างไร?", options: ["เพิ่มขึ้น", "ลดลง", "คงที่", "เปลี่ยนเป็นของเหลว"], answer: 1 },
    { id: 29, subject: "NETSAT", topic: "Logic", question: "หากวันนี้เป็นวันจันทร์ อีก 10 วันจะเป็นวันอะไร?", options: ["พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"], answer: 1 },
    { id: 30, subject: "NETSAT", topic: "English", question: "Which sentence is grammatically correct?", options: ["He go to school.", "She is like apples.", "They are playing football.", "I has a car."], answer: 2 }
];