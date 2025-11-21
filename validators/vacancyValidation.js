// Express validaotor

import { body, validationResult } from 'express-validator';


export const vacancyValidationRules = [

    body('title')
        .isString().withMessage('Title must be a text')
        .trim().isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),

    body('description')
        .isString().withMessage('Description must be a text')
        .isLength({ min: 50 }).withMessage('Description must be at least 50 characters long'),

    body('location')
        .notEmpty().withMessage('Location is required'),

    body('salaryRange')
        .notEmpty().withMessage('Salary range is required'),

    body('requirements').optional().isArray().withMessage('Requirements must be an array of strings'),
    body('expirationDate').optional().isISO8601().withMessage('Expiration date must be a valid date'), 
];


// Middleware to handle validation results
export const validateVacancy = (req, res, next) => {
    const errors = validationResult(req);
    

    if (errors.isEmpty()) {
        return next();
    }


    const validationErrors = errors.array().map(err => ({
        field: err.path, 
        message: err.msg
    }));

    res.status(400).json({
        message: 'Validation errors occurred.',
        errors: validationErrors
    });
};