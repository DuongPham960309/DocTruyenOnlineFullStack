import express from 'express';
import cros from 'cors';
import bodyParser from 'body-parser';
import fakeData from './fakeData.js';

const app = express();

app.use(cros(), bodyParser.json());

app.get('/data', function (req, res) {
    const data = JSON.stringify(fakeData);
    res.send(data);
});

app.listen(4000, () => {});