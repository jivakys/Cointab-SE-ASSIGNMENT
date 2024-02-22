const express = require("express");
const router = express.Router();
const Post = require("../MODELS/postModel");

router.get("/:id", async (req, res) => {
  const posts = await Post.getAllPosts(req.params.id);
  res.json({ posts });
});

router.post("/:id/add", async (req, res) => {
  const post = new Post(null, req.params.id, req.body.title, req.body.body);
  await Post.addPost(post);
  res.redirect(`/users/${req.params.id}`);
});

router.get("/:id/check/:postId", async (req, res) => {
  const exists = await Post.checkPost(req.params.postId);
  res.json({ exists });
});

router.get("/:id/post/:postId", async (req, res) => {
  const post = await Post.getPost(req.params.postId);
  res.render("post", { post });
});

module.exports = router;
