// Este archivo es el que se conecta a DynamoDB para guardar los datos

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);


// Vacancy Data

// @param {Object} vacancyData
// @param {string} employerId 
// @returns {Promise<Object>}


// Save a new Vacancy
export const putVacancy = async (vacancyData, employerId) => {

    // ID Generation
    const uniqueId = `VAC-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`;

    // Item preparation
    const Item = {
        id: uniqueId,
        employerId: employerId,
        creationDate: new Date().toISOString(),
        ...vacancyData  
    };

    const params = {
        TableName: "jobsOffersTable",
        Item: Item
    };

    try {
        await ddbDocClient.send(new PutCommand(params));
        return Item;
    } catch (error) {
        console.error("Error saving vacancy:", error);
        throw error;
    }
};



// Delete Vacancy
// export const deleteVacancy = async (vacancyId, employerId) => {


//     const params = {
//         TableName: "jobsOffersTable",
//         Key: { id: vacancyId },
//     };

//     const { Item } = await ddbDocClient.send(new GetCommand(params));

//     if (!Item) {
//         throw new Error("Vacancy not found");
//     }
//     if (Item.employerId !== employerId) {
//         throw new Error("Unauthorized: Employer ID does not match");
//     }


//     const deleteParams = {
//         TableName: "jobsOffersTable",
//         Key: { id: vacancyId },
//     };

//     try {
//         await ddbDocClient.send(new DeleteCommand(deleteParams));
//         return { message: "Vacancy deleted successfully" };
//     } catch (error) {
//         console.error("Error deleting vacancy:", error);
//         throw error;
//     }
// };