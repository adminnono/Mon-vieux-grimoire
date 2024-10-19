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

module.exports = { getBooks, postBook };
