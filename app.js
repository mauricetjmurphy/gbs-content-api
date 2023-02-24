import express from "express";
import bodyParser from "body-parser";

import { corsMiddleware } from "./middleware/cors.js";

const app = express();

// Import routes
import mainRoutes from "./routes/main.js";
import healthRoutes from "./routes/health.js";
import techArticlesRoutes from "./routes/techArticles.js";
import climateArticlesRoutes from "./routes/techArticles.js";
import signupRoute from "./routes/signup.js";
import messagesRoute from "./routes/message.js";

app.use(bodyParser.json());

// Apply the CORS middleware to all incoming requests
app.use(corsMiddleware);

// Use routes
app.use("/", mainRoutes);
app.use("/health", healthRoutes);
app.use("/tech-articles", techArticlesRoutes);
app.use("/climate-articles", climateArticlesRoutes);
app.use("/signup", signupRoute);
app.use("/message", messagesRoute);

export default app;
