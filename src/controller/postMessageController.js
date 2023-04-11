import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

import ddbDocClient from "../../config/dynamobdConfig.js";

dotenv.config();

export async function postMessage(req, res) {
  const { firstName, lastName, email, message } = req.body;

  // Generate a unique ID for the new message
  const id = uuidv4();

  // Create a new message object
  const newMessage = {
    Id: id,
    Date: new Date().toISOString(),
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Message: message,
  };

  const command = new PutItemCommand({
    TableName: process.env.MESSAGES_TABLE,
    Item: marshall(newMessage),
  });

  try {
    await ddbDocClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify(newMessage),
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not send message" });
  }
}
