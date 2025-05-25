import React, { useState } from 'react';
import Modal from './Modal';

const BASE = 'https://v2.api.noroff.dev';

export default function RegisterModal({
  isOpen,
  onClose,
  onRegisterSuccess,
  onOpenLogin,
}) {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]   = useState({ name: '', email: '', password: '', submit: '' });

  const validate = () => {
    const newErrors = { name: '', email: '', password: '', submit: '' };
    let valid = true;

    // 1) Name: kun bokstaver, tall og underscore
    if (!/^[A-Za-z0-9_]+$/.test(name)) {
      newErrors.name = 'The name value must not contain punctuation symbols apart from underscore (_).';
      valid = false;
    }

    // 2) Email: stud.noroff.no
    if (!/^[A-Za-z0-9._%+-]+@stud\.noroff\.no$/.test(email)) {
      newErrors.email = 'The email value must be a valid stud.noroff.no email address.';
      valid = false;
    }

    // 3) Password: minst 8 tegn
    if (password.length < 8) {
      newErrors.password = 'The password value must be at least 8 characters.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async e => {
    e.preventDefault();
    setErrors(prev => ({ ...prev, submit: '' }));
  
    if (!validate()) return;
  
    try {
      const res = await fetch(`${BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
  
      const json = await res.json();

      const apiMessage = json.errors?.[0]?.message || `Status ${res.status}`;
  
      console.error('API error message:', apiMessage);
  
    
      if (!res.ok) throw new Error(apiMessage);
  
    
      onRegisterSuccess(json.data.accessToken);
      onClose();
  
    } catch (err) {
     
      console.error('Caught error:', err.message);
      setErrors(prev => ({ ...prev, submit: err.message }));
    }
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create account">
      <form onSubmit={handleRegister} className="flex w-[350px] flex-col gap-4">
        {errors.submit && <p className="text-redPrim">{errors.submit}</p>}

        <div>
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primGreen"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          {errors.name && <p className="text-redPrim text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primGreen"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="text-redPrim text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primGreen"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="text-redPrim text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="bg-primGreen text-white py-2 rounded hover:bg-sekGreen transition"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{' '}
        <button
          type="button"
          className="underline text-primGreen hover:text-sekGreen transition"
          onClick={() => {
            onClose();
            onOpenLogin();
          }}
        >
          Log in
        </button>
      </p>
    </Modal>
  );
}
