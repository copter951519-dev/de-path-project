import 'dotenv/config'; 
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 9001;

// --- 🧠 1. SETUP AI (GEMINI) ---
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "DUMMY_KEY");
const aiModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
});

// --- 💾 2. DATABASE SETUP ---
const dbPath = path.resolve(__dirname, 'database/SQLdata.db');
let db;

async function initializeDatabase() {
    try {
        const dbFolder = path.dirname(dbPath);
        if (!fs.existsSync(dbFolder)) fs.mkdirSync(dbFolder, { recursive: true });
        db = await open({ filename: dbPath, driver: sqlite3.Database });
        console.log('✅ Database connected.');
        await db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, firebase_uid TEXT)');
    } catch (error) {
        console.error("❌ DB Error:", error);
    }
}

// --- ⚙️ 3. MIDDLEWARE & STATIC FILES ---
app.use(cors());
app.use(express.json());

// 🛠️ ระบบ Auto-Detect Path (แก้ปัญหา ENOENT ของ Nas)
let frontendPath = path.resolve(__dirname, '../../frontend');
if (!fs.existsSync(path.join(frontendPath, 'index.html'))) {
    frontendPath = path.resolve(__dirname, '../frontend');
}
console.log(`📂 Serving frontend from: ${frontendPath}`);
app.use(express.static(frontendPath));

// --- 🎯 4. API ROUTES ---

app.get('/api/quiz/:subject', async (req, res) => {
    if (!apiKey) return res.status(500).json({ error: "API Key Missing" });
    const subject = req.params.subject;
    const prompt = `สร้างชุดข้อสอบปรนัย 10 ข้อ วิชา '${subject}' สำหรับ ม.ปลาย ผลลัพธ์เป็น JSON Array เท่านั้น มี key: question, options, answer, subject`;
    try {
        const result = await aiModel.generateContent(prompt);
        res.json(JSON.parse(result.response.text()));
    } catch (error) { res.status(500).json({ error: "AI Error" }); }
});

app.post('/api/analyze-survey', async (req, res) => {
    const { answers } = req.body;
    if (!apiKey) return res.status(500).json({ error: "API Key Missing" });
    const prompt = `วิเคราะห์คำตอบ Yes/No 6 ข้อ: ${answers.join(', ')} (สาขา: โยธา, ไฟฟ้า, คอม, เครื่องกล, อุตสาหการ, สิ่งแวดล้อม) บอกสาขาวิศวะที่เหมาะ ผลลัพธ์ JSON key: career, reason, skill`;
    try {
        const result = await aiModel.generateContent(prompt);
        res.json(JSON.parse(result.response.text()));
    } catch (error) { res.status(500).json({ error: "AI Error" }); }
});

app.post('/api/login', async (req, res) => {
    const { email, uid } = req.body;
    try {
        await db.run('INSERT OR IGNORE INTO users (email, firebase_uid) VALUES (?, ?)', [email, uid]);
        res.json({ status: "success" });
    } catch (error) { res.status(500).json({ error: "DB Error" }); }
});

// --- 🏠 5. FRONTEND FALLBACK ---
app.get('*', (req, res) => {
    const indexPath = path.join(frontendPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send("หาไฟล์ index.html ไม่เจอว่ะ  เช็คโฟลเดอร์ frontend ด่วน!");
    }
});

// 🚀 START SERVER
async function startServer() {
    await initializeDatabase();
    app.listen(port, '0.0.0.0', () => {
        console.log(`
    ========================================
    🚀 DE-PATH ENGINE : ONLINE (PORT ${port})
    🔌 AI STATUS: ${apiKey ? 'READY' : 'OFFLINE'}
    ========================================
        `);
    });
}
startServer();