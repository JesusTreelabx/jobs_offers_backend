import { Router } from 'express';

import { publishVacancy } from '../controllers/vacancyPublishController.js';
import { validateVacancy, vacancyValidationRules } from '../validators/vacancyValidation.js';



const employerRouter = Router();

employerRouter.post('/vacancy/publish',
    vacancyValidationRules,
    validateVacancy, 
    publishVacancy,
);


export default employerRouter;