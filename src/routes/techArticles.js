import express from "express";
import { getTechArticlesFromDB } from "../handlers/getTechArticlesFromDB.js";

// import { getTechArticles } from "../handlers/getTechArticlesHandler.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getTechArticlesFromDB();
  res.status(response.statusCode).send(response.body);
});

export default router;
