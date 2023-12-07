import express from 'express';
import cros from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2';

const app = express();

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
    database: "doc_truyen_online",
    connectionLimit: 2
});

app.use(cros(), bodyParser.json());

app.get('/data', (req, res) => {
    pool.getConnection(async (err, conn) => {
        let promiseConn = conn.promise();
        let rows, fields;
        let queriedData = {lastUpdatedTime: {}, data: {}};

        
        [rows, fields] = await promiseConn.query("SELECT * FROM last_updated_time");

        for (let i = 0; i < rows.length; i++)
        {
            queriedData.lastUpdatedTime[rows[i].section] = rows[i].time;
        }

        [rows, fields] = await promiseConn.query(`SELECT novels.name, novels.before, novels.after, novels.image, suggested_novels.chapter 
        FROM suggested_novels JOIN novels ON suggested_novels.name = novels.name ORDER BY id`);
        queriedData.data.suggestedNovels = rows;

        [rows, fields] = await promiseConn.query(`SELECT novels.name, novels.before, novels.after, novels.image, 
        selected_translation_novels.chapter FROM selected_translation_novels JOIN novels ON selected_translation_novels.name = novels.name 
        ORDER BY id`);
        queriedData.data.selectedTranslationNovels = rows;

        [rows, fields] = await promiseConn.query(`SELECT name, novels.before, after, note, current_chapter AS chapter, last_time FROM novels 
        WHERE first_time != last_time ORDER BY last_time DESC LIMIT 25`);
        queriedData.data.updatedNovels = rows;

        [rows, fields] = await promiseConn.query(`SELECT novels.name, novels.before, novels.after, novels.image, novels.current_chapter AS 
        chapter FROM full_novels JOIN novels ON full_novels.name = novels.name ORDER BY id`);
        queriedData.data.fullNovels = rows;

        [rows, fields] = await promiseConn.query("SELECT image, title FROM short_novels WHERE short_novels.group = 'leftOfShortNovel'");
        queriedData.data.leftOfShortNovel = rows[0];

        [rows, fields] = await promiseConn.query(`SELECT image, title FROM short_novels WHERE short_novels.group = 'rightOfShortNovels' ORDER 
        BY id`);
        queriedData.data.rightOfShortNovels = rows;

        [rows, fields] = await promiseConn.query("SELECT image, title FROM review_novels ORDER BY id");
        queriedData.data.reviewNovels = rows;

        [rows, fields] = await promiseConn.query("SELECT name AS title, view FROM novels ORDER BY view DESC LIMIT 10");
        queriedData.data.topGoodNovels = rows;

        [rows, fields] = await promiseConn.query(`SELECT name AS title, view FROM novels WHERE first_time = last_time ORDER BY first_time 
        DESC LIMIT 10`);
        queriedData.data.newUpdateNovels = rows;

        [rows, fields] = await promiseConn.query("SELECT name FROM trend_novels_in_month ORDER BY id");
        queriedData.data.trendNovelsInMonth = [];

        for (let i = 0; i < rows.length; i++)
        {
            queriedData.data.trendNovelsInMonth.push(rows[i].name);
        }

        pool.releaseConnection(conn);
        const data = JSON.stringify(queriedData);
        res.send(data);
    });
});

app.post('/data', (req, res) => {
    pool.getConnection(async (err, conn) => {
        let promiseConn = conn.promise();
        let rows, fields;
        let queriedData = {lastUpdatedTime: {}, data: {}};

        [rows, fields] = await promiseConn.query("SELECT * FROM last_updated_time");

        for (let i = 0; i < rows.length; i++) {
            queriedData.lastUpdatedTime[rows[i].section] = rows[i].time;
        }

        let updatedTime = req.body;
        let lastUpdatedTime = queriedData.lastUpdatedTime;

        if (updatedTime.suggestedNovels !== lastUpdatedTime.suggestedNovels) {
            [rows, fields] = await promiseConn.query(`SELECT novels.name, novels.before, novels.after, novels.image, suggested_novels.chapter 
            FROM suggested_novels JOIN novels ON suggested_novels.name = novels.name ORDER BY id`);
            queriedData.data.suggestedNovels = rows;
        }

        if (updatedTime.selectedTranslationNovels !== lastUpdatedTime.selectedTranslationNovels) {
            [rows, fields] = await promiseConn.query(`SELECT novels.name, novels.before, novels.after, novels.image, 
            selected_translation_novels.chapter FROM selected_translation_novels JOIN novels ON selected_translation_novels.name = novels.name 
            ORDER BY id`);
            queriedData.data.selectedTranslationNovels = rows;
        }

        if (updatedTime.updatedNovels !== lastUpdatedTime.updatedNovels) {
            [rows, fields] = await promiseConn.query(`SELECT name, novels.before, after, note, current_chapter AS chapter, last_time FROM 
            novels WHERE first_time != last_time ORDER BY last_time DESC LIMIT 25`);
            queriedData.data.updatedNovels = rows;
        }

        if (updatedTime.fullNovels !== lastUpdatedTime.fullNovels) {
            [rows, fields] = await promiseConn.query(`SELECT novels.name, novels.before, novels.after, novels.image, novels.current_chapter AS 
            chapter FROM full_novels JOIN novels ON full_novels.name = novels.name ORDER BY id`);
            queriedData.data.fullNovels = rows;
        }

        if (updatedTime.leftOfShortNovel !== lastUpdatedTime.leftOfShortNovel) {
            [rows, fields] = await promiseConn.query("SELECT image, title FROM short_novels WHERE short_novels.group = 'leftOfShortNovel'");
            queriedData.data.leftOfShortNovel = rows[0];
        }

        if (updatedTime.rightOfShortNovels !== lastUpdatedTime.rightOfShortNovels) {
            [rows, fields] = await promiseConn.query(`SELECT image, title FROM short_novels WHERE short_novels.group = 'rightOfShortNovels' 
            ORDER BY id`);
            queriedData.data.rightOfShortNovels = rows;
        }

        if (updatedTime.reviewNovels !== lastUpdatedTime.reviewNovels) {
            [rows, fields] = await promiseConn.query("SELECT image, title FROM review_novels ORDER BY id");
            queriedData.data.reviewNovels = rows;
        }

        if (updatedTime.topGoodNovels !== lastUpdatedTime.topGoodNovels) {
            [rows, fields] = await promiseConn.query("SELECT name AS title, view FROM novels ORDER BY view DESC LIMIT 10");
            queriedData.data.topGoodNovels = rows;
        }

        if (updatedTime.newUpdateNovels !== lastUpdatedTime.newUpdateNovels) {
            [rows, fields] = await promiseConn.query(`SELECT name AS title, view FROM novels WHERE first_time = last_time ORDER BY first_time 
            DESC LIMIT 10`);
            queriedData.data.newUpdateNovels = rows;
        }

        if (updatedTime.trendNovelsInMonth !== lastUpdatedTime.trendNovelsInMonth) {
            [rows, fields] = await promiseConn.query("SELECT name FROM trend_novels_in_month ORDER BY id");
            queriedData.data.trendNovelsInMonth = [];

            for (let i = 0; i < rows.length; i++) {
                queriedData.data.trendNovelsInMonth.push(rows[i].name);
            }
        }

        pool.releaseConnection(conn);
        const data = JSON.stringify(queriedData);
        res.send(data);
    });
});

app.listen(4000, () => {});