# Advanced Web Development Frameworks (ITUE301)
## Full Stack Task Management System

[![CI Pipeline](https://github.com/harsh-0106-cyber/Prac4-AWDF/actions/workflows/ci.yml/badge.svg)](https://github.com/harsh-0106-cyber/Prac4-AWDF/actions/workflows/ci.yml)

**Student Account:** `harsh@gmail.com`  
**Brand:** `harsh.dev`  
**Program:** B.Tech (IT/CE/CSE/AIML) — Semester 5  

This repository contains the complete implementation and integration of:
1. **Practical 6:** Full Stack Integration (React + Express + MongoDB CRUD)
2. **Practical 7:** Authentication & Middleware Pipeline (bcrypt, JWT, auth middleware, validateTaskInput, errorHandler)
3. **Practical 8:** Performance Optimization & Lazy Loading in React (`React.lazy()`, `Suspense`, Code Splitting)
4. **Practical 9:** In-Memory Caching & Query Optimization (`node-cache`, cache invalidation, benchmarking)
5. **Practical 11:** Containerization with Docker and Docker Compose (Multi-container orchestration, inter-container networking, persistent volumes)
6. **Practical 12:** CI/CD Pipeline with GitHub Actions (Automated testing, linting, workflow triggers, and status reporting)

---

## 🚀 Practical 8: Performance Optimization & Lazy Loading in React

### Practical Objectives
- Optimize the React frontend by implementing route-based code splitting using `React.lazy()` and `<Suspense>`.
- Apply lazy loading to `ProjectsPage`, `ContactPage`, `TasksPage`, `CacheDemoPage`, `LoginPage`, and `RegisterPage`.
- Provide a fallback spinner component (`PageLoader.jsx`) while lazy chunks load.
- Compare bundle sizes and network chunk loading before and after optimization.

### Route Splitting Implementation ([src/App.jsx](file:///e:/Sem%205/AWDF/Prac6/frontend/src/App.jsx))

```jsx
import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLoader from './components/PageLoader';

function lazyWithDelay(importPromise, delay = 800) {
  return lazy(() =>
    Promise.all([
      importPromise(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([moduleExports]) => moduleExports)
  );
}

// Route-based Code Splitting
const Home = lazyWithDelay(() => import('./pages/Home'), 400);
const ProjectsPage = lazyWithDelay(() => import('./pages/ProjectsPage'), 800);
const ContactPage = lazyWithDelay(() => import('./pages/ContactPage'), 800);
const TasksPage = lazyWithDelay(() => import('./pages/TasksPage'), 600);
const CacheDemoPage = lazyWithDelay(() => import('./pages/CacheDemoPage'), 500);

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
        <Route path="/cache" element={<ProtectedRoute><CacheDemoPage /></ProtectedRoute>} />
      </Routes>
    </Suspense>
  );
}
```

### 📊 Bundle Comparison (Before vs After Optimization)

| Metric | Before Optimization (Single Monolithic Bundle) | After Optimization (`React.lazy()` Code Splitting) | Improvement |
| :--- | :--- | :--- | :--- |
| **Initial Load Chunk** | `index.js` (~312 kB) | `index.js` (~268 kB) | **~44 kB smaller initial download** |
| **Route Chunks** | 0 separate chunks | 8 dynamic on-demand `.js` chunks | Loads only requested page code |
| **`ProjectsPage.js`** | Bundled inside main | `3.07 kB` (0.0 kB loaded on Home) | **100% deferred until clicked** |
| **`ContactPage.js`** | Bundled inside main | `2.74 kB` (0.0 kB loaded on Home) | **100% deferred until clicked** |
| **`TasksPage.js`** | Bundled inside main | `3.99 kB` (0.0 kB loaded on Home) | **100% deferred until login** |

---

## ⚡ Practical 9: In-Memory Caching & Query Optimization

- **`node-cache` Integration:** `stdTTL: 60`, `checkperiod: 120`.
- **Automatic Invalidation:** `POST`, `PUT`, `DELETE` operations purge the user's cached key so stale data is never served.
- **Benchmark Results:**  
  - **Uncached (MongoDB):** ~43.7 ms  
  - **Cached (node-cache):** ~10.3 ms  
  - **Speedup:** **76.4% FASTER**

---

## 🔐 Practical 7: Authentication & Security

- **Bcrypt Hashing:** Passwords encrypted using `bcrypt.hash(password, 10)` before writing to MongoDB.
- **JWT Authentication:** 1-hour token expiration with `Authorization: Bearer <token>` route protection.
- **Server Validation:** `validateTaskInput.js` rejects missing/blank titles with HTTP 400.

---

## 🛠️ How to Run Locally

```bash
# Start both backend and frontend dev servers
npm run dev

# Inspect live MongoDB database
npm run db:inspect
```

---

## 🐳 Practical 11: Containerization with Docker and Docker Compose

### Practical Objectives
- Containerize both the React frontend and Node/Express backend into isolated Docker images.
- Orchestrate the multi-container stack (`frontend`, `backend`, `mongodb`) using `docker-compose.yml`.
- Configure custom bridge networking (`app-network`) for secure inter-container communication.
- Implement named persistent storage (`mongo-data`) so MongoDB data survives container destruction and restarts.
- Use multi-stage builds and `.dockerignore` files to produce lightweight, production-ready images.
- Launch the entire full-stack application with a single command: `docker compose up --build`.

### 🏗️ Architecture & Inter-Container Network Diagram

```text
docker-compose.yml
 ├── frontend (React + Vite Preview, built + served, port 5173:5173)
 ├── backend  (Node/Express API, port 5000:5000)
 └── mongodb  (Official MongoDB Image, port 27017:27017, volume: mongo-data)

Network: app-network (bridge)
 [Host Browser]
      │
      ├───► localhost:5173 ──► frontend (React UI)
      │                            │
      │                            │ (HTTP API Calls via Host Port 5000)
      │                            ▼
      └───► localhost:5000 ──► backend (Express)
                                   │
                                   │ (Internal DNS Resolution via app-network)
                                   ▼
                               mongodb:27017 (Persistent Volume: mongo-data)
```

---

### 📦 Container Definitions

#### 1. Backend Service (`backend/Dockerfile`)
- Base image: `node:18-alpine`
- Excludes `node_modules` and `.env` via `.dockerignore` to ensure clean environment-specific builds.
- Connects to MongoDB via service DNS: `mongodb://mongodb:27017/taskdb`.
- Exposes port `5000`.

#### 2. Frontend Service (`frontend/Dockerfile`)
- Multi-stage build structure:
  - **Stage 1 (`build`):** Installs full dependencies, builds optimized production bundle into `/app/dist`.
  - **Runtime:** Serves static production assets with `npm run preview -- --host 0.0.0.0 --port 5173`.
- Excludes `node_modules`, `dist`, and `.env` via `.dockerignore`.
- Exposes port `5173`.

#### 3. Database Service (`mongodb`)
- Official image: `mongo:latest`
- Named Volume `mongo-data` mounted at `/data/db` ensuring zero data loss across container teardown.

---

### 🚀 How to Run with Docker Compose

```bash
# 1. Build and start all 3 containers together
docker compose up --build

# 2. Run in detached (background) mode
docker compose up --build -d

# 3. Check status of running containers
docker compose ps

# 4. View real-time logs across all services
docker compose logs -f

# 5. Stop and remove containers and networks (data persists in volume)
docker compose down

# 6. Stop and remove containers, networks, AND volumes (full reset)
docker compose down -v
```

- **Frontend Application:** [http://localhost:5173](http://localhost:5173)
- **Backend API Status:** [http://localhost:5000/](http://localhost:5000/)
- **MongoDB Database:** `mongodb://localhost:27017`

---

### ❓ Key Analysis & Viva Questions

#### Q1: Why does the backend container need to reference the MongoDB container by its service name (`mongodb`) rather than `localhost`?
> **Answer:** Each Docker container operates inside its own isolated network namespace and has its own private loopback interface (`localhost` / `127.0.0.1`). If the backend container attempts to connect to `localhost:27017`, it looks for a MongoDB process running inside the backend container itself.
> When services are attached to a user-defined network (such as `app-network`), Docker's embedded DNS server automatically resolves the service name `mongodb` to the internal private IP address of the MongoDB container.

#### Q2: What is the difference between `EXPOSE` in a Dockerfile and the `ports` mapping in `docker-compose.yml`?
> **Answer:**
> - `EXPOSE <port>` in a `Dockerfile` serves as documentation and metadata between the image author and the consumer. It indicates which port the application listens on inside the container, but it **does not publish** the port to the host machine.
> - `ports: ["HOST:CONTAINER"]` (e.g., `"5000:5000"`) in `docker-compose.yml` actively creates a network forwarding rule between the host machine and the container. This allows external clients (such as your web browser or Postman) to connect to the service.

#### Q3: Why is it considered bad practice to copy `node_modules` into a Docker image instead of running `npm install` inside the container?
> **Answer:**
> 1. **Native Binaries Incompatibility:** Many npm packages (e.g., `bcrypt`, `esbuild`) compile platform-specific C/C++ binaries during installation. Copying `node_modules` from a Windows or macOS host into a Linux container results in `ERR_DLOPEN_FAILED` or segmentation faults.
> 2. **Build Context Bloat & Slowness:** `node_modules` contains thousands of files and hundreds of megabytes. Uploading it into the Docker daemon build context significantly slows down every build.
> 3. **Non-reproducible Builds:** Copying host `node_modules` risks including dirty, stale, or debugging dependencies rather than relying on deterministic resolution from `package.json` and `package-lock.json`.

---

### 🛠️ Troubleshooting Guide

| Symptom | Likely Cause | Solution |
| :--- | :--- | :--- |
| **Backend cannot connect to MongoDB** | Connection string uses `localhost` instead of Compose service name | Set `MONGO_URI=mongodb://mongodb:27017/taskdb` in `docker-compose.yml` or backend configuration. |
| **Port already in use error** | A previous container or local process is bound to port 5000, 5173, or 27017 | Run `docker ps` to find and stop conflicting containers, or kill the host process using `Stop-Process`. |
| **Build is extremely slow** | Host `node_modules` being uploaded to Docker daemon | Ensure `.dockerignore` exists in backend, frontend, and project root containing `node_modules`. |
| **Changes to code not reflected** | Docker cached older image layers | Run `docker compose up --build` to force rebuild of updated layers. |
| **Frontend unreachable on port 5173** | Vite preview server bound to `127.0.0.1` inside container | Add `--host 0.0.0.0` to preview command or configure `preview.host: '0.0.0.0'` in `vite.config.js`. |

---

## ⚡ Practical 12: CI/CD Pipeline with GitHub Actions

### Practical Objectives
- Automate building, linting, and regression testing using a GitHub Actions CI pipeline.
- Define a multi-step GitHub Actions workflow triggered on every `push` and `pull_request` targeting `main`.
- Write automated HTTP integration tests for API endpoints using **Jest** and **Supertest**.
- Demonstrate failure handling with a deliberately broken assertion, view failure logs, and verify the pipeline turns green upon correction.
- Address all supplementary tasks: pre-test code style linting, pull request triggers, and live status badge integration.

---

### 🏗️ CI/CD Architecture & Execution Flow

```text
       git push origin main / PR to main
                       │
                       ▼
          GitHub Actions Workflow Trigger
                       │
       ┌───────────────┴───────────────┐
       │                               │
       ▼                               ▼
 ┌───────────────────────┐   ┌───────────────────────────────┐
 │ Job 1: lint           │   │ Job 2: build-and-test         │
 │ ├── Checkout Repo     │   │ (needs: [lint])               │
 │ ├── Setup Node.js 18  │──▶│ ├── Checkout Repo             │
 │ ├── npm install       │   │ ├── Setup Node.js 18          │
 │ └── npm run lint      │   │ ├── npm install               │
 └───────────────────────┘   │ ├── npm test (Jest+Supertest) │
                             │ └── Report Pass/Fail Status   │
                             └───────────────┬───────────────┘
                                             │
                                             ▼
                             GitHub UI: Green ✔️ or Red ❌
```

---

### 🧪 Automated Test Suite Implementation (`backend/tests/api.test.js`)

```javascript
const request = require('supertest');
const app = require('../server');

describe('Task Management API - CI/CD Automated Test Suite', () => {
  // Test 1: Testing the GET /tasks endpoint returns status 200 (Core requirement)
  test('GET /tasks returns 200', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test 2: Testing Health Check root endpoint GET / (Supplementary / Post-lab)
  test('GET / returns health status 200 and online message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('online');
    expect(res.body).toHaveProperty('endpoints');
  });

  // Test 3: Testing 404 handler for undefined endpoints (Security assertion)
  test('GET /non-existent-route returns 404 error', async () => {
    const res = await request(app).get('/api/invalid-route-for-ci-test');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
```

---

### ⚙️ GitHub Actions Workflow Configuration (`.github/workflows/ci.yml`)

```yaml
name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # Supplementary Job: Code Quality & Linter Analysis
  lint:
    name: Lint & Code Style
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js 18
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install Dependencies
        working-directory: backend
        run: npm install

      - name: Run Code Style & Linter Check
        working-directory: backend
        run: npm run lint

  # Core Job: Build & Automated Testing
  build-and-test:
    name: Build & Automated Tests
    runs-on: ubuntu-latest
    needs: [lint]
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js 18
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install Dependencies
        working-directory: backend
        run: npm install

      - name: Execute Automated Tests (Jest & Supertest)
        working-directory: backend
        run: npm test
```

---

### 🔍 Deliberate Failure & Fix Demonstration

#### 1. Deliberately Breaking the Test (Simulating a Regression)
To simulate a failing test as required by Step 5 of the practical, alter line 8 in `backend/tests/api.test.js`:
```javascript
// DELIBERATELY BROKEN ASSERTION:
expect(res.statusCode).toBe(500); // Expected 500 but server returns 200
```
- **Observed Result on GitHub Actions:**
  - The `build-and-test` job halts immediately.
  - GitHub marks the commit with a **Red X (❌)**.
  - The workflow log clearly prints:
    ```text
    ● Task Management API › GET /tasks returns 200
      expect(received).toBe(expected)
      Expected: 500
      Received: 200
    ```

#### 2. Fixing the Assertion & Pipeline Recovery
Restore line 8 to the correct assertion:
```javascript
expect(res.statusCode).toBe(200);
```
- Commit and push to `main`.
- **Observed Result on GitHub Actions:**
  - Both `lint` and `build-and-test` jobs run and pass.
  - GitHub marks the commit with a **Green Checkmark (✔️)**.
  - The status badge updates to `passing`.

---

### 🎓 Key Questions & Viva Analysis

#### Q1: What is the difference between Continuous Integration (CI) and Continuous Deployment (CD), and which one does this practical demonstrate?
> **Answer:**
> - **Continuous Integration (CI):** The practice of regularly merging code changes into a central repository, followed by automated builds, linting, and automated test execution to detect bugs as early as possible.
> - **Continuous Deployment (CD):** An extension of CI where every change that successfully passes the automated test pipeline is automatically released to a staging or production hosting environment without manual intervention.
> - **Practical Demonstration:** This practical demonstrates **Continuous Integration (CI)**. It automatically validates code integrity, dependency resolution, and regression tests on every push/PR to `main`, reporting a clear pass/fail status without pushing to a live cloud host.

#### Q2: Why does running tests automatically on every push catch problems earlier than testing manually before a release?
> **Answer:**
> 1. **Immediate Feedback Loop:** Developers get notified within 1–2 minutes of pushing code if their commit broke existing functionality, while the mental context of the change is still fresh.
> 2. **Isolation of Defects:** Because tests run on every granular commit, isolating the exact commit and line of code that introduced a defect takes seconds instead of hours of git bisecting.
> 3. **Eliminates Human Error:** Manual pre-release testing often skips edge cases, regression paths, or unadvertised side effects due to time pressure or fatigue. Automated CI runs the exact same test matrix objectively every time.

#### Q3: What would happen to the pipeline if the test file path were incorrect — would the workflow fail at the same step as a genuine test failure?
> **Answer:**
> - **No, it would fail at a different step or with a different failure mode.**
> - If Jest is explicitly pointed to a non-existent file path (e.g., `jest backend/wrong-path/api.test.js`), Jest exits immediately with code `1` reporting `No tests found` or `ENOENT: no such file or directory`.
> - In contrast, a genuine test failure occurs **after** the test suite is discovered, loaded, and executed, failing on an assertion mismatch (`expect(received).toBe(expected)`).
> - Furthermore, if Jest was configured with `--passWithNoTests`, an incorrect path might silently exit with `0` (passing), falsely greenlighting a pipeline without actually testing any endpoints. This demonstrates why explicit test assertions and clear reporting are essential in CI pipelines.

