
# jotThoughts – Backend

Backend API for the jotThoughts blogging platform.  
Built with **Typescript**, **Node.js**, **Express**, and **MongoDB**.

## Preview Link:
--> [jotThoughts-Backend](https://jot-thoughts-backend.onrender.com/)

## Features

- User Authentication (JWT)
- Blog CRUD operations
- Secure routes with middleware
- MongoDB Atlas for database
- Express API for frontend integration

## Tech Stack

- Node.js & Express – Server & API
- MongoDB (Mongoose) – Database
- JWT – Authentication
- dotenv – Environment variables

## Installation

```bash
git clone https://github.com/pratyoos/jot-thoughts-backend.git
cd jot-thoughts-backend

npm install
# or
pnpm install
```

### Setup Environment Variables
Create `.env`:
```bash
PORT=3050
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=your_frontend_url
```

### Run Development Server
```bash
npm run dev
# or
pnpm run dev
```
Backend runs at `http://localhost:3050`.

## Project Structure

```
server/
├── config/           # Database & env setup
├── controllers/      # Business logic
├── models/           # Mongoose schemas
├── routes/           # Routes
├── middleware/       # Middleware functions
└── index.ts          # Entry point
```
## Author

Created with ❤️ by [Pratyoos](https://github.com/pratyoos)