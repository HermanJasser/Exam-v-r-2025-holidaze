import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken]     = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading]   = useState(true);

 
  useEffect(() => {
    const storedToken    = localStorage.getItem('accessToken');
    const storedUsername = localStorage.getItem('username');
    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
    }
    setLoading(false);
  }, []);

  
  useEffect(() => {
    if (token && username) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
    }
  }, [token, username]);

  
  const login = (accessToken, name) => {
    setToken(accessToken);
    setUsername(name);
  };


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
