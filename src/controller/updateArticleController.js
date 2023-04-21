import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";

import ddbDocClient from "../../config/dynamobdConfig.js";

export async function updateArticle(id, itemData) {
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
        Id: { S: id },
        CreatedAt: { S: CreatedAt },
      },
      UpdateExpression:
        "set #t = :title, #c = :category, #ct = :categoryTitle, #b = :body, #a = :author, #ts = :topStory, #ud = :updatedAt, #i = :imageUrl",
      ExpressionAttributeNames: {
        "#t": "Title",
        "#c": "Category",
        "#ct": "CategoryTitle",
        "#b": "Body",
        "#a": "Author",
        "#ts": "TopStory",
        "#ud": "UpdatedAt",
        "#i": "Image_url",
      },
      ExpressionAttributeValues: {
        ":title": { S: Title },
        ":category": { S: Category },
        ":categoryTitle": { S: CategoryTitle },
        ":body": { S: JSON.stringify(Body) },
        ":author": { S: Author },
        ":topStory": { S: TopStory },
        ":updatedAt": { S: UpdatedAt },
        ":imageUrl": { S: Image_url },
      },
      ReturnValues: "ALL_NEW",
    };

    console.log("Update params:", updateParams);

    const command = new UpdateItemCommand(updateParams);
    const data = await ddbDocClient.send(command);

    console.log(`Item updated successfully`);

    return {
      statusCode: 200,
      body: {
        message: "Item updated successfully",
        data,
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
