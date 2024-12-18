import React from 'react';
import styles from './AnimalForm.module.css';

interface AnimalFormProps {
  formData: {
    name: string;
    breed: string;
    hoursTrained: string;
    imageUrl: string;
    birthMonth: string;
    birthDate: string;
    birthYear: string;
    note: string;
  };
  error: string;
  onCancel: () => void;
  onSubmitSuccess: (newAnimal: any) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const AnimalForm: React.FC<AnimalFormProps> = ({ formData, error, onCancel, onSubmitSuccess, onInputChange }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('User is not logged in!');
      return;
    }

    const birthDate = `${formData.birthMonth} ${formData.birthDate}, ${formData.birthYear}`;
    const newAnimal = {
      name: formData.name,
      breed: formData.breed,
      hoursTrained: Number(formData.hoursTrained),
      profilePicture: formData.imageUrl,
      birthDate,
      note: formData.note,
    };

    try {
      const response = await fetch('/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAnimal),
      });

      const result = await response.json();

      if (response.ok) {
        onSubmitSuccess(result.animal);
      } else {
        alert(result.message || 'Failed to create animal');
      }
    } catch (err) {
      alert('An error occurred while creating the animal');
    }
  };

  return (
    <form className={styles.animalForm} onSubmit={handleSubmit}>
      <h3>Create New Animal</h3>

      <label>Animal Name</label>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={onInputChange}
      />

      <label>Breed</label>
      <input
        type="text"
        name="breed"
        placeholder="Breed"
        value={formData.breed}
        onChange={onInputChange}
      />

      <label>Total hours trained</label>
      <input
        type="number"
        name="hoursTrained"
        placeholder="100"
        value={formData.hoursTrained}
        onChange={onInputChange}
      />

      <label>Birth Month</label>
      <div className={styles.birthDateGroup}>
        <select name="birthMonth" value={formData.birthMonth} onChange={onInputChange}>
          <option value="">Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <input
          type="number"
          name="birthDate"
          placeholder="Date"
          value={formData.birthDate}
          onChange={onInputChange}
        />
        <input
          type="number"
          name="birthYear"
          placeholder="Year"
          value={formData.birthYear}
          onChange={onInputChange}
        />
      </div>

      <label>Note</label>
      <textarea
        name="note"
        placeholder="Note"
        value={formData.note}
        onChange={onInputChange}
      />

      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.formActions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.saveButton}>Save</button>
      </div>
    </form>
  );
};

export default AnimalForm;
