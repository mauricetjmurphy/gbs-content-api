import { ScanCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

import ddbDocClient from "../../config/dynamobdConfig.js";

dotenv.config();

export const getEmails = async () => {
  try {
    const response = await ddbDocClient.send(
      new ScanCommand({
        TableName: process.env.MAILING_LIST_TABLE,
      })
    );
    console.log("GetCommand succeeded");
    return {
      statusCode: 200,
      body: JSON.stringify(response.Items),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    };
  }
};
