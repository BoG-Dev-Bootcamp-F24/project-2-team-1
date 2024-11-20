"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import styles from './login.module.css'; // Import the CSS module

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State for error handling
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // Save the token to local storage
        localStorage.setItem('token', data.token);

        // Redirect to the animal-dashboard
        router.push('/animal-dashboard');
      } else {
        // Handle error from server
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Top Progress Bar */}
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <img src="../pawlogo.png" alt="Logo" /> {/* Update with your logo path */}
          Progress
        </div>
      </div>

      <h1 className={styles.header}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Log in
        </button>
        {error && <p className={styles.error}>{error}</p>} {/* Display error */}
      </form>

      <p className={styles.footer}>
        Don’t have an account?{' '}
        <a href="/create-account" className={styles.link}>
          Sign up
        </a>
      </p>

      <footer className={styles.footer}>
        Made with ♡ by Long Lam<br />
        © 2023 BOG Developer Bootcamp. All rights reserved.
      </footer>

      {/* Quarter Circle Element */}
      <div className={styles.quarterCircle}></div>
    </div>
  );
};

export default LoginPage;
