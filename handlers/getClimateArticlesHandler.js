import { GetObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

import s3Client from "../config/s3Config.js";

dotenv.config();

export const getClimateArticles = async () => {
  try {
    // Get a list of all the directories in the S3 bucket.
    const listObjectsOutput = await s3Client.send(
      new ListObjectsCommand({
        Bucket: process.env.CLIMATE_BUCKET_NAME,
        Delimiter: "/",
        Prefix: "", // You can set this to the path to the directory that contains the date-named directories.
      })
    );

    // Sort the list of directories by date in descending order.
    const sortedDirectories = listObjectsOutput.CommonPrefixes.sort(
      (a, b) => new Date(b.Prefix) - new Date(a.Prefix)
    );

    // Get the name of the directory with the latest date.
    const latestDirectory = sortedDirectories[0].Prefix;

    // Get a list of all the files in the latest directory.
    const listObjectsOutput2 = await s3Client.send(
      new ListObjectsCommand({
        Bucket: process.env.CLIMATE_BUCKET_NAME,
        Prefix: latestDirectory,
      })
    );

    // Retrieve the files and return them as an array of JSON objects.
    const objects = await Promise.all(
      listObjectsOutput2.Contents.map(async ({ Key }) => {
        const objectOutput = await s3Client.send(
          new GetObjectCommand({
            Bucket: process.env.CLIMATE_BUCKET_NAME,
            Key,
          })
        );
        const contents = await streamToString(objectOutput.Body);
        console.log(JSON.parse(contents));
        return JSON.parse(contents);
      })
    );

    return {
      statusCode: 200,
      body: objects,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "Internal server error",
    };
  }
};

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
