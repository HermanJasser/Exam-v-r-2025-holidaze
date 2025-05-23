// src/components/Loading.jsx
import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <img
        src="/assets/Holidaze.svg"
        alt="Holidaze logo"
        className="h-12 mb-4 animate-pulse"
      />
      <div
        className="w-10 h-10 border-4 border-primGreen border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

