import express from "express";

import { getTechArticles } from "../handlers/getTechArticlesHandler.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getTechArticles();
  res.status(response.statusCode).send(response.body);
});

export default router;
