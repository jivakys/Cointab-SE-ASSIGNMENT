const express = require("express");
const router = express.Router();
const User = require("../MODELS");

router.get("/", async (req, res) => {
  const users = await User.getAllUsers();
  res.render("home", { users });
});

router.post("/add", async (req, res) => {
  const user = new User(
    null,
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.website,
    req.body.city,
    req.body.company
  );
  await User.addUser(user);
  res.redirect("/");
});

router.get("/check/:id", async (req, res) => {
  const exists = await User.checkUser(req.params.id);
  res.json({ exists });
});

router.get("/:id", async (req, res) => {
  const user = await User.getUser(req.params.id);
  res.render("post", { user });
});

module.exports = router;
