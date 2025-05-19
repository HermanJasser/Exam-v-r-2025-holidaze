// src/components/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading…</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // eks. send til hjem eller login
  }

  return children;
}