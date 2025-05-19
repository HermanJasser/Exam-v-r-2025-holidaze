import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SingleVenue from './pages/SingleVenue/SingleVenue';
import Layout from './components/Layout';

function App() {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/venue/:id" element={<SingleVenue />} />
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;
