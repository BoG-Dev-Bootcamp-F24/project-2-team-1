'use client'
import React, { useState, useEffect } from 'react';
import Animal from './Animal';
import TopBar from './Topbar';
import AnimalForm from './AnimalForm'; // Import the new AnimalForm component
import styles from './AnimalsDashboard.module.css';

const AnimalsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    hoursTrained: '',
    imageUrl: '',
    birthMonth: '',
    birthDate: '',
    birthYear: '',
    note: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setAnimals([
        {
          id: '1',
          name: 'Bella',
          breed: 'Golden Retriever',
          owner: 'John Doe',
          hoursTrained: 120,
          imageUrl: 'https://example.com/images/bella.jpg',
        },
        {
          id: '2',
          name: 'Max',
          breed: 'Bulldog',
          owner: 'Jane Smith',
          hoursTrained: 80,
          imageUrl: 'https://example.com/images/max.jpg',
        },
        {
          id: '3',
          name: 'Luna',
          breed: 'Poodle',
          hoursTrained: 100,
          imageUrl: 'https://example.com/images/luna.jpg',
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const handleCreateClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.breed || !formData.hoursTrained) {
      setError('Please fill in all fields.');
      return;
    }
    const newAnimal = {
      id: String(animals.length + 1),
      ...formData,
      hoursTrained: Number(formData.hoursTrained),
      owner: 'Tracked User',
    };
    setAnimals((prevAnimals) => [...prevAnimals, newAnimal]);
    setShowForm(false);
    setError('');
  };

  return (
    <div className={styles.entireDashboard}>
      <TopBar onCreateClick={handleCreateClick} />
      {showForm ? (
        <AnimalForm
          formData={formData}
          error={error}
          onCancel={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
          onInputChange={handleInputChange}
        />
      ) : (
        <div className={styles.animalContainer}>
          {loading ? (
            <p>Loading animals...</p>
          ) : (
            animals.map((animal) => (
              <Animal
                key={animal.id}
                id={animal.id}
                name={animal.name}
                breed={animal.breed}
                owner={animal.owner}
                hoursTrained={animal.hoursTrained}
                imageUrl={animal.imageUrl}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AnimalsDashboard;
