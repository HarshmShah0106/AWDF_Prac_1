import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';

/**
 * Helper function to simulate network delay for demonstration of PageLoader spinner
 * Matches Practical 8 manual screenshot 2 implementation
 */
function lazyWithDelay(importPromise, delay = 800) {
  return lazy(() =>
    Promise.all([
      importPromise(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([moduleExports]) => moduleExports)
  );
}

// Practical 8: Route-based Code Splitting using React.lazy()
const Home = lazyWithDelay(() => import('./pages/Home'), 400);
const ProjectsPage = lazyWithDelay(() => import('./pages/ProjectsPage'), 800);
const ContactPage = lazyWithDelay(() => import('./pages/ContactPage'), 800);
const TasksPage = lazyWithDelay(() => import('./pages/TasksPage'), 600);
const CacheDemoPage = lazyWithDelay(() => import('./pages/CacheDemoPage'), 500);
const LoginPage = lazyWithDelay(() => import('./pages/LoginPage'), 600);
const RegisterPage = lazyWithDelay(() => import('./pages/RegisterPage'), 600);
const NotFound = lazyWithDelay(() => import('./pages/NotFoundPage'), 400);

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <AuthProvider>
      <div className={`page-wrapper ${isDark ? 'dark-theme' : 'light-theme'}`}>
        <Navbar isDark={isDark} setIsDark={setIsDark} />

        <main className="main-task-view">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TasksPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cache"
                element={
                  <ProtectedRoute>
                    <CacheDemoPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}
