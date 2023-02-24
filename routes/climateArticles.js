import express from "express";

import { getClimateArticles } from "../handlers/getClimateArticlesHandler.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getClimateArticles();
  res.status(response.statusCode).send(response.body);
});

export default router;
