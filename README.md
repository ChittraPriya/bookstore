# Bookstore REST API
A Node.js + Express REST API for managing books with authentication.
## Features
- User registration & login with JWT
- Protected routes using middleware
- Add, update, delete books
- Books tied to users
- Filter by genre 
- Pagination 
- UUIDs for book IDs 
- .env file support for environment variables


## Tech Stack

- Node.js
- Express
- JWT for Auth
- bcrypt for password hashing
- uuid for unique IDs
- Postman for testing

## Setup Instructions
<!-- Clone the repository -->

git clone https://github.com/chittrapriya/bookstore.git
cd bookstore
npm install

<!-- Create .env file -->
JWT_SECRET=your_secret_key_here

<!-- Run the server -->
npm run server

 API Testing (with Postman)

 Auth Routes
✅ Register
POST /auth/register
Body:
{
  "email": "user@example.com",
  "password": "123456"
}

▶️ Login
POST /auth/login
Body:
{
  "email": "user@example.com",
  "password": "123456"
}
Response:
{
  "token": "your_jwt_token_here"
}
Use this token for all protected routes:
Header: Authorization: Bearer your_jwt_token_here

📚 Book Routes (Protected)

▶️ Get All Books
GET /books
Optional Query Params:

genre=Classic

page=1&limit=5

GET /books?genre=Fantasy&page=1&limit=10

▶️ Get Book by ID
GET /books/:id

Example:
GET /books/abc123

▶️ Add a Book
POST /books
Header: Authorization: Bearer <token>
Body:
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "Fantasy",
  "publishedYear": 1937
}

▶️ Update a Book
PUT /books/:id
Only the user who created the book can update it
Body:
{
  "title": "The Hobbit (Updated Edition)"
}

▶️ Delete a Book
DELETE /books/:id
Only the user who created the book can delete it

