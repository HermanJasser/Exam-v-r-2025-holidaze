// src/components/Modals/Modal.jsx
import React from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/25 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="
          bg-sekBG 
          w-fit     
          max-w-[90vw]             
          max-h-[90vh]    
      
         
         
          p-6
        "
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-2xl leading-none">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}
