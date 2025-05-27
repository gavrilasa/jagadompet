# 💼 JagaDompet - Money Tracking App

**JagaDompet** is a full-stack money tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It helps users manage income and expenses with real-time tracking and insightful analytics.

---

## 🚀 Features

- 💰 Track income and expenses with categories
- 📊 Visual analytics and spending trends
- 🔐 Secure JWT-based authentication
- 🗕️ Filterable transaction history
- 💸 Real-time balance updates
- 🎨 Clean, mobile-responsive UI

---

## 🛠️ Tech Stack

### Frontend

- **React.js** (via Vite)
- **TailwindCSS** for styling
- **React Router** for routing
- **ApexCharts** for visualization
- **React Calendar** for date inputs

### Backend

- **Node.js** + **Express.js**
- **MongoDB** with Mongoose
- **JWT** for user authentication
- **bcrypt** for password hashing
- **CORS**-enabled REST API

---

## 📂 Project Structure

```
jagadompet/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    └── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/jagadompet.git
```

### 2. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in both `frontend` and `backend` directories:

**Backend (.env):**

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Frontend (.env):**

```
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Run the Application

```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

---

## 🔐 API Endpoints

### Auth

- `POST /api/auth/signup` – Register user
- `POST /api/auth/login` – Authenticate user

### Transactions

- `GET /api/transactions` – List transactions
- `POST /api/transactions` – Add a transaction
- `PUT /api/transactions/:id` – Edit a transaction
- `DELETE /api/transactions/:id` – Delete a transaction

### Dashboard

- `GET /api/dashboard/stats` – Overview stats
- `GET /api/transactions/summary` – Income vs Expense
- `GET /api/transactions/spend-frequency` – Frequency analysis

---

## 🧠 Categories

### Income

- Salary
- Pocket Money
- Other

### Expenses

- Shopping
- Food & Beverages
- Subscriptions
- Transportation
- Entertainment
- Other

---

## 📈 Analytics

- Total income & expense calculation
- Current balance tracking
- Spending frequency charts
- Filtered transaction history
