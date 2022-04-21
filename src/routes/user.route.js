const express = require("express");
const authUser = require("../middleware/auth");
const authAdmin = require("../middleware/auth");
const { findByIdAndDelete } = require("../models/user.model");
const router = new express.Router();
const User = require("../models/user.model");

router.post("/user", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});
router.post("/user/admin-login", async (req, res) => {
  try {
    const user = await User.findByCredentialsAdmin(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});
router.post("/user/logout", authUser, async (req, res) => {
  console.log(req.user);
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      console.log(req.user.tokens);
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
router.post("/user/admin-logout", authAdmin, async (req, res) => {
  console.log(req.user);
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      console.log(req.user.tokens);
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
router.post("/user/logoutAll", authUser, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/user/me", authUser, async (req, res) => {
  res.send(req.user);
});

router.get("/user", authAdmin, async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});
router.get("/user/:id", authAdmin, async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(203).send();
  }
});

router.patch("/user/:id", authUser, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await user.save();

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/user/me", authUser, async (req, res) => {
  try {
    await req.user.remove();

    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/user/:id", authUser, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
