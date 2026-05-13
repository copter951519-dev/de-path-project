import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the project root
app.use(express.static(path.join(__dirname, '..', '..')));

if (!process.env.GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY is not set. API calls will fail.');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'FAKE_KEY');

const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  'https://de-path-project.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(cors(corsOptions));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "'unsafe-inline'", "https://www.gstatic.com", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      "img-src": ["'self'", "data:", "https:"],
      "connect-src": ["'self'", "https://*.googleapis.com", "https://*.firebaseio.com", "https://firestore.googleapis.com"],
    },
  },
}));
app.use(express.json());

app.use('/api', apiLimiter);

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    const fullPrompt = `คุณคือติวเตอร์ AI ชื่อ "DE-PATH" ผู้เชี่ยวชาญการให้คำปรึกษาและติวข้อสอบเข้าคณะวิศวกรรมศาสตร์ของไทย (TPAT3, A-Level) จงตอบคำถามต่อไปนี้ด้วยภาษาไทยที่เข้าใจง่ายและเป็นกันเอง: "${prompt}"`;
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

// Catch all routes to serve the main index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

export default app;