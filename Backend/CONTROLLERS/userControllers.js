const axios = require("axios");
const User = require("../models/userModel");

module.exports = {
  fetchAllUsers: async (req, res) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = response.data;
      const existingUsers = await User.findAll();
      if (existingUsers.length === 0) {
        await User.bulkCreate(users);
      }
      res.json({ users: existingUsers });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  fetchUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  fetchUserByEmail: async (req, res) => {
    try {
      const userEmail = req.params.email;
      const user = await User.findOne({ where: { email: userEmail } });
      res.json(user);
    } catch (error) {
      console.error("Error fetching user by email:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  addUser: async (req, res) => {
    try {
      const user = req.body;
      console.log(user);
      const existingUser = await User.findOne({ where: { email: user.email } });
      if (existingUser) {
        console.log("User already exists.");
        res.json({ message: "User already exists.", showOpenButton: true });
      } else {
        await User.create(user);
        res.json({ message: "User added successfully.", showOpenButton: true });
        console.log("User added.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Internal server error.", error });
    }
  },
};
