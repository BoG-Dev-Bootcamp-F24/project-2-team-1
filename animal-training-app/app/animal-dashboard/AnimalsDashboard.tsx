'use client';

import React, { useState, useEffect } from 'react';
import Animal from './Animal';
import TopBar from './Topbar';
import AnimalForm from './AnimalForm';
import styles from './AnimalsDashboard.module.css';
import { useRouter } from 'next/navigation';

// Define the type for Animal
interface AnimalType {
  id: string;
  name: string;
  breed: string;
  owner?: string;
  hoursTrained: number;
  imageUrl: string;
}

const AnimalsDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [animals, setAnimals] = useState<AnimalType[]>([]); // Specify AnimalType here
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
      setLoading(true);
  
      try {
        const response = await fetch('pages/api/user/animals'); // No need to set Authorization, cookies are automatically sent
        if (response.ok) {
          const data = await response.json();
          setAnimals(data.animals); // Assuming the API response includes `animals`
        } else if (response.status === 401) {
          router.push('/login'); // Redirect if unauthorized
        } else {
          console.error('Failed to fetch animals:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching animals:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAnimals();
  }, [router]);


  const handleCreateClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate required fields
    if (!formData.name || !formData.breed || formData.hoursTrained === '') {
      setError('Please fill in all fields.');
      return;
    }
  
    try {
      const response = await fetch('pages/api/animal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // No Authorization needed
        },
        body: JSON.stringify({
          name: formData.name,
          breed: formData.breed,
          hoursTrained: Number(formData.hoursTrained), // Ensure hoursTrained is a number
          imageUrl: formData.imageUrl,
          birthMonth: formData.birthMonth,
          birthDate: Number(formData.birthDate),
          birthYear: Number(formData.birthYear),
          note: formData.note,
        }),
      });
  
      const data = await response.json();
      console.log('Response:', response.status, data);
      if (response.ok) {
        // Update UI with the newly created animal
        setAnimals((prevAnimals) => [...prevAnimals, data.animal]);
        setShowForm(false);
        setError('');
      } else if (response.status === 401) {
        setError('Your session has expired. Please log in again.');
        router.push('/login'); // Redirect to login if unauthorized
      } else {
        setError(data.message || 'Failed to add animal');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error(error);
    }
  };
  

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/pages/api/user/session');
        if (!res.ok) router.push('/login');
      } catch (error) {
        console.error('Session check failed:', error);
        router.push('/login');
      }
    };
    checkSession();
  }, [router]);
  
  

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
