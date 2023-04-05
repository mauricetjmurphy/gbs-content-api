import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import dotenv from "dotenv";

import ddbDocClient from "../../config/dynamobdConfig.js";

dotenv.config();

function unmarshallRecursive(record) {
  const unmarshalledRecord = unmarshall(record);
  for (let key in unmarshalledRecord) {
    if (typeof unmarshalledRecord[key] === "object") {
      unmarshalledRecord[key] = unmarshallRecursive(unmarshalledRecord[key]);
    }
  }
  return unmarshalledRecord;
}

export const getClimateArticlesFromDB = async () => {
  try {
    const response = await ddbDocClient.send(
      new ScanCommand({
        TableName: process.env.CLIMATE_ARTICLES_TABLE,
      })
    );

    const items = response.Items.map((item) => {
      const parsedItem = unmarshallRecursive(item);
      parsedItem.Body = JSON.parse(parsedItem.Body);
      return parsedItem;
    });

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
