import express from "express";
import { getArticles } from "../controller/getArticlesController.js";
import { updateArticle } from "../controller/updateArticleController.js";
import { deleteArticle } from "../controller/deleteArticleController.js";
import { addArticle } from "../controller/postArticleController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getArticles();
  res.status(response.statusCode).send(response.body);
});

router.post("/update", async (req, res) => {
  const { id, originalCreatedAt, updatedArticle } = req.body;

  const response = await updateArticle(id, originalCreatedAt, updatedArticle);
  res.status(response.statusCode).send(response.body);
});

router.post("/add", async (req, res) => {
  const article = req.body;

  const response = await addArticle(article);
  res.status(response.statusCode).send(response.body);
});

router.delete("/delete", async (req, res) => {
  const { id, createdAt } = req.body;

  const response = await deleteArticle(id, createdAt);
  res.status(response.statusCode).send(response.body);
});

export default router;
