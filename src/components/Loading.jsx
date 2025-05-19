
import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-primBG flex flex-col items-center justify-center z-50">
      
      <img
        src="/assets/Holidaze.svg"
        alt="Holidaze logo"
        className="h-14 mb-6 animate-pulse"
      />

      <div
        className="w-12 h-12 border-4 border-primGreen border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
