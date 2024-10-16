require("dotenv").config();
const mongoose = require("mongoose");

const DB_URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_DOMAIN}`;

async function connect() {
  try {
    await mongoose.connect(DB_URL);
  } catch (e) {
    console.error(e);
  }
}
connect();

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
