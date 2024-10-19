const body = req.body;
const bcrypt = require("bcrypt");
const { User } = require("../models/User");
async function signUp(req, res) {
  const email = body.email;
  const password = body.password;

  try {
    const userInDb = await User.findOne({ email: email });
    if (userInDb) {
      res.status(400).send("Email already exists");
      return;
    }

    const user = {
      email: email,
      password: hashPassword(password),
    };

    await User.create(user);
    res.send("Sign up successful");
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong");
  }
}

async function login(req, res) {
  const body = req.body;
  const email = body.email;
  const password = body.password;

  try {
    const userInDb = await User.findOne({ email: email });
    if (!userInDb) {
      res.status(401).send("Wrong email");
      return;
    }

    const passwordInDb = userInDb.password;
    if (!isPasswordCorrect(password, passwordInDb)) {
      res.status(401).send("Wrong password");
      return;
    }

    res.send({
      userId: userInDb._id,
      token: "token",
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong");
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

module.exports = { signUp, login };
