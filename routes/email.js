const express = require("express");
const router = express.Router();
const postEmailHandler = require("../handlers/postEmailHandler");

router.post("/", async (req, res) => {
  const response = await postEmailHandler.postEmail(req.body);
  res.status(response.statusCode).send(response.body);
});

module.exports = router;
