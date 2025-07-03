import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from '../utils/fileHandler.js';

const router = express.Router();
const BOOKS_PATH = './data/books.json';

// GET /books
router.get('/', async (req, res) => {
  let books = await readFile(BOOKS_PATH);

  const { genre, page, limit } = req.query;

  if (genre) {
    books = books.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
  }

  if (page && limit) {
    const start = (page - 1) * limit;
    books = books.slice(start, start + Number(limit));
  }

  res.json(books);
});

// GET /books/:id
router.get('/:id', async (req, res) => {
  const books = await readFile(BOOKS_PATH);
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// POST /books
router.post('/', async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;
  const books = await readFile(BOOKS_PATH);

  const newBook = {
    id: uuidv4(),
    title,
    author,
    genre,
    publishedYear,
    userId: req.user.id,
  };

  books.push(newBook);
  await writeFile(BOOKS_PATH, books);
  res.status(201).json(newBook);
});

// PUT /books/:id
router.put('/:id', async (req, res) => {
  const books = await readFile(BOOKS_PATH);
  const index = books.findIndex(b => b.id === req.params.id);

  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  if (books[index].userId !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  books[index] = { ...books[index], ...req.body };
  await writeFile(BOOKS_PATH, books);
  res.json(books[index]);
});

// DELETE /books/:id
router.delete('/:id', async (req, res) => {
  const books = await readFile(BOOKS_PATH);
  const index = books.findIndex(b => b.id === req.params.id);

  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  if (books[index].userId !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  books.splice(index, 1);
  await writeFile(BOOKS_PATH, books);
  res.json({ message: 'Book deleted' });
});

export default router;