import express from "express";

// Import routes
import mainRoutes from "./main.js";
import healthRoutes from "./health.js";
import techArticlesRoutes from "./techArticles.js";
import climateArticlesRoutes from "./climateArticles.js";
import signupRoute from "./signup.js";
import messagesRoute from "./message.js";

const router = express.Router();

// Use routes
router.use("/", mainRoutes);
router.use("/health", healthRoutes);
router.use("/tech-articles", techArticlesRoutes);
router.use("/climate-articles", climateArticlesRoutes);
router.use("/signup", signupRoute);
router.use("/message", messagesRoute);

export default router;
