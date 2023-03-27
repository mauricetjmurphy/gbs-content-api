import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import dotenv from "dotenv";

import ddbDocClient from "../../config/dynamobdConfig.js";

dotenv.config();

export const getClimateArticlesFromDB = async () => {
  try {
    const response = await ddbDocClient.send(
      new ScanCommand({
        TableName: process.env.CLIMATE_ARTICLES_TABLE,
      })
    );
    const items = response.Items.map((item) => unmarshall(item));

    console.log("GetCommand succeeded");
    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    };
  }
};
