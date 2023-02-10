const express = require("express");
const app = express();
const cors = require("cors");

// Import routes
const mainRoutes = require("./routes/main");
const healthRoutes = require("./routes/health");
const postsRoutes = require("./routes/posts");
const articlesRoutes = require("./routes/articles");
const emailRoutes = require("./routes/email");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Use routes
app.use("/", mainRoutes);
app.use("/health", healthRoutes);
app.use("/posts", postsRoutes);
app.use("/articles", articlesRoutes);
app.use("/email", emailRoutes);

module.exports = app;
