import React, { useState, useEffect } from 'react';
import styles from './trainLogs.module.css';

interface TrainLogNewProps {
  onCreateLog: (newLog: { date: string; title: string; description: string }) => void;
  onCancelCreate: () => void;
}

const TrainLogNew: React.FC<TrainLogNewProps> = ({ onCreateLog, onCancelCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    animal: '',
    hoursTrained: '',
    month: 'October',
    date: '20',
    year: '2023',
    note: ''
  });

  const [animals, setAnimals] = useState<{ _id: string; name: string; breed: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
        const response = await fetch('/api/animals', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch animals');
        }

        const data = await response.json();
        setAnimals(data.animals);
        setFormData((prev) => ({
          ...prev,
          animal: data.animals[0]?._id || '',
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    fetchAnimals();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);

    const newLog = {
      title: formData.title,
      animal: formData.animal,
      hoursTrained: parseInt(formData.hoursTrained, 10),
      date: new Date(`${formData.year}-${formData.month}-${formData.date}`).toISOString(),
      description: formData.note
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/training-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newLog),
      });

      if (!response.ok) {
        throw new Error((await response.json()).message || 'Failed to create training log');
      }

      const savedLog = await response.json();

      onCreateLog(savedLog);

      setFormData({
        title: '',
        animal: animals[0]?._id || '',
        hoursTrained: '',
        month: 'October',
        date: '20',
        year: '2023',
        note: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>Training logs</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="animal">Select Animal</label>
          <select
            id="animal"
            name="animal"
            value={formData.animal}
            onChange={handleChange}
            required
          >
            {animals.map((animal) => (
              <option key={animal._id} value={animal._id}>
                {animal.name} - {animal.breed}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="hoursTrained">Total hours trained</label>
          <input
            type="number"
            id="hoursTrained"
            name="hoursTrained"
            value={formData.hoursTrained}
            onChange={handleChange}
            placeholder="20"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="month">Month</label>
          <select
            id="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
          >
            <option value="October">October</option>
            <option value="November">November</option>
          </select>

          <label htmlFor="date">Date</label>
          <input
            type="number"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="20"
            required
          />

          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="2023"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="note">Note</label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Note"
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.cancelButton} onClick={onCancelCreate} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className={styles.saveButton} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrainLogNew;
