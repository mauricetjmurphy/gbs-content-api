import express from "express";
<<<<<<< HEAD

import { getTechArticles } from "../controller/getTechArticlesHandler.js.js";
=======
import { getTechArticlesFromDB } from "../handlers/getTechArticlesFromDB.js";

// import { getTechArticles } from "../handlers/getTechArticlesHandler.js";
>>>>>>> ed3002ae7918facf57f93c1feaa0705870da8b76

const router = express.Router();

router.get("/", async (req, res) => {
<<<<<<< HEAD
  const response = await getTechArticles();
=======
  const response = await getTechArticlesFromDB();
>>>>>>> ed3002ae7918facf57f93c1feaa0705870da8b76
  res.status(response.statusCode).send(response.body);
});

export default router;
