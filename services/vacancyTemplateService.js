// Este archivo es el que se conecta a DynamoDB para guardar los datos

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

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
            "eId": employerId,
            "template": true
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