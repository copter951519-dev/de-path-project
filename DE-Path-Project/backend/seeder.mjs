import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new sqlite3.Database('./SQLdata.db');
const sqlPath = path.join(__dirname, 'seed_data.sql');

db.serialize(() => {
    console.log("🛠️  กำลังรื้อถังน้ำมันใหม่... สร้างตารางให้รองรับ Option E และเฉลยละเอียด");
    
    // ลบทิ้งก่อนเพื่อสร้างใหม่ให้คอลัมน์ตรงกัน
    db.run(`DROP TABLE IF EXISTS questions`);
    
    // สร้างตารางใหม่ให้มีช่องครบตามที่ SQL ของมึงต้องการ
    db.run(`CREATE TABLE questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT,
        chapter TEXT,
        level INTEGER,
        question_text TEXT,
        option_a TEXT,
        option_b TEXT,
        option_c TEXT,
        option_d TEXT,
        option_e TEXT,
        correct_option TEXT,
        explanation TEXT
    )`);

    console.log("⏳ กำลังฉีดข้อมูลสรุปเนื้อหาและโจทย์เข้าถัง...");
    
    const seedData = fs.readFileSync(sqlPath, 'utf8');
    db.exec(seedData, (err) => {
        if (err) {
            console.error("❌ พังตอนฉีดข้อมูล:", err.message);
        } else {
            console.log("✅ กริบ! ข้อมูล NETSAT/TPAT3 ไหลเข้าถังเรียบร้อย!");
            db.get("SELECT count(*) as count FROM questions", (err, row) => {
                if (row) console.log(`📊 ภารกิจสำเร็จ! ตอนนี้มีข้อมูลทั้งหมด: ${row.count} แถว`);
                db.close();
            });
        }
    });
});