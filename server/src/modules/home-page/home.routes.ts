
import app from '../../app.js';
import {getHomePage, postHomePage} from './home.controller.js';

app.get('/data', getHomePage);
app.post('/data', postHomePage);