import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readFile, writeFile } from '../utils/fileHandler.js';
import { SECRET } from '../middleware/auth.js';

const router = express.Router();
const USERS_PATH = './data/users.json';

// POST /auth/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const users = await readFile(USERS_PATH);

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now().toString(), email, password: hashed };
  users.push(newUser);
  await writeFile(USERS_PATH, users);

  res.status(201).json({ message: 'User registered' });
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const users = await readFile(USERS_PATH);

  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

export default router;
