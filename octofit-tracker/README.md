# OctoFit Tracker

A modern multi-tier fitness tracking application built with React, Express, TypeScript, and MongoDB.

## Architecture

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Port**: 5173

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database**: MongoDB
- **Port**: 8000

### Database
- **MongoDB**: Port 27017

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or access to MongoDB Atlas

### Installation

#### Frontend
```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

#### Backend
```bash
cd octofit-tracker/backend
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

Backend `.env` file should include:
```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit
NODE_ENV=development
```

## API Endpoints

- `GET /api/health` - Health check endpoint

## Development

- Frontend runs on `http://localhost:5173`
- Backend API runs on `http://localhost:8000`
- MongoDB connection: `mongodb://localhost:27017/octofit`
