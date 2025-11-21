// Archivo de Flujo 

import { putVacancy } from '../services/vacancyPublishService.js';


export const publishVacancy = async (req, res) => {


    try {
        // Extraction
        const employerId = req.employerId;
        const vacancyData = req.body;

        // Auth Validation
        if (!employerId) {
            return res.status(401).json({ message: 'Unauthorized: Employer ID is missing.' });
        }

        // Create Vacancy
        const newVacancy = await putVacancy(vacancyData, employerId);

        res.status(201).json({
            message: 'Vacancy published successfully.',
            vacancy: newVacancy
        });
    } 
    catch (error) {
            console.error('Error publishing vacancy:', error);
            res.status(500).json({
                message: 'An error occurred while publishing the vacancy.',
                error: error.message
            });
        }
};
