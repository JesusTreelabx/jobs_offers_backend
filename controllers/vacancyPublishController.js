// Archivo de Flujo 

import { putVacancy, deleteVacancy } from '../services/vacancyPublishService.js';


export const publishVacancy = async (req, res) => {

    console.log("--- 🕵️ DEBUG PUBLISH VACANCY ---");
    console.log("¿Req existe?", !!req);
    console.log("Req Body:", req ? req.body : "Req es nulo");


    try {
        // Extraction
        const vacancyData = req.body;
        const employerId = req.employerId;

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


// Delete Vacancy Controller
export const deleteVacancyController = async (req, res) => {

    const vacancyId = req.params.id;
    const employerId = req.employerId;

    if (!employerId) {
        return res.status(401).json({ 
            message: 'Unauthorized: Employer ID is missing.' });
    }

    // Deletion Process
    try {
        const result = await deleteVacancy(vacancyId, employerId);

        if (result && result.message === "Vacancy not found.") {
            return res.status(404).json({ message: "Vacancy not found." });
        }

        return res.status(200).json({ message: 'Vacancy deleted successfully.' });
    } catch (error) {
        console.error('Error deleting vacancy:', error);
        
        if (error.message.includes("Unauthorized")) {
            return res.status(403).json({ message: error.message });
        }

        return res.status(500).json({
            message: 'An error occurred while deleting the vacancy.',
            error: error.message
        });
    }
}