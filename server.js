import express from "express";
import authRoutes from './routes/authRoutes.js';
import booksRoutes from './routes/booksRoutes.js';
import logger from './middleware/logger.js';
import { authMiddleware, SECRET } from './middleware/auth.js';
import dotenv from 'dotenv';


const app = express();
const port = 3000;
dotenv.config();

//Middleware
app.use(express.json());
app.use(logger);

app.use('/auth', authRoutes);
app.use('/books', authMiddleware, booksRoutes);


// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});


//Route
app.get('/', (req,res)=> res.send("Server is Live!"));


app.listen(port, ()=> console.log(`Server listening at http://localhost:${port}`));