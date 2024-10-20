const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const express = require("express");

async function signUp(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userInDb = await User.findOne({ email: email });
    if (userInDb) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = {
      email: email,
      password: hashPassword(password),
    };

    await User.create(user);
    res.status(201).json({ message: "Sign up successful" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function login(req, res) {
  const body = req.body;
  const email = body.email;
  const password = body.password;

  try {
    const userInDb = await User.findOne({ email: email });
    if (!userInDb) {
      return res.status(401).json({ message: "Wrong email" });
    }

    const passwordInDb = userInDb.password;
    if (!isPasswordCorrect(password, passwordInDb)) {
      return res.status(401).json({ message: "Wrong password" });
    }

    res.json({
      userId: userInDb._id,
      token: "token",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
}

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function isPasswordCorrect(password, hash) {
  return bcrypt.compareSync(password, hash);
}

const usersRouter = express.Router();

usersRouter.post("/signup", signUp);
usersRouter.post("/login", login);

module.exports = { usersRouter };
