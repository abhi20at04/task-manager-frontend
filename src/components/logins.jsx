import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authcontext';
import styles from './logins.module.css';

const Login = ({ setShowSignup }) => {
  const { saveToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://taskmanager-backend-dlz9.onrender.com/api/auth/login', { email, password });
      saveToken(res.data.token);
      alert('Login successful!');
      // Optionally redirect or update UI here
    } catch (err) {
      setError('Invalid credentials or server error');
    }
  };

  return (
    <div className={`${styles.loginWrapper} container d-flex flex-column align-items-center justify-content-center min-vh-100`}>
      <div className={`card p-4 w-100 ${styles.loginCard}`} style={{ maxWidth: '400px' }}>
        <h2 className="mb-3 text-center">Login</h2>
        <form onSubmit={handleLogin}>
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
            Log In
          </button>
        </form>
        {error && <p className="text-danger text-center">{error}</p>}
        <p className="text-center">
          Don't have an account?{' '}
          <button
            onClick={() => setShowSignup(true)}
            className="btn btn-link p-0"
            style={{ textDecoration: 'underline' }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
