import { ScanCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

import ddbDocClient from "../config/dynamobdConfig.js";

dotenv.config();

export const getMessages = async (req, res) => {
  try {
    const command = new ScanCommand({
      TableName: process.env.MESSAGES_TABLE,
    });

    const { Items: messages } = await ddbDocClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify(messages),
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not retrieve messages" });
  }
};
