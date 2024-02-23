const axios = require("axios");
const Post = require("../models/postModel");

module.exports = {
  fetchPosts: async (req, res) => {
    const userId = req.params.userId;
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      const posts = response.data;
      await Post.bulkCreate(posts);
      res.json({ message: "Posts fetched and stored successfully." });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  bulkAddPosts: async (req, res) => {
    const userId = req.params.userId;
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      const postsData = response.data;

      const existingPosts = await Post.findAll({ where: { userId: userId } });

      if (existingPosts.length === 0) {
        await Post.bulkCreate(postsData);
        res.json({ message: "Posts bulk added successfully." });
      } else {
        res.json({ message: "Posts already exist in the database." });
      }
    } catch (error) {
      console.error("Error adding posts:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  downloadPostsInExcel: async (req, res) => {
    const userId = req.params.userId;
    try {
      const posts = await Post.findAll({ where: { userId: userId } });
      res.json({ message: "Download initiated." });
    } catch (error) {
      console.error("Error downloading posts:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  },
};
