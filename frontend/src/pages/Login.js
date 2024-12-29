import React, { useState } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = { email, password };

    try {
      const response = await Axios.post('http://localhost:5000/api/login', credentials);

      if (response.status === 200) {
        const { role } = response.data;

        localStorage.setItem('role', role);
        localStorage.setItem('isLoggedIn', true);

        if (role === 'admin') {
          navigate('/manage-products');
        } else {
          navigate('/products');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="login-btn" onClick={handleLogin}>Login</button>
          <div className="footer-links">
            <a href="#">Forgot Password?</a>
            <a href="#">Create Account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
