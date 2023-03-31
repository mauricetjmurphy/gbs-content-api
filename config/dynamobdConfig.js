import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

dotenv.config();

const client = new DynamoDBClient({
  region: "us-east-1",
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export default ddbDocClient;
