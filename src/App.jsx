// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home/Home';
import SingleVenue from './pages/SingleVenue/SingleVenue';
import Dashboard from './pages/Dashboard/Dashboard';
import SearchedVenues from './pages/Searched/SearchedVenues';
import Layout from './components/Layout';
import ProtectedRoute from './context/ProtectedRoute';  

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/venue/:id" element={<SingleVenue />} />
            <Route path="/search/" element={<SearchedVenues />} />
            <Route path="/Dashboard/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;

