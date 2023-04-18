import express from 'express';
import { PORT } from './config';

const app = express();

app.get('/', (req, res) => {
    res.send(`<h1>Server is up!</h1><span>${new Date()}</span>`);
});

app.listen(PORT, () => {
    console.log(`🚀 Server is up at http://localhost:${PORT}`);
});
