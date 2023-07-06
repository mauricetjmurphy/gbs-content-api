import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

import ddbDocClient from "../../config/dynamobdConfig.js";

export async function updateArticle(id, originalCreatedAt, itemData) {
  try {
    const {
      Title,
      Category,
      CategoryTitle,
      Body,
      Author,
      CreatedAt,
      TopStory,
      UpdatedAt,
      Image_url,
    } = itemData;

    const updateParams = {
      TableName: process.env.ARTICLES_TABLE,
      Key: {
        Id: String(id),
        CreatedAt: String(originalCreatedAt),
      },
      UpdateExpression:
        "set Title = :title, Category = :category, CategoryTitle = :categoryTitle, Body = :body, Author = :author, TopStory = :topStory, UpdatedAt = :updatedAt, Image_url = :image_url",
      ExpressionAttributeValues: {
        ":title": Title,
        ":category": Category,
        ":categoryTitle": CategoryTitle,
        ":body": JSON.stringify(Body),
        ":author": Author,
        ":topStory": TopStory,
        ":updatedAt": UpdatedAt,
        ":image_url": Image_url,
      },
      ConditionExpression:
        "attribute_exists(Id) AND attribute_exists(CreatedAt)",
      ReturnValues: "UPDATED_NEW",
    };

    const updateCommand = new UpdateCommand(updateParams);
    const updateResult = await ddbDocClient.send(updateCommand);
    console.log(`Item updated successfully`, updateResult);

    return {
      statusCode: 200,
      body: {
        message: "Item updated successfully",
      },
    };
  } catch (error) {
    console.log("Error:", error);

    return {
      statusCode: 500,
      body: {
        message: "Error updating item",
        error,
      },
    };
  }
}
