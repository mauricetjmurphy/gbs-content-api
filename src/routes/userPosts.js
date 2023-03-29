import express from "express";
import { getUserPosts } from "../handlers/getUserPosts.js";
import { sendPost } from "../handlers/postUserPost.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getUserPosts();
  res.status(response.statusCode).send(response.body);
});

router.post("/", (req, res) => {
  sendPost(req.body)
    .then((response) => {
      res.status(response.statusCode).send(response.body);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    });
});

export default router;
