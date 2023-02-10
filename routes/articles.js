const express = require("express");
const router = express.Router();
const fetchArticlesHandler = require("../handlers/fetchArticlesHandler");

router.get("/", async (req, res) => {
  const response = await fetchArticlesHandler.fetchArticles();
  res.status(response.statusCode).send(response.body);
});

module.exports = router;
