import express from "express";
import { getInitialArticles } from "../controller/getInitialArticlesController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getInitialArticles();
  res.status(response.statusCode).send(response.body);
});

export default router;
