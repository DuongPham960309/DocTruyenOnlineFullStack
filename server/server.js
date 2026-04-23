import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import 'dotenv/config';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';

const app = express();
const env = process.env;

const pool = mysql.createPool({
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    connectionLimit: 10
});

const queryString = {
    suggestedNovels: `SELECT novels.name, novels.before, novels.after, novels.image, suggested_novels.chapter FROM suggested_novels JOIN 
    novels ON suggested_novels.name = novels.name ORDER BY id`,
    selectedTranslationNovels: `SELECT novels.name, novels.before, novels.after, novels.image, selected_translation_novels.chapter FROM 
    selected_translation_novels JOIN novels ON selected_translation_novels.name = novels.name ORDER BY id`,
    updatedNovels: `SELECT name, novels.before, after, note, current_chapter AS chapter, last_time FROM novels WHERE first_time != last_time 
    ORDER BY last_time DESC LIMIT 25`,
    fullNovels: `SELECT novels.name, novels.before, novels.after, novels.image, novels.current_chapter AS chapter FROM full_novels JOIN 
    novels ON full_novels.name = novels.name ORDER BY id`,
    leftOfShortNovel: `SELECT image, title FROM short_novels WHERE short_novels.group = 'leftOfShortNovel'`,
    rightOfShortNovels: `SELECT image, title FROM short_novels WHERE short_novels.group = 'rightOfShortNovels' ORDER BY id`,
    reviewNovels: `SELECT image, title FROM review_novels ORDER BY id`,
    topGoodNovels: `SELECT name AS title, view FROM novels ORDER BY view DESC LIMIT 10`,
    newUpdateNovels: `SELECT name AS title, view FROM novels WHERE first_time = last_time ORDER BY first_time DESC LIMIT 10`,
    trendNovelsInMonth: `SELECT name FROM trend_novels_in_month ORDER BY id`
};

const sectionNames = Object.keys(queryString);

app.set('trust proxy', 1);

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(verifyRequest);

app.use(rateLimit({
    windowMs: 15*60*1000,
    max: 500,
    message: "Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 1 phút.",
    standardHeaders: true,
    legacyHeaders: false
}));

app.use(express.json());

function verifyRequest(request, response, next) {
    const serverTime = Date.now();

    const [clientSignature, clientTime] = getClientSignatureAndTimeMS(request.get('x-key'));
    
    const timeDifference = Math.abs(serverTime - clientTime);
    
    const serverSignature = crypto
        .createHash('sha256')
        .update(clientTime + "|ConstantString")
        .digest('hex');

    if ((timeDifference < 10*1000)&&(serverSignature === clientSignature)) {
        next();
    } else {
        response.send();
    }
}

const getClientSignatureAndTimeMS = (key) => {
    const baseHexadecimal = 16;
    const timeOffsetPosition = parseInt(key.charAt(0), baseHexadecimal);
    const timeStart = 1 + timeOffsetPosition;
    const timeLength = 16;

    const clientSignature = key.substring(0, timeStart) + key.substring(timeStart + timeLength);

    let timeObfuscate = key.substring(timeStart, timeStart + timeLength);
    timeObfuscate = BigInt("0x" + timeObfuscate);

    const MASK_64 = (1n << 64n) - 1n;
    const inverted = timeObfuscate ^ MASK_64;
    const secretHexPosition = parseInt(clientSignature.charAt(7), baseHexadecimal);
    let secretHex = clientSignature.substring(secretHexPosition, secretHexPosition + timeLength);
    secretHex = BigInt("0x" + secretHex);
    const timeMS = Number(inverted ^ secretHex);
    
    return [clientSignature, timeMS];
}

app.get('/data', async (req, res) => {
    const queriedData = {lastUpdatedTime: {}, data: {}};
    const data = queriedData.data;

    await getLastUpdatedTime(queriedData.lastUpdatedTime);
    await Promise.all(sectionNames.map(sectionName => queryOfGetMethod(data, sectionName)));

    data.leftOfShortNovel = data.leftOfShortNovel[0];
    data.trendNovelsInMonth = data.trendNovelsInMonth.map(row => row.name);

    res.json(queriedData);
});

const getLastUpdatedTime = async (lastUpdatedTime) => {
    try {
        let rows;

        [rows] = await pool.query(`SELECT * FROM last_updated_time`);
    
        for (let i = 0; i < rows.length; i++)
        {
            lastUpdatedTime[rows[i].section] = rows[i].time;
        }
    } catch (error) {
        console.error(`\x1b[31m lastUpdatedTime: ${error}\x1b[0m`);
    }
}

const queryOfGetMethod = async (data, property) => {
    try {
        [data[property]] = await pool.query(queryString[property]);
    } catch (error) {
        console.error(`\x1b[31m ${property}: ${error}\x1b[0m`);
    }
}

app.post('/data', async (req, res) => {
    const updatedTime = req.body;
    const queriedData = {lastUpdatedTime: {}, data: {}};
    const data = queriedData.data;
    let lastUpdatedTime = queriedData.lastUpdatedTime;

    await getLastUpdatedTime(queriedData.lastUpdatedTime);
    await Promise.allSettled(sectionNames.map(sectionName => queryOfPostMethod(updatedTime, sectionName, queriedData)));

    if (updatedTime.leftOfShortNovel !== lastUpdatedTime.leftOfShortNovel) {
        data.leftOfShortNovel = data.leftOfShortNovel[0];
    }

    if (updatedTime.trendNovelsInMonth !== lastUpdatedTime.trendNovelsInMonth) {
        data.trendNovelsInMonth = data.trendNovelsInMonth.map(row => row.name);
    }

    res.json(queriedData);
});

const queryOfPostMethod = async (updatedTime, property, queriedData) => {
    if (updatedTime[property] !== queriedData.lastUpdatedTime[property]) {
        try {
            [queriedData.data[property]] = await pool.query(queryString[property]);
        } catch (error) {
            console.error(`\x1b[31m ${property}: ${error}\x1b[0m`);
            queriedData.lastUpdatedTime[property] = updatedTime[property];
        }
    }
}

app.listen(env.SERVER_PORT, env.SERVER_HOST, () => {
    console.log(`\x1b[32m Server started on ${env.SERVER_HOST}:${env.SERVER_PORT}\x1b[0m`);
}).on('error', (error) => {
    console.error(`\x1b[31m Server failed: ${error.message}\x1b[0m`);
});
