import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";

import ddbDocClient from "../../config/dynamobdConfig.js";

export async function deleteArticle(id, createdAt) {
  try {
    const deleteParams = {
      TableName: process.env.ARTICLES_TABLE,
      Key: {
        Id: { S: id },
        CreatedAt: { S: createdAt },
      },
    };

    console.log("Delete params:", deleteParams);

    const command = new DeleteItemCommand(deleteParams);
    const data = await ddbDocClient.send(command);

    console.log("Item deleted successfully:", data);

    return {
      statusCode: 200,
      body: {
        message: "Item deleted successfully",
        data,
      },
    };
  } catch (error) {
    console.error("Error deleting item:", error);
    return {
      statusCode: 500,
      body: {
        message: "Error deleting item",
        error,
      },
    };
  }
}
