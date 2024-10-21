require("dotenv").config();
const mongoose = require("mongoose");

const DB_URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_DOMAIN}`; // Assurez-vous que ces variables d'environnement sont bien définies

async function connect() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true, // Ajout d'options pour éviter les warnings de Mongoose
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
}
connect();
