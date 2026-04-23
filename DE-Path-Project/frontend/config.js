// config.js - ศูนย์ควบคุม URL ของโปรเจกต์ DE-Path
const CONFIG = {
    // ถ้ามึงรันใน IDX แล้วเห็น URL ในหน้า Preview 
    // ให้เอาลิงก์ https://... นั้นมาใส่แทน 'http://localhost:3000'
    API_URL: 'http://localhost:3000'
};

// ป้องกันการเผลอไปแก้ไขค่าระหว่างรัน
Object.freeze(CONFIG);