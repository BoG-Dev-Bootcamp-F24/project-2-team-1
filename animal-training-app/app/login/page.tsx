"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State for errors
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const res = await fetch('pages/api/user/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Login successful:', data);
        router.push('/animal-dashboard'); // Redirect to the animal dashboard
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <img src="../pawlogo.png" alt="Logo" />
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

      <div className={styles.quarterCircle}></div>
    </div>
  );
};

export default LoginPage;
