// Este archivo es el que se conecta a DynamoDB para guardar los datos

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

// Configuration of DynamoDB Client
const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "jobsOffersTable";


// Get Vacancy Templates by Employer ID
export const getTemplatesByEmployer = async (employerId) => {
    // Scan parameters to filter by employerId and isTemplate flag
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: "employerId = :eId AND isTemplate = :template",
        ExpressionAttributeValues: {
            ":eId": employerId,
            ":template": true
        },
    };


    // Execute the scan operation
    try {
        const result = await ddbDocClient.send(new ScanCommand(params));
        // Return the list of templates
        return result.Items || [];
    } catch (error) {
        console.error("Error fetching templates:", error);
        throw error;
    }
};


// POST a new Vacancy Template
export const saveTemplate = async (templateData) => {

    const params = {
        TableName: TABLE_NAME,
        Item: templateData,
    };

    try {
        await ddbDocClient.send(new PutCommand(params));
        return templateData;
    } catch (error) {
        console.error("Error saving template:", error);
        throw error;
    }
};


// DELETE a Vacancy Template by ID
export const deleteTemplate = async (templateID, employerId) => {

    // Delete parameters with condition to ensure ownership
    const params = {
        TableName: TABLE_NAME,
        Key: {
            ID: templateID
        },
        // Ensure that only the owner can delete the template
        ConditionExpression: "employerId = :eId AND isTemplate = :template",
        ExpressionAttributeValues: {
            ":eId": employerId,
            ":template": true
        },
    };

// Execute the delete operation
    try {
        await ddbDocClient.send(new DeleteCommand(params));
        return true;
    } catch (error) {
        if (error.name === "ConditionalCheckFailedException") {
            console.warn(`Attempt to delete template ${templateID} failed due to ownership or missing item.`);
            throw new Error("Template not found or unauthorized to delete.");
        }
        console.error("Error deleting template:", error);
        throw error;   
    }
};