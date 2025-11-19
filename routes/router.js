import { Router } from 'express';


const jobsRouter = Router();




// Example route
jobsRouter.get('/testRouter', (req, res) => {
    res.send('Hello World from testRouter!');
});


jobsRouter.get('/vacancies'),(req, res) => {
    res.send('List of job vacancies');
}

export default jobsRouter;