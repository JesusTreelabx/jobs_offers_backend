//

import { getTemplatesByEmployer, saveTemplate, deleteTemplate } from '../services/vacancyTemplateService.js';
// UUID generation
import { randomUUID } from 'crypto';


//  (GET) Controller to list vacancy templates
export const listTemplatesController = async (req, res) => {
    const employerId = req.employerId;
    // Auth Validation
    if (!employerId) {
        return res.status(401).json({ message: 'Unauthorized: Employer ID is missing.' });
    }

    // get templates
    try {
        const templates = await getTemplatesByEmployer(employerId);
        return res.status(200).json(templates);

    }  catch (error) {
        console.error("Error in listTemplatesController:", error);
        return res.status(500).json({ 
            message: 'An error occurred while retrieving templates.', 
            error: error.message 
        });
    }
};



// (POST) Controller to create a new vacancy template
export const createTemplateController = async (req, res) => {
    const employerId = req.employerId;
    const templateData = req.body;

    // Auth Validation
    if (!employerId) {
        return res.status(401).json({ message: 'Unauthorized: Employer ID is missing.' });
    }

// Prepare new template data
    const newTemplate = {
        ...templateData,
        ID: randomUUID(),
        employerId: employerId,
        isTemplate: true,
    };

// Save template
    try {
        const savedTemplate = await saveTemplate(newTemplate);
        return res.status(201).json({
            message: "Template created successfully.",
            template: savedTemplate
        });
    } catch (error) {
        console.error("Error in createTemplateController:", error);
        return res.status(500).json({ 
            message: 'An error occurred while creating the template.', 
            error: error.message
        });
    }
};



// (DELETE) Controller to delete a vacancy template
export const deleteTemplateController = async (req, res) => {
    const templateID = req.params.id;
    const employerId = req.employerId;

    // Auth Validation
    if (!employerId) {
        return res.status(401).json({message: 'Unauthorized: Employer ID is missing.' });
    }

    if (!templateID) {
        return res.status(400).json({ message: 'Bad Request: Template ID is required.' });
    }

    // Delete template
    try {
        await deleteTemplate(templateID, employerId);
        return res.status(204).send()
    } catch (error) {
        console.error("Error in deleteTemplateController:", error);

    // Specific error handling for not found or unauthorized
        if (error.message === "Template not found or unauthorized to delete.") {
            return res.status(404).json({ 
                message: error.message 
            });
    }
        return res.status(500).json({ 
            message: 'An error occurred while deleting the template.', 
            error: error.message 
        });
    }
};