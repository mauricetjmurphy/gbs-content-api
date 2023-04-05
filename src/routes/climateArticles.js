import express from "express";
import { getClimateArticlesFromDB } from "../controller/getClimateArticlesFromDBController.js";

// import { getClimateArticles } from "../handlers/getClimateArticlesHandler.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getClimateArticlesFromDB();
  res.status(response.statusCode).send(response.body);
});

export default router;
