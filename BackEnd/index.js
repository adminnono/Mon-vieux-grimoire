const { app } = require("./config/app");
const { login } = require("./controllers/users.controller");
const { upload } = require("./middlewares/multer");
const { signUp, login } = require("./controllers/users.controller");
const { getBooks, postBook } = require("./controllers/books.controller");

app.get("/", (req, res) => res.send("Server running"));
app.post("/api/auth/signup", signUp);
app.post("/api/auth/login", login);
app.get("/api/books", getBooks);
app.post("/api/books", upload.single("image"), postBook);
