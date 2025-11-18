import { Router } from 'express';


const jobsRouter = Router();




// Example route
jobsRouter.get('/testRouter', (req, res) => {
    res.send('Hello World from testRouter!');
});


export default jobsRouter;