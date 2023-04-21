import express from "express";
import { getArticles } from "../controller/getArticlesController.js";
import { updateArticle } from "../controller/updateArticleController.js";
import { deleteArticle } from "../controller/deleteArticleController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getArticles();
  res.status(response.statusCode).send(response.body);
});

router.post("/update", async (req, res) => {
  const { id, updatedArticle } = req.body;
  const response = await updateArticle(id, updatedArticle);
  res.status(response.statusCode).send(response.body);
});

router.delete("/:id/:createdAt", async (req, res) => {
  const id = req.params.id;
  const createdAt = req.params.createdAt;
  const response = await deleteArticle(id, createdAt);
  res.status(response.statusCode).send(response.body);
});

export default router;
