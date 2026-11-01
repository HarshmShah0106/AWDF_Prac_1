<div align="center">

# 🛡️ HARSH.SEC // Full-Stack & Cyber Defense Architecture

**Enterprise-Grade Student Portfolio • Cybersecurity Research • Reactive Web Engineering**

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-3.8_Flash-8E75C4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](#license)

<br/>

> **"Engineering impenetrable systems at the convergence of offensive security auditing, defensive cryptography, and containerized microservices."**

[Explore Live Demo](#quick-start) • [Certifications](#-professional-certifications) • [Security Workbench](#-interactive-cyber-workbench) • [AI Assistant](#-gemini-ai-portfolio-assistant)

---

</div>

## 📌 Overview

This repository hosts the personal portfolio and security engineering laboratory of **Harsh Shah**, a 5th-Semester B.Tech Information Technology student specializing in applied cybersecurity, defensive systems architecture, and full-stack web frameworks.

Crafted with high-performance **React 19**, **Vite**, and **Docker**, the application delivers a modern dark glassmorphic design token system, client-side cryptographic analysis utilities, an accredited certification showcase, and a real-time **Google Gemini AI Conversational Assistant**.

---

## ⚡ Core Highlights & Capabilities

### 🛡️ Interactive Cyber Workbench
A suite of browser-native cryptographic and analytical tools:
* **Shannon Bit Entropy Analyzer:** Computes algorithmic entropy (\(H(X) = -\sum P(x)\log_2 P(x)\)) on arbitrary strings to detect hardcoded secrets, cryptographic key leakages, and password randomness.
* **Web Cryptography Hash Generator:** Native hardware-accelerated SHA-256, SHA-384, and SHA-512 hashing via the browser's `SubtleCrypto` API.
* **Payload Encoders:** Instant Base64 and Hex encoding/decoding for exploit payload inspection and forensic data analysis.

### 🤖 Gemini AI Portfolio Assistant
An interactive conversational agent floating across the portfolio:
* **Google Gemini Integration:** Backed by `gemini-3.8-flash` via Google Generative AI REST endpoints.
* **Instant Curated Knowledge Engine:** Deterministic, zero-latency response fallback for core inquiries (Certifications, Technical Arsenal, Academic Standing, and Contact).
* **Fault-Tolerant Architecture:** Equipped with `AbortController` request timeouts, high-demand 503 recovery, and mock fallback execution.
* **Zero Secret Exposure:** API credentials managed via `.env` with strict `.gitignore` rules and dual Vite `envPrefix` resolution.

### 📜 Verified Professional Certifications Section
A dedicated accreditation portfolio highlighting 6 industry-recognized credentials with filterable domain tags and issuing authorities:
* **Certified Ethical Hacker (CEH v13)** — *EC-Council* (Active Candidate / Ongoing)
* **Google Cloud Cybersecurity Certificate** — *Google Cloud*
* **Google Cybersecurity Professional Certificate (v.2)** — *Google*
* **Microsoft Security Immersion Completion Badge** — *Microsoft*
* **Ethical Hacking Essentials (EHE)** — *EC-Council*
* **Advanced SQLite Queries with Belkasoft** — *Belkasoft Digital Forensics*

---

## 🛠️ Technical Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, React Router v7, Vite (Fast HMR) |
| **Design System** | Custom Dark Glassmorphism Token Engine (`#060711`), Lucide React Icons |
| **Typography** | Inter (UI Proportions), JetBrains Mono (Terminal & Code Blocks) |
| **AI / Machine Learning** | Google Gemini API (`gemini-3.8-flash`, `gemini-flash-latest`) |
| **Cryptography** | Web Cryptography API (`crypto.subtle`), Shannon Entropy Engine |
| **DevOps & Containers** | Multi-stage Dockerfile, Docker Compose, Alpine Linux Base |
| **Security Standards** | OWASP Top 10 mitigation, Least-privilege Docker runtime, JWT / Bcrypt defense |

---

## 📂 Repository Structure

```text
student-portfolio/
├── public/                 # Static assets and icons
├── src/
│   ├── assets/             # Branding and graphics
│   ├── Components/
│   │   ├── About.jsx            # Defensive engineering biography & philosophy
│   │   ├── Certifications.jsx   # Accredited certification showcase with domain badges
│   │   ├── Chatbot.jsx          # Gemini AI Assistant & Curated Knowledge Engine
│   │   ├── Contact.jsx          # Transmission / secure message dispatch form
│   │   ├── ErrorMessage.jsx     # Resilient error boundary notification
│   │   ├── Footer.jsx           # Clean glass footer with status lights
│   │   ├── Header.jsx           # Hero banner with dynamic call-to-actions
│   │   ├── Home.jsx             # Cyber hero, terminal emulator, and summary cards
│   │   ├── Navbar.jsx           # Sticky glassmorphic navigation bar
│   │   ├── Projects.jsx         # MERN Task Engine & distributed apps
│   │   ├── SecurityTools.jsx    # Client-side entropy & cryptographic suite
│   │   ├── Skills.jsx           # Offensive, defensive, and devops matrix
│   │   └── Spinner.jsx          # Kinetic loading indicator
│   ├── App.css             # Glass tokens, cyber glows, and keyframe animations
│   ├── App.jsx             # Route definitions and global chatbot mounting
│   ├── index.css           # CSS resets and theme variables
│   └── main.jsx            # Vite DOM entrypoint
├── .env.example            # Environment template for Google Gemini API
├── .gitignore              # Strict ignore rules excluding .env, node_modules, dist
├── docker-compose.yml      # Container orchestration
├── Dockerfile              # Multi-stage production container build
├── package.json            # Node dependencies and build scripts
├── README.md               # Portfolio documentation
└── vite.config.js          # Vite config with envPrefix and dynamic loadEnv
```

---

## 🚀 Quick Start

### Prerequisites
* **Node.js** (v18.x or v20.x recommended)
* **npm** or **pnpm**
* *(Optional)* **Docker & Docker Compose**
* *(Optional)* A free **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

---

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HarshmShah0106/AWDF_Prac_1.git
   cd AWDF_Prac_1
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key (optional for basic preview, required for live AI generation):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Launch the development server:**
   ```bash
   npm run dev
   ```
   Open **`http://localhost:5173`** in your browser.

---

### 🐳 Docker Deployment

The portfolio is completely containerized for reproducible production deployments:

1. **Build and start the container:**
   ```bash
   docker-compose up --build -d
   ```

2. **Verify running status:**
   ```bash
   docker ps
   ```
   Access the portfolio at **`http://localhost:3000`** (or mapped port).

3. **Stop containers:**
   ```bash
   docker-compose down
   ```

---

### 📦 Production Build

To test and compile an optimized production distribution:

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🛡️ Security & Privacy Notice

* **Zero Secret Leakage:** The `.env` file containing local API credentials is hard-ignored by `.gitignore` and is never committed to version control.
* **Client-Side Cryptography:** All operations in the Security Workbench (Entropy calculations, Hash generation, and Encoders) execute 100% locally in your browser memory — no sensitive payloads or passwords are sent over the network.

---

## 👨‍💻 Author & Contact

**Harsh Shah**  
*Cybersecurity Researcher & Full-Stack Architect*  
*5th-Semester B.Tech IT Candidate*

* **GitHub:** [@HarshmShah0106](https://github.com/HarshmShah0106)
* **Repository:** [AWDF_Prac_1](https://github.com/HarshmShah0106/AWDF_Prac_1)
* **Direct Inquiries:** [harsh@gmail.com](mailto:harsh@gmail.com)

---

<div align="center">
  <sub>Built with React 19, Vite, Docker, and Google Gemini. © 2026 Harsh Shah. All rights reserved.</sub>
</div>
