import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import dotenv from "dotenv";

import ddbDocClient from "../../config/dynamobdConfig.js";

dotenv.config();

export const updateArticle = async (id, updatedArticle) => {
  try {
    const { Title, Category, Body, Author, Date, Image_url } = updatedArticle;

    const params = {
      TableName: process.env.ARTICLES_TABLE,
      Key: marshall({ Id: { S: id } }),
      UpdateExpression:
        "SET #t = :t, #c = :c, #b = :b, #a = :a, #d = :d" +
        (Image_url ? ", #i = :i" : ""),
      ExpressionAttributeNames: {
        "#t": "Title",
        "#c": "Category",
        "#b": "Body",
        "#a": "Author",
        "#d": "Date",
        ...(Image_url && { "#i": "Image_url" }),
      },
      ExpressionAttributeValues: marshall({
        ":t": Title,
        ":c": Category,
        ":b": Body,
        ":a": Author,
        ":d": Date,
        ...(Image_url && { ":i": Image_url }),
      }),
      ReturnValues: "ALL_NEW",
    };

    const response = await ddbDocClient.send(new UpdateItemCommand(params));

    console.log("UpdateCommand succeeded:", response.Attributes);

    const parsedItem = {
      ...marshall(response.Attributes),
      Body: JSON.parse(marshall(response.Attributes).Body),
    };

    return {
      statusCode: 200,
      body: JSON.stringify(parsedItem),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    };
  }
};
