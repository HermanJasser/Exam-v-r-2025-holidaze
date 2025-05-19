// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken]     = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading]   = useState(true);

  // Les fra localStorage ved init
  useEffect(() => {
    const storedToken    = localStorage.getItem('accessToken');
    const storedUsername = localStorage.getItem('username');
    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
    }
    setLoading(false);
  }, []);

  // Synkroniser til localStorage når de endres
  useEffect(() => {
    if (token && username) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
    }
  }, [token, username]);

  // Funksjon for å logge inn
  const login = (accessToken, name) => {
    setToken(accessToken);
    setUsername(name);
  };

  // Funksjon for å logge ut
  const logout = () => {
    setToken(null);
    setUsername(null);
  };

  const value = {
    token,
    username,
    loading,
    login,
    logout,
    isAuthenticated: !!token && !!username,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
