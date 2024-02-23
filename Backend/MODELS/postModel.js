const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Post = sequelize.define("Post", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Post;
