import React from 'react';
import styles from './Animal.module.css';

interface AnimalProps {
  id: string;
  name: string;
  breed: string;
  owner?: string;
  hoursTrained: number;
  imageUrl: string;
}

const Animal: React.FC<AnimalProps> = ({ name, breed, owner = 'Unknown', hoursTrained, imageUrl }) => {
  return (
    <div className={styles.card}>
      <img src={'https://www.healthypawspetinsurance.com/Images/V3/DogAndPuppyInsurance/Dog_CTA_Desktop_HeroImage.jpg'} alt={`${name} - ${breed}`} className={styles.image} />

      <div className={styles.details}>
        <div className={styles.ownerInitial}>
          {owner ? owner.charAt(0).toUpperCase() : '?'}
        </div>
        <div className={styles.textContent}>
          <h3 className={styles.nameBreed}>
            {name} - {breed}
          </h3>
          <p className={styles.ownerHours}>
            {owner} • Trained: {hoursTrained} hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default Animal;
