// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-150px)] bg-primBG flex flex-col items-center justify-center p-4">
      <h1 className="text-9xl font-bold text-primGreen">404</h1>
      <p className="mt-4 text-2xl text-textSek">Oops! The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="mt-6 inline-block bg-primGreen text-white px-6 py-2 rounded hover:bg-sekGreen transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
