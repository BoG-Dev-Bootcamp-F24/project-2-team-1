// User.tsx
import React from 'react';
import styles from './User.module.css';

interface UserProps {
  name?: string;
  role: string;
  location: string;
}

const User: React.FC<UserProps> = ({ name = 'N/A', role, location }) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.userAvatar}>
        <span className={styles.userInitial}>{name ? name.charAt(0) : 'N'}</span>
      </div>
      <div className={styles.userInfo}>
        <h3 className={styles.userName}>{name}</h3>
        <p className={styles.userDetails}>
          {role} &bull; {location}
        </p>
      </div>
    </div>
  );
};

export default User;
