import React, { useState } from 'react';
import { useLocation } from 'wouter';
import axios from 'axios';
import Modal from './Modal';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [, setLocation] = useLocation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials = { email, password };

    try {
      const response = await axios.post('http://127.0.0.1:3000/login', credentials, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem('customer_id', user.customer_id);
        setMessage('Login successful!');
        setLocation('/dashboard');
      } else {
        setMessage(response.data.error || 'Login failed');
        setShowModal(true);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setMessage('');
  };

  return (
    <div className="container">
      <div className="login form">
        <header className="header">Login</header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="passwordInputContainer">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="passwordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={togglePasswordVisibility} className="toggleButton">
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          <input
            type="submit"
            className="button"
            value="Login"
          />
        </form>
      </div>
      {showModal && <Modal message={message} onClose={closeModal} />}
    </div>
  );
};

export default Login;