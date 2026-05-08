
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import rateLimit from 'express-rate-limit';

const app = express();

if (!process.env.GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY is not set. API calls will fail.');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'FAKE_KEY');

// --- CORS Configuration ---
const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://127.0.0.1:5501',
  'http://localhost:5501',
  'http://127.0.0.1:3000',
  'http://localhost:3000'
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// --- Rate Limiting ---
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 50, // Limit each IP to 50 requests per windowMs
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply the rate limiting middleware to API calls only
app.use('/api', apiLimiter);


app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DE-PATH AI Tutor is running!');
});

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const fullPrompt = `คุณคือติวเตอร์ AI ชื่อ \"DE-PATH\" ผู้เชี่ยวชาญการให้คำปรึกษาและติวข้อสอบเข้าคณะวิศวกรรมศาสตร์ของไทย (TPAT3, A-Level) จงตอบคำถามต่อไปนี้ด้วยภาษาไทยที่เข้าใจง่ายและเป็นกันเอง: \"${prompt}\"`;
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

export default app;
