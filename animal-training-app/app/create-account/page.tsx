// app/create-account/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CreateAccount.module.css';

const CreateAccount = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const res = await fetch('pages/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password, isAdmin }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      router.push('/login');
    } else {
      setError(data.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <img src="./pawlogo.png" alt="paw icon" className={styles.logoIcon} />
        <h1 className={styles.logoText}>Progress</h1>
      </header>
      <div className={styles.createAccountContainer}>
        <h1 className={styles.heading}>Create Account</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            required
            className={styles.input}
          />
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className={styles.input}
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Admin access
          </label>
          <button type="submit" className={styles.button}>Sign up</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <p className={styles.loginLink}>Already have an account? <a href="/login">Sign in</a></p>
      </div>
      <div className={styles.footer}>
        Made with ❤️ by Long Lam<br />
        © 2023 BOG Developer Bootcamp. All rights reserved.
      </div>
      <div className={styles.quarterCircle}></div>
    </div>
  );
};

export default CreateAccount;
