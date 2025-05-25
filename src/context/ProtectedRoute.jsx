import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading.jsx";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
