const express = require("express");
const router = express.Router();
const postController = require("../controllers/postControllers");

router.get("/fetchPosts/:userId", postController.fetchPosts);

router.post("/bulkAddPosts/:userId", postController.bulkAddPosts);

router.get(
  "/downloadPostsInExcel/:userId",
  postController.downloadPostsInExcel
);

module.exports = router;
