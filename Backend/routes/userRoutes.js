const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.get("/fetchUsers", userController.fetchAllUsers);

router.get("/fetchUserById/:id", userController.fetchUserById);

router.get("/fetchUserByEmail/:email", userController.fetchUserByEmail);

router.post("/addUser", userController.addUser);

module.exports = router;
