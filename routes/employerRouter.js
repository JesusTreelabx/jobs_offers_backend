import { Router } from 'express';

import { publishVacancy, deleteVacancyController } from '../controllers/vacancyPublishController.js';
import { validateVacancy, vacancyValidationRules } from '../validators/vacancyValidation.js';


const employerRouter = Router();

// Middleware to extract employer ID from headers
const authMiddleware = (req, res, next) => {

    req.employerId = req.header('x-employer-id');

    if (!req.employerId) {
        return res.status(401).json({ error: 'Unauthorized: Employer ID missing' });
    }

    next();
};


employerRouter.post('/vacancy/publish',
    authMiddleware,
    vacancyValidationRules,
    validateVacancy, 
    publishVacancy,
);

employerRouter.delete('/vacancy/publish/:id',
    authMiddleware,
    deleteVacancyController,
);

export default employerRouter;