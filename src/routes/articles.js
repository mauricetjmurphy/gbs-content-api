import express from "express";
import { getArticles } from "../controller/getArticlesController.js";
import { updateArticle } from "../controller/updateArticleController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getArticles();
  res.status(response.statusCode).send(response.body);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedArticle = req.body;
  const response = await updateArticle(id, updatedArticle);
  res.status(response.statusCode).send(response.body);
});

export default router;
