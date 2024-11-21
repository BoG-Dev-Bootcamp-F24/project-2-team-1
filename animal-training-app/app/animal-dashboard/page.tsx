'use client'
import React, { useState, useEffect } from 'react';
import Animal from './Animal';
import TopBar from './Topbar';
import AnimalForm from './AnimalForm';
import styles from './AnimalsDashboard.module.css';
import Sidebar from '../components/Sidebar';
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
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch('/api/animals', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setAnimals(data.animals);
        } else {
          setError(data.message || 'Failed to load animals');
        }
      } catch (err) {
        setError('Error fetching animals');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const handleCreateClick = () => {
    setShowForm(true);
    setError('');
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleFormSubmitSuccess = (newAnimal) => {
    setAnimals((prevAnimals) => [...prevAnimals, newAnimal]);
    setShowForm(false);
    setFormData({
      name: '',
      breed: '',
      hoursTrained: '',
      imageUrl: '',
      birthMonth: '',
      birthDate: '',
      birthYear: '',
      note: '',
    });
    setError('');
  };

  return (
    <div className={styles.entireDashboard}>
      <TopBar title="All animals" onCreateClick={handleCreateClick} />
      
      <div className={styles.navAndAnimalWrapper}>
      <Sidebar />
        <div className={styles.animalContainerWrapper}>
          {showForm ? (
            <AnimalForm
              formData={formData}
              error={error}
              onCancel={() => setShowForm(false)}
              onSubmitSuccess={handleFormSubmitSuccess}
              onInputChange={handleInputChange}
            />
          ) : (
            loading ? (
              <p>Loading animals...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              animals.map((animal) => (
                <Animal
                  key={animal._id}
                  id={animal._id}
                  name={animal.name}
                  breed={animal.breed}
                  owner={animal.owner}
                  hoursTrained={animal.hoursTrained}
                  imageUrl={animal.profilePicture}
                />
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalsDashboard;