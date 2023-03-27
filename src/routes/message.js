import express from "express";

import { getMessages } from "../handlers/getMessagesHandler.js";
import { postMessage } from "../handlers/postMessageHandler.js";

const router = express.Router();

// Get all messages
router.get("/", async (req, res) => {
  const response = await getMessages(req, res);
  res.status(response.statusCode).send(response.body);
});

// Send a message
router.post("/", async (req, res) => {
  const response = await postMessage(req, res);
  res.status(response.statusCode).send(response.body);
});

export default router;
