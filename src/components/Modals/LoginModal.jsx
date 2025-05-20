// src/Modals/LoginModal.jsx
import React, { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '../../context/AuthContext';

const BASE = 'https://v2.api.noroff.dev';

export default function LoginModal({ isOpen, onClose, onOpenRegister }) {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const { login }               = useAuth(); 

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `Status ${res.status}`);
      localStorage.setItem('accessToken', json.data.accessToken);
        localStorage.setItem('username', json.data.name);
      //console.log('Login successful:', json.data.name);
     // onLoginSuccess(json.data.accessToken);
     login(json.data.accessToken, json.data.name);
      onClose();
      
    } catch {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log in">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        {error && <p className="text-redPrim">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primGreen"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primGreen"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-primGreen text-white py-2 rounded hover:bg-sekGreen transition"
        >
          Continue
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <button
          type="button"
          className="underline text-primGreen hover:text-sekGreen transition"
          onClick={() => {
            onClose();
            onOpenRegister();
          }}
        >
          Create an account
        </button>
      </p>
    </Modal>
  );
}

