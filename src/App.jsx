// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home/Home';
import SingleVenue from './pages/SingleVenue/SingleVenue';
import Dashboard from './pages/Dashboard/Dashboard';
import HostVenue from './pages/Dashboard/HostVenue';
import EditVenue from './pages/Dashboard/EditVenue';
import SearchedVenues from './pages/Searched/SearchedVenues';
import Layout from './components/Layout';
import ProtectedRoute from './context/ProtectedRoute';  
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/venue/:id" element={<SingleVenue />} />
            <Route path="/search/" element={<SearchedVenues />} />
            <Route path="*" element={<NotFound />} />
            
            <Route path="/dashboard/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/hostvenue" element={
              <ProtectedRoute>
                <HostVenue />
              </ProtectedRoute>
            } />
             <Route path="/dashboard/editvenue/:id" element={
              <ProtectedRoute>
                <EditVenue />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;

