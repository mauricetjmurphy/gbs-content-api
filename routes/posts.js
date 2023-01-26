const express = require("express");
const router = express.Router();
const fetchPostsHandler = require("../handlers/fetchPostsHandler");

router.get("/", async (req, res) => {
  const response = await fetchPostsHandler.fetchPosts();
  res.status(response.statusCode).send(response.body);
});

module.exports = router;
