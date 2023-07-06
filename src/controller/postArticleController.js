import { PutCommand } from "@aws-sdk/lib-dynamodb";
import ddbDocClient from "../../config/dynamobdConfig.js";

export const addArticle = async (article) => {
  try {
    await ddbDocClient.send(
      new PutCommand({
        TableName: process.env.ARTICLES_TABLE,
        Item: {
          Id: article.Id,
          Body: JSON.stringify(article.Body),
          Title: article.Title,
          Image_url: article.Image_url,
          Author: article.Author,
          Category: article.Category,
          CategoryTitle: article.CategoryTitle,
          TopStory: article.TopStory,
          CreatedAt: article.CreatedAt,
          UpdatedAt: article.UpdatedAt,
        },
      })
    );
    console.log("PutCommand succeeded");
    return {
      statusCode: 200,
      body: {
        message: "Item added successfully",
      },
    };
  } catch (error) {
    console.log("Error:", error);

    return {
      statusCode: 500,
      body: {
        message: "Error adding item",
        error,
      },
    };
  }
};
