const db = require("../DB");
const axios = require("axios");
const xlsx = require("xlsx");

class User {
  constructor(id, name, email, phone, website, city, company) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.website = website;
    this.city = city;
    this.company = company;
  }

  static async getAllUsers() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }

  static async addUser(user) {
    const query = "INSERT INTO users SET ?";
    return new Promise((resolve, reject) => {
      db.query(query, user, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static async checkUser(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.query(query, id, (err, result) => {
        if (err) reject(err);
        resolve(result.length > 0);
      });
    });
  }

  static async getUser(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.query(query, id, (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }
}

module.exports = User;
