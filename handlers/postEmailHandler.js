const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({
  region: "us-east-1",
});

exports.postEmail = async (email) => {
  const params = {
    TableName: "gbs-blog-mailing-list",
    Item: {
      email: email.emailAddress,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email address added successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Error posting email: ${error.stack}` }),
    };
  }
};
