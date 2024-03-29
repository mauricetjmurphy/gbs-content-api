import express from "express";

import { postEmail } from "../controller/postEmailController.js";
import { getEmails } from "../controller/getEmailsController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getEmails();
  res.status(response.statusCode).send(response.body);
});

router.post("/", (req, res) => {
  postEmail(req.body)
    .then((response) => {
      res.status(response.statusCode).send(response.body);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    });
});

export default router;
