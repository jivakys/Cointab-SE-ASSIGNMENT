const db = require("../DB");
const axios = require("axios");

class Post {
  constructor(id, userId, title, body) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }

  static async getAllPosts(userId) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    return response.data;
  }

  static async addPost(post) {
    const query = "INSERT INTO posts SET ?";
    return new Promise((resolve, reject) => {
      db.query(query, post, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static async checkPost(id) {
    const query = "SELECT * FROM posts WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.query(query, id, (err, result) => {
        if (err) reject(err);
        resolve(result.length > 0);
      });
    });
  }

  static async getPost(id) {
    const query = "SELECT * FROM posts WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.query(query, id, (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }
}

module.exports = Post;
