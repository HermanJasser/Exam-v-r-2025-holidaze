import React from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/25 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-sekBG overflow-hidden w-full max-w-lg p-10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b ">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
