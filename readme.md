# Travel Planner with Itinerary + Expense Splitter

## 🌍 Project Overview
Group trips are exciting, but planning them can be chaotic. This **Travel Planner** application solves the coordination headache by providing a unified space for itineraries, document storage, and transparent expense splitting.

## 🚀 Features

### 🗓️ Trip Management
- **Create Trips**: Set destinations, dates, and cover images.
- **Collaborative Itinerary**: Drag-and-drop timeline for activities.
- **Real-time Sync**: Updates reflect instantly for all group members.

### 💰 Expense Splitter
- **Smart Splitting**: Support for unequal splits (e.g., 70/30) and shared costs.
- **Debt Simplification**: Algorithm to minimize the number of transactions needed to settle up.
- **Expense Logging**: Record who paid and who owes what.

### 📂 Document Vault
- **Central Storage**: Upload tickets, hotel vouchers, and IDs.
- **Easy Access**: Linked to specific itinerary days.

### 👥 Collaboration
- **Invite Friends**: Generate join links for group members.
- **Voting System**: Polls for group decisions (e.g., Hotel choice).

## 🛠️ Tech Stack
- **Frontend**: React (Vite) for a fast, offline-capable mobile-first experience.
- **Backend**: Node.js with Express.
- **Database**: MongoDB for flexible data storage.
- **External APIs**: Google Places API (Location), OpenExchangeRates (Currency).

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Team-7-Travel_Planner
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file with:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/travel-planner
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔌 API Endpoints (Key Examples)

### Expenses
- `POST /api/v1/expenses` - Add a new expense.
- `GET /api/v1/expenses/:tripId` - Get all expenses for a trip.

### Trips
- `POST /api/v1/trips` - Create a new trip.
- `GET /api/v1/trips/:id` - Get trip details.

### Documents
- `POST /api/v1/documents` - Upload a document.
- `GET /api/v1/documents/:tripId` - List documents.

## 🤝 Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
