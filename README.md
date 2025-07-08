# Split Expense App

A full-stack MERN (MongoDB, Express, React, Node.js) application for splitting expenses among groups. Users can create groups, add expenses, and track balances with authentication and authorization.

## Features
- User authentication (signup/login)
- Create and manage groups
- Add, edit, and view expenses
- View balance summary for each group
- Protected routes for authenticated users
- Modern UI with React, Vite, and Tailwind CSS

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the repository
```sh
git clone <repo-url>
cd split_expense_app
```

### 2. Setup the Server
```sh
cd server
npm install
```

- Create a `.env` file in the `server` folder with:
  ```env
  JWT_SECRET=your_jwt_secret
  ```
- Start MongoDB locally or update the connection string in `server.js`.
- Start the server:
```sh
npm start
```

### 3. Setup the Client
```sh
cd ../client
npm install
npm run dev
```

- The client will run on [http://localhost:5173](http://localhost:5173) by default.

## Folder Structure
```
split_expense_app/
├── client/   # React frontend
└── server/   # Express backend
```

## API Endpoints (Summary)
- `POST /api/signup` – Register a new user
- `POST /api/login` – Login
- `POST /api/groups/create` – Create a group (auth required)
- `GET /api/groups` – List user's groups (auth required)
- `POST /api/expenses` – Add an expense (auth required)
- `GET /api/expenses` – List all expenses (auth required)

## License
MIT
