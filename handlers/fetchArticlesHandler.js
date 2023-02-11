const AWS = require("aws-sdk");
const S3 = new AWS.S3();
const dotenv = require("dotenv");

dotenv.config();

AWS.config.update({
  region: "us-east-1",
});

exports.fetchArticles = async (event) => {
  const bucketParams = {
    Bucket: "gbs-blog-articles",
  };

  try {
    const bucketResult = await S3.listObjectsV2(bucketParams).promise();
    const directories = bucketResult.CommonPrefixes.map(
      (commonPrefix) => commonPrefix.Prefix
    );
    const latestDirectory = directories.sort().pop();
    const articleParams = {
      Bucket: "gbs-blog-articles",
      Prefix: latestDirectory,
    };
    const articleResult = await S3.listObjectsV2(articleParams).promise();
    const articleFiles = articleResult.Contents.filter((object) =>
      object.Key.endsWith(".json")
    );
    const articlePromises = articleFiles.map((articleFile) =>
      S3.getObject({
        Bucket: "gbs-blog-articles",
        Key: articleFile.Key,
      }).promise()
    );
    const articles = await Promise.all(articlePromises);
    const articlesData = articles.map((article) => JSON.parse(article.Body));
    // const articlesBody = articlesData.map((articleData) => {
    //   let bodyArray = JSON.parse(articleData.Body);
    //   articleData.Body = bodyArray;
    //   return articleData;
    // });
    return {
      statusCode: 200,
      body: JSON.stringify(articlesData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `Error fetching articles: ${error.stack}`,
      }),
    };
  }
};
