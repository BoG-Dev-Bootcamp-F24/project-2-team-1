// pages/login/page.tsx
"use client";

import { useState } from 'react';
import styles from './login.module.css'; // Import the CSS module

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.message);
    if (data.token) {
      localStorage.setItem('token', data.token);
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
        <button type="submit" className={styles.button}>Log in</button>
      </form>

      <p className={styles.footer}>
        Don’t have an account? <a href="/create-account" className={styles.link}>Sign up</a>
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
