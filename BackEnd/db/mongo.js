const mongoose = require("mongoose");

const PASSWORD = "";
const USER = "";
const DB_URL = "";

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
