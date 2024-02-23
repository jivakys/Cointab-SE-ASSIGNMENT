const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const sequelize = require("./database/db");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
