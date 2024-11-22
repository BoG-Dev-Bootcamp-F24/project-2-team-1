'use client';

import React, { useEffect, useState } from 'react';
import styles from './UsersDashboard.module.css';
import TopBar from '../animal-dashboard/Topbar';
import User from './User';
import Sidebar from '../components/Sidebar';
import Paw from '../animal-dashboard/Paw'; // Import the Paw component


const UsersDashboard = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [users, setUsers] = useState<{ fullName: string; email: string; isAdmin: boolean }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');

        const roleResponse = await fetch('/api/check-admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!roleResponse.ok) {
          throw new Error('User is not authorized to access this page.');
        }

        const roleData = await roleResponse.json();
        setIsAdmin(roleData.isAdmin);

        const usersResponse = await fetch('/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users.');
        }

        const usersData = await usersResponse.json();
        setUsers(usersData.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (isAdmin === false) {
    return <div className={styles.error}>Access Denied: You must be an admin to view this page.</div>;
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
  <div className={styles.entireDashboard}>
    <Paw />
    <TopBar title="All users" showCreateButton={false} />
    <div className={styles.contentWrapper}>
      <Sidebar />
      <div className={styles.userContainer}>
        {users.map((user, index) => (
          <div className={styles.userCard} key={index}>
            <User
              name={user.fullName}
              role={user.isAdmin ? 'Admin' : 'User'}
              location={user.email}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default UsersDashboard;
