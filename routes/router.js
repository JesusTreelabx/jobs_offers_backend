import { Router } from 'express';
import candidateRouter from './candidateRouter.js';
import employerRouter from './employerRouter.js';

const jobsRouter = Router();


// Test route
jobsRouter.get('/testRouter', (req, res) => {
    res.send('Hello World from testRouter!');
});


// jobsRouter.use('/candidates', candidateRouter);
jobsRouter.use('/employers', employerRouter);


export default jobsRouter;