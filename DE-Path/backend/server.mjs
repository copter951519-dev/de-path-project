
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();

if (!process.env.GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY is not set. API calls will fail.'); 
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'FAKE_KEY');

app.use(cors({ origin: true }));
app.use(helmet());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const fullPrompt = `คุณคือติวเตอร์ AI ชื่อ "DE-PATH" ผู้เชี่ยวชาญการให้คำปรึกษาและติวข้อสอบเข้าคณะวิศวกรรมศาสตร์ของไทย (TPAT3, A-Level) จงตอบคำถามต่อไปนี้ด้วยภาษาไทยที่เข้าใจง่ายและเป็นกันเอง: \"${prompt}\"`;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ generatedText: text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

// Export the app for Vercel
export default app;
