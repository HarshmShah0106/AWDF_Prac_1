# AWDF Practicals Repository

Repository for **Advanced Web Development Frameworks (AWDF)** practical implementations, containerized deployments, and automated CI/CD workflows.

---

## 📁 Repository Structure

```plaintext
AWDF_Prac_1/
├── student-portfolio/     # Practical 1, 3 & 11: Cybersecurity-Themed Interactive Portfolio
│   ├── src/               # React components, Security Workbench, Gemini AI Chatbot
│   ├── Dockerfile         # Multi-stage production container build (Vite + Nginx / Node 20)
│   ├── docker-compose.yml # Port 3000 container deployment
│   └── README.md          # Dedicated portfolio documentation
│
└── taskmanger/            # Practical 4, 6, 7 & 12: Full-Stack Task Management System
    ├── backend/           # Node.js + Express API, JWT auth, MongoDB / Mongoose, Jest tests
    ├── frontend/          # Vite + React client, Tailwind CSS, Task Dashboard
    ├── .github/workflows/ # GitHub Actions CI/CD automated test pipeline
    ├── docker-compose.yml # Full-stack orchestration (MongoDB + API + React Frontend)
    └── README.md          # Dedicated task manager documentation & API specification
```

---

## 🚀 Projects Overview

### 1. [Student Portfolio](./student-portfolio)
* **Stack**: React, Vite, Tailwind CSS, Gemini 1.5 Flash AI Assistant, Lucide Icons.
* **Features**:
  * Cybersecurity aesthetic with dark mode and neon terminal styling.
  * Interactive Security Workbench: Password Entropy Meter, Caesar Cipher Tool, Base64 Encoder/Decoder.
  * Google Gemini AI Security Assistant integrated with conversational memory.
  * Dockerized deployment running on `http://localhost:3000`.
* **Quick Start**:
  ```bash
  cd student-portfolio
  npm install
  npm run dev
  ```

### 2. [Task Manager (taskmanger)](./taskmanger)
* **Stack**: MongoDB, Express.js, React (Vite), Node.js (MERN), Docker, GitHub Actions.
* **Features**:
  * Complete CRUD task operations with status filtering, priorities, and deadlines.
  * Secure JWT authentication (registration, login, route guards).
  * Automated testing suite using Jest & Supertest.
  * Continuous Integration (CI) pipeline via GitHub Actions validating builds and tests.
  * Docker Compose multi-container setup (MongoDB on port `27017`, Backend on port `5000`, Frontend on port `5174`).
* **Quick Start**:
  ```bash
  cd taskmanger
  docker compose up -d
  # Or run locally:
  npm run dev # (runs backend and frontend concurrently)
  ```

---

## 🛠️ Global Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide React, Axios |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs |
| **DevOps & Containers** | Docker, Docker Compose, GitHub Actions |
| **Testing & Quality** | Jest, Supertest, ESLint / Oxlint |
| **AI Integration** | Google Gemini API (1.5 Flash) |

---

## 👨‍💻 Author
**Harsh Shah**  
- GitHub: [@HarshmShah0106](https://github.com/HarshmShah0106)
