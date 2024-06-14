import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import axios from 'axios';
import Modal from './Modal';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [, setLocation] = useLocation();

  const styles = {
    container: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '430px',
      width: '100%',
      background: '#fff',
      borderRadius: '7px',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
    },
    form: {
      padding: '2rem',
    },
    header: {
      fontSize: '2rem',
      fontWeight: 500,
      textAlign: 'center' as 'center',
      marginBottom: '1.5rem',
    },
    input: {
      height: '60px',
      width: '100%',
      padding: '0 15px',
      fontSize: '17px',
      marginBottom: '1.3rem',
      border: '1px solid #ddd',
      borderRadius: '6px',
      outline: 'none',
    },
    button: {
      color: '#fff',
      background: '#05668D',
      fontSize: '1.2rem',
      fontWeight: 500,
      letterSpacing: '1px',
      marginTop: '1.7rem',
      cursor: 'pointer',
      transition: '0.4s',
    },
    buttonHover: {
      background: '#006653',
    },
    link: {
      fontSize: '16px',
      color: '#05668D',
      textDecoration: 'none',
    },
    linkHover: {
      textDecoration: 'underline',
    },
    signup: {
      fontSize: '17px',
      textAlign: 'center' as 'center',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    try {
      const response = await axios.post('http://127.0.0.1:3000/login', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
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
    <div style={styles.container}>
      <div className="login form" style={styles.form}>
        <header style={styles.header}>Login</header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" style={styles.link}>
            Forgot password?
          </a>
          <input
            type="submit"
            className="button"
            value="Login"
            style={styles.button}
            onMouseOver={(e) => ((e.target as HTMLInputElement).style.background = styles.buttonHover.background)}
            onMouseOut={(e) => ((e.target as HTMLInputElement).style.background = styles.button.background)}
          />
        </form>
        <div className="signup" style={styles.signup}>
          <span className="signup">
            Don't have an account?
            <Link href="/signup" style={styles.link}>
              Signup
            </Link>
          </span>
        </div>
      </div>
      {showModal && <Modal message={message} onClose={closeModal} />}
    </div>
  );
};

export default Login;
