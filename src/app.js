import express from "express";
import bodyParser from "body-parser";

import { corsMiddleware } from "./middleware/cors.js";

const app = express();

// Import routes
import routes from "../src/routes/index.js";

app.use(bodyParser.json());

// Apply the CORS middleware to all incoming requests
app.use(corsMiddleware);

// Use routes
app.use("/", routes);

export default app;
