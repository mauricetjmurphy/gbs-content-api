const path = require("path");

module.exports = {
  target: "node",
  mode: "production",
  entry: "./lambda.js",
  output: {
    filename: "lambda.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};
