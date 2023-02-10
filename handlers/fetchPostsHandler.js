const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const dotenv = require("dotenv");

dotenv.config();

AWS.config.update({
  region: "us-east-1",
});

exports.fetchPosts = async (event) => {
  const params = {
    TableName: "gbs-blog-articles",
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Error fetching posts: ${error.stack}` }),
    };
  }
};
