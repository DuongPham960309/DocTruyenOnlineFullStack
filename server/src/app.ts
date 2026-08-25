import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';

import {verifyRequest} from './shared/middlewares/middleware.js';

const app = express();

app.set('trust proxy', 1);

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(verifyRequest);

app.use(rateLimit({
  windowMs: 15*60*1000,
  // max: 500,
  max: 10000,
  message: "Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 1 phút.",
  standardHeaders: true,
  legacyHeaders: false
}));

app.use(express.json());
app.use('/assets', express.static(path.join(process.cwd(), 'images')));

export default app;