'use client';

import React, { useEffect, useState } from 'react';
import styles from './AnimalsDashboard.module.css';
import TopBar from './Topbar';
import Animal from './Animal';
import Sidebar from '@/app/components/Sidebar';

const AnimalsDashboard = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // Admin check
  const [animals, setAnimals] = useState<{ 
    _id: string; 
    name: string; 
    breed: string; 
    owner?: string; 
    hoursTrained: number; 
    imageUrl: string; 
  }[]>([]); // List of animals
  const [error, setError] = useState<string | null>(null); // Error state
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const token = localStorage.getItem('token');

        // Check if user is an admin
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

        // Fetch all animals
        const animalsResponse = await fetch('/api/admin/animal', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!animalsResponse.ok) {
          throw new Error('Failed to fetch animals.');
        }

        const animalsData = await animalsResponse.json();
        setAnimals(animalsData.animals); // Update state with fetched animals
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setIsAdmin(false);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchAnimals();
  }, []);

  // Handle error state
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // Handle access denied for non-admin users
  if (isAdmin === false) {
    return <div className={styles.error}>Access Denied: You must be an admin to view this page.</div>;
  }

  // Handle loading state
  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // Render animals dashboard
  return (
    <div className={styles.entireDashboard}>
      <TopBar title="All Animals" showCreateButton={false} />
      <div className={styles.dashboardContainer}>
        <Sidebar />
        <div className={styles.animalContainer}>
          {animals.map((animal) => (
            <Animal
              key={animal._id} // Unique key
              id={animal._id}
              name={animal.name}
              breed={animal.breed}
              owner={animal.owner}
              hoursTrained={animal.hoursTrained}
              imageUrl={animal.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimalsDashboard;
