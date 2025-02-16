import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard } from './components/AuthGuard';
import { AuthLayout } from './components/AuthLayout';
import { Navigation } from './components/Navigation';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewEntry from './pages/NewEntry';
import InspirationFeed from './pages/InspirationFeed';
import LongTermGoals from './pages/LongTermGoals';
import Pricing from './pages/Pricing';
import CalendarPage from './pages/CalendarPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AuthLayout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <Navigation />
                  <Dashboard />
                </AuthGuard>
              }
            />
            <Route
              path="/new-entry"
              element={
                <AuthGuard>
                  <Navigation />
                  <NewEntry />
                </AuthGuard>
              }
            />
            <Route
              path="/inspiration"
              element={
                <AuthGuard>
                  <Navigation />
                  <InspirationFeed />
                </AuthGuard>
              }
            />
            <Route
              path="/calendar"
              element={
                <AuthGuard>
                  <Navigation />
                  <CalendarPage />
                </AuthGuard>
              }
            />
            <Route
              path="/long-term-goals"
              element={
                <AuthGuard>
                  <Navigation />
                  <LongTermGoals />
                </AuthGuard>
              }
            />
            <Route
              path="/pricing"
              element={
                <AuthGuard>
                  <Navigation />
                  <Pricing />
                </AuthGuard>
              }
            />
          </Routes>
        </AuthLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}