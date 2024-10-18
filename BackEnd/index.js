const express = require("express");
const app = express();
const { User, Book } = require("./db/mongo");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { books } = require("./db/books");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const fileName =
      file.originalname.toLocaleLowerCase() + Date.now() + ".jpg";
    cb(null, Date.now() + "_" + fileName);
  },
});

const upload = multer({
  storage: storage,
});

const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use("/images", express.static("uploads"));

function sayHi(req, res) {
  res.send("Hello World");
}

app.get("/", sayHi);
app.post("/api/auth/signup", signUp);
app.post("/api/auth/login", login);
app.get("/api/books", getBooks);
app.post("/api/books", upload.single("image"), postBook);

async function postBook(req, res) {
  const file = req.file;
  const stringifiedBook = req.body.book;
  const book = JSON.parse(stringifiedBook);
  book.imageUrl = file.path;
  try {
    const result = await Book.create(book);
    res.send({ message: "Book posted", book: result });
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong" + e.message);
  }
}

function getBooks(req, res) {
  res.send(books);
}

console.log("password in .env", process.env.PASSWORD);

app.listen(PORT, function () {
  console.log(`server is running on: ${PORT}`);
});

async function signUp(req, res) {
  const body = req.body;
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
