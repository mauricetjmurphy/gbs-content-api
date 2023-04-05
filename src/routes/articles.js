import express from "express";
import { getArticles } from "../controller/getArticlesController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getArticles();
  res.status(response.statusCode).send(response.body);
});

export default router;
