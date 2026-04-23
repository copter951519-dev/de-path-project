// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// Middleware
app.use(cors()); // Allow requests from our frontend
app.use(express.json()); // Middleware to parse JSON request bodies

// Check for API key on startup
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not set.');
}

// Initialize the Google AI client with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- API Endpoints ---

/**
 * POST /api/generate-plan
 * This is the core of our AI Tutor feature.
 * It receives a user's weaknesses and generates a personalized study plan.
 */
app.post('/api/generate-plan', async (req, res) => {
  try {
    const { weaknesses } = req.body; // Example: weaknesses: ["A-Level Physics (Electricity)", "NETSAT Sci"]

    if (!weaknesses || !Array.isArray(weaknesses) || weaknesses.length === 0) {
      return res.status(400).json({ error: 'Weaknesses are required as a non-empty array.' });
    }

    const prompt = `
      คุณคือติวเตอร์ส่วนตัวชื่อ "DE-PATH AI" เชี่ยวชาญการวางแผนการเรียนเพื่อสอบเข้าคณะวิศวกรรมศาสตร์ในระบบ TCAS ของประเทศไทย

      นักเรียนคนนี้มีจุดอ่อนในหัวข้อต่อไปนี้: ${weaknesses.join(', ')}

      โปรดสร้าง "แผนการเรียนเพื่ออุดรอยรั่ว" แบบเจาะลึกสำหรับนักเรียนคนนี้ โดยมีองค์ประกอบต่อไปนี้:
      1.  **บทนำ:** กล่าวให้กำลังใจและอธิบายภาพรวมของแผนการเรียนนี้
      2.  **ลำดับความสำคัญ:** จัดลำดับความสำคัญว่าควรเริ่มทบทวนจากเรื่องไหนก่อน-หลัง พร้อมเหตุผลสั้นๆ
      3.  **ตารางการเรียน (Action Plan):** สร้างตารางสำหรับ 1 สัปดาห์ (7 วัน) โดยระบุว่าในแต่ละวันควรอ่าน/ทำโจทย์เรื่องอะไรบ้าง ควรมีทั้งการทบทวนเนื้อหาและการทำแบบฝึกหัด
      4.  **แหล่งข้อมูลแนะนำ:** แนะนำช่อง YouTube, เว็บไซต์, หรือหนังสือ (ระบุชื่อ) ที่เหมาะสำหรับการทบทวนในแต่ละหัวข้อ
      5.  **คำแนะนำเพิ่มเติม:** ทิ้งท้ายด้วยเทคนิคการอ่านหนังสือหรือการทำข้อสอบเพื่อสร้างกำลังใจ

      โปรดจัดรูปแบบของคำตอบให้อ่านง่าย มีการใช้หัวข้อ (headings) และรายการ (bullet points) ที่ชัดเจน
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' }); // Use a powerful and recent model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Send the generated study plan back to the client
    res.json({ studyPlan: text });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to generate study plan. Please try again later.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`DE-PATH AI Tutor server is running on http://localhost:${port}`);
});
