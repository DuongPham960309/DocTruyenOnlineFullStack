import './modules/home-page/home.routes.js';
import app from './app.js';
import env from './config/env.js';

app.listen(env.SERVER_PORT, env.SERVER_HOST, () => {
    console.log(`\x1b[32m Server started on ${env.SERVER_HOST}:${env.SERVER_PORT}\x1b[0m`);
}).on('error', (error) => {
    console.error(`\x1b[31m Server failed: ${error.message}\x1b[0m`);
});