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

module.exports = {};
