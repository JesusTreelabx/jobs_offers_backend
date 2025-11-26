//

import { getTemplatesByEmployer } from '../services/vacancyTemplateService.js';


// Controller to list vacancy templates for an employer
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