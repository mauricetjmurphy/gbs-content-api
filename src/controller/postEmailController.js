import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

import ddbDocClient from "../../config/dynamobdConfig.js";

dotenv.config();

export const postEmail = async (email) => {
  try {
    await ddbDocClient.send(
      new PutCommand({
        TableName: process.env.MAILING_LIST_TABLE,
        Item: {
          Id: uuidv4(),
          Email: email.email,
        },
      })
    );
    console.log("PutCommand succeeded");
    return {
      statusCode: 200,
      body: JSON.stringify(email.email),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    };
  }
};
