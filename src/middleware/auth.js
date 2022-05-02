const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "mysignatured");

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Not found");
    }

    if (user.role !== "Admin") {
      return res.status(401).send({ message: "Not Authorized" });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "please authenticate" });
  }
};

const authUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "mysignatured");

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Not found");
    }

    if (user.role !== "User") {
      return res.status(401).send({ message: "Not a User" });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "please authenticate" });
  }
};
const authUserOrAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "mysignatured");

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Not found");
    }

    if (user.role != "User" && user.role != "Admin") {
      return res.status(401).send({ message: "Not Authorized" });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "please authenticate" });
  }
};

module.exports = {
  authAdmin,
  authUser,
  authUserOrAdmin,
};
