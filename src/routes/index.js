import express from "express";

// Import routes
import mainRoutes from "./main.js";
import healthRoutes from "./health.js";
import articlesRoutes from "./articles.js";
import signupRoute from "./signup.js";
import messagesRoute from "./message.js";
import userPosts from "./userPosts.js";

const router = express.Router();

// Use routes
router.use("/", mainRoutes);
router.use("/health", healthRoutes);
router.use("/articles", articlesRoutes);
router.use("/user-post", userPosts);
router.use("/signup", signupRoute);
router.use("/message", messagesRoute);

export default router;
