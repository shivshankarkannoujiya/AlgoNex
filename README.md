# 🚀 AlgoNex

<div align="center">

**A Modern Competitive Programming Platform**

[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**AlgoNex** is a full-stack competitive programming platform designed to help developers practice coding problems, participate in discussions, and track their progress. Built with modern technologies, it provides a seamless experience for both problem-solving and community engagement.

### Key Highlights

- 💻 **Interactive Code Editor** - Monaco Editor with multi-language support
- ⚡ **Real-time Code Execution** - Powered by Judge0 API
- 📊 **Progress Tracking** - Visual heatmaps and submission statistics
- 💬 **Community Discussions** - Engage with other developers
- 📚 **Custom Playlists** - Organize problems by topics
- 🔐 **Secure Authentication** - JWT-based auth with email verification

---

## ✨ Features

### For Users

- **Problem Solving**
  - Browse problems by difficulty (Easy, Medium, Hard)
  - Filter by tags and categories
  - Multiple language support (JavaScript, Python, C++, Java, etc.)
  - Run and submit code with detailed test results
  - View submission history and statistics

- **Community & Collaboration**
  - Create and participate in discussions
  - Upvote/downvote posts and comments
  - Share solutions and insights
  - Follow problem-specific discussion threads

- **Progress Tracking**
  - Visual submission heatmap
  - Problem-solving statistics
  - Personal submission history
  - Achievement tracking

- **Playlist Management**
  - Create custom problem playlists
  - Organize problems by topics or difficulty
  - Track completion progress

### For Admins

- **Problem Management**
  - Create and edit problems
  - Define test cases and constraints
  - Add hints and editorial solutions
  - Manage problem tags and categories

- **User Management**
  - Monitor user activities
  - Manage submissions and discussions
  - Platform administration

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** React 19.1.0 with Vite
- **State Management:** Redux Toolkit
- **Styling:** TailwindCSS 4.1.7
- **Code Editor:** Monaco Editor
- **Routing:** React Router DOM
- **UI Components:**
  - Heroicons, Lucide React, React Icons
  - Framer Motion (animations)
  - React Calendar Heatmap
  - React Syntax Highlighter
- **Form Handling:** React Hook Form with Zod validation
- **Notifications:** React Toastify
- **Charts:** Recharts

### Backend

- **Runtime:** Node.js with Express 5.1.0
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT (jsonwebtoken) with bcryptjs
- **File Upload:** Multer + Cloudinary
- **Email Service:** Nodemailer with Mailgen
- **Code Execution:** Judge0 API (via Axios)
- **Validation:** Zod
- **Utilities:**
  - cookie-parser
  - cors
  - date-fns
  - dotenv

---

## 📁 Project Structure

```
AlgoNex/
├── Backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── migrations/            # Database migrations
│   ├── src/
│   │   ├── controllers/           # Request handlers
│   │   ├── routes/                # API routes
│   │   ├── middlewares/           # Custom middlewares
│   │   ├── validators/            # Input validation schemas
│   │   ├── utils/                 # Helper functions
│   │   ├── lib/                   # External service integrations
│   │   ├── app.js                 # Express app configuration
│   │   └── index.js               # Server entry point
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Page components
│   │   ├── Features/              # Redux slices and thunks
│   │   ├── Store/                 # Redux store configuration
│   │   ├── Service/               # API client and services
│   │   ├── constants/             # App constants
│   │   ├── App.jsx                # Main app component
│   │   └── main.jsx               # React entry point
│   ├── public/                    # Static assets
│   └── package.json
│
└── README.md
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/shivshankarkannoujiya/algonex.git
cd algonex
```

### 2. Backend Setup

```bash
cd Backend
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed the database
npm run seed
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

---

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `Backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/algonex

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret_here
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRY=10d

# Email Configuration (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_FROM=noreply@algonex.com

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Judge0 API
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_rapidapi_key
JUDGE0_API_HOST=judge0-ce.p.rapidapi.com

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

Create a `.env` file in the `Frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=AlgoNex
```

---

## 🏃 Running the Application

### Development Mode

#### 1. Start the Backend

```bash
cd Backend
npm run dev
```

The backend server will start on `http://localhost:5000`

#### 2. Start the Frontend

```bash
cd Frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Production Build

#### Backend

```bash
cd Backend
npm start
```

#### Frontend

```bash
cd Frontend
npm run build
npm run preview
```

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint                      | Description            | Auth Required |
| ------ | ----------------------------- | ---------------------- | ------------- |
| POST   | `/auth/register`              | Register new user      | No            |
| POST   | `/auth/login`                 | User login             | No            |
| POST   | `/auth/logout`                | User logout            | Yes           |
| POST   | `/auth/refresh`               | Refresh access token   | Yes           |
| GET    | `/auth/verify-email/:token`   | Verify email           | No            |
| POST   | `/auth/forgot-password`       | Request password reset | No            |
| POST   | `/auth/reset-password/:token` | Reset password         | No            |

### Problem Endpoints

| Method | Endpoint        | Description        | Auth Required |
| ------ | --------------- | ------------------ | ------------- |
| GET    | `/problems`     | Get all problems   | No            |
| GET    | `/problems/:id` | Get problem by ID  | No            |
| POST   | `/problems`     | Create new problem | Yes (Admin)   |
| PUT    | `/problems/:id` | Update problem     | Yes (Admin)   |
| DELETE | `/problems/:id` | Delete problem     | Yes (Admin)   |

### Submission Endpoints

| Method | Endpoint                   | Description             | Auth Required |
| ------ | -------------------------- | ----------------------- | ------------- |
| GET    | `/submissions`             | Get user submissions    | Yes           |
| GET    | `/submissions/:id`         | Get submission by ID    | Yes           |
| POST   | `/submissions`             | Submit solution         | Yes           |
| GET    | `/submissions/problem/:id` | Get problem submissions | Yes           |

### Code Execution Endpoints

| Method | Endpoint          | Description | Auth Required |
| ------ | ----------------- | ----------- | ------------- |
| POST   | `/execute/run`    | Run code    | Yes           |
| POST   | `/execute/submit` | Submit code | Yes           |

### Discussion Endpoints

| Method | Endpoint               | Description       | Auth Required |
| ------ | ---------------------- | ----------------- | ------------- |
| GET    | `/posts`               | Get all posts     | No            |
| GET    | `/posts/:id`           | Get post by ID    | No            |
| POST   | `/posts`               | Create new post   | Yes           |
| PUT    | `/posts/:id`           | Update post       | Yes           |
| DELETE | `/posts/:id`           | Delete post       | Yes           |
| POST   | `/posts/:id/upvote`    | Upvote post       | Yes           |
| POST   | `/comments`            | Create comment    | Yes           |
| GET    | `/comments/post/:id`   | Get post comments | No            |
| POST   | `/comments/:id/upvote` | Upvote comment    | Yes           |

### Playlist Endpoints

| Method | Endpoint                             | Description                  | Auth Required |
| ------ | ------------------------------------ | ---------------------------- | ------------- |
| GET    | `/playlists`                         | Get user playlists           | Yes           |
| GET    | `/playlists/:id`                     | Get playlist by ID           | Yes           |
| POST   | `/playlists`                         | Create playlist              | Yes           |
| PUT    | `/playlists/:id`                     | Update playlist              | Yes           |
| DELETE | `/playlists/:id`                     | Delete playlist              | Yes           |
| POST   | `/playlists/:id/problems/:problemId` | Add problem to playlist      | Yes           |
| DELETE | `/playlists/:id/problems/:problemId` | Remove problem from playlist | Yes           |

---

### Reporting Bugs

If you find a bug, please create an issue with:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Shivshankar**

---

## 🙏 Acknowledgments

- [Judge0](https://judge0.com/) - Code execution engine
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Prisma](https://www.prisma.io/) - Database ORM
- [React](https://reactjs.org/) - Frontend framework
- All contributors and the open-source community

---

## 📞 Support

For support, email shivshankar@algonex.com or create an issue in the repository.

---

<div align="center">

**Built with ❤️ by the AlgoNex Team**

[⬆ Back to Top](#-algonex)

</div>
