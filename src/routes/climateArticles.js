import express from "express";
<<<<<<< HEAD

import { getClimateArticles } from "../handlers/getClimateArticlesHandler.js";
=======
import { getClimateArticlesFromDB } from "../handlers/getClimateArticlesFromDB.js";

// import { getClimateArticles } from "../handlers/getClimateArticlesHandler.js";
>>>>>>> ed3002ae7918facf57f93c1feaa0705870da8b76

const router = express.Router();

router.get("/", async (req, res) => {
<<<<<<< HEAD
  const response = await getClimateArticles();
=======
  const response = await getClimateArticlesFromDB();
>>>>>>> ed3002ae7918facf57f93c1feaa0705870da8b76
  res.status(response.statusCode).send(response.body);
});

export default router;
