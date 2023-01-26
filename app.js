const express = require("express");
const app = express();
const cors = require("cors");

// Import routes
const mainRoutes = require("./routes/main");
const healthRoutes = require("./routes/health");
const postsRoutes = require("./routes/posts");

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

module.exports = app;
