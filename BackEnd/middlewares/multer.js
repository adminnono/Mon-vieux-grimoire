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

module.exports = { upload };
