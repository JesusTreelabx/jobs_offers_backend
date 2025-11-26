import express from 'express';
import jobsRouter from './routes/router.js';
import cors from 'cors';

const app = express();
const port = process.env.port || 3000;

app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'x-employer-id'],
}));

app.use(express.json());
app.use(jobsRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});