'use client'
import React, { useState } from 'react';
import Animal from './Animal';
import styles from './Animal.module.css';

const AnimalsDashboard: React.FC = () => {
  // Temporary hardcoded data to test rendering
  const animals = [
    {
      id: '1',
      name: 'Lucy',
      breed: 'Golden Retriever',
      owner: 'Long Lam',
      hoursTrained: 100,
      imageUrl: 'https://example.com/image.jpg', // Replace with a real image URL
    },
    {
      id: '2',
      name: 'Max',
      breed: 'Labrador',
      owner: 'Sarah Lee',
      hoursTrained: 50,
      imageUrl: 'https://example.com/image2.jpg', // Replace with a real image URL
    },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <h2 className={styles.title}>Animals</h2>
        <button className={styles.createButton}>+ Create new</button>
      </div>
      <hr className={styles.separator} />

      {/* Animal List */}
      <div>
        {loading ? (
          <p>Loading animals...</p>
        ) : (
          animals.map((animal) => (
            <Animal key={animal.id} {...animal} />
          ))
        )}
      </div>
    </div>
  );
};

export default AnimalsDashboard;

