import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authcontext';

export default function Signup({ setShowSignup }) {
  const { saveToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post("https://taskmanager-backend-dlz9.onrender.com/api/auth/signup", { email, password });
      saveToken(res.data.token);
    } catch (err) {
      setError('Registration failed. Try another email.');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '400px' }}>
        <h2 className="mb-3 text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?{' '}
          <button
            onClick={() => setShowSignup(false)}
            className="btn btn-link p-0"
            style={{ textDecoration: 'underline' }}
          >
            Login
          </button>
        </p>
        {error && <p className="text-danger text-center">{error}</p>}
      </div>
    </div>
  );
}
