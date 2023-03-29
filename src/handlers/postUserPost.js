import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

import ddbDocClient from "../../config/dynamobdConfig.js";

dotenv.config();

export const sendPost = async ({title, imageUrl, body, author}) => {
  const now = new Date()

  const item = {
    id: uuidv4(),
    title: title,
    image_url: imageUrl,
    body: body,
    author: author,
    date: now.toISOString()
  }

  try {
    await ddbDocClient.send(
      new PutCommand({
        TableName: process.env.USER_POSTS_TABLE,
        Item: item,
      })
    );
    console.log("PutCommand succeeded");
    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    };
  }
};
