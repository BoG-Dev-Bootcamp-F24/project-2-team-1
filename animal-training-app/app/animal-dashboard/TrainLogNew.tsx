// TrainingLog.tsx
import React from 'react';
import styles from './trainLogs.css';

interface TrainingLogProps {
  date: string;
  title: string;
  description: string;
}

const TrainingLog: React.FC<TrainingLogProps> = ({ date, title, description }) => {
  return (
    <div className={styles.trainingLog}>
      <div className={styles.logDate}>{date}</div>
      <div className={styles.logContent}>
        <h3 className={styles.logTitle}>{title}</h3>
        <p className={styles.logDescription}>{description}</p>
      </div>
      <button className={styles.editButton}>Edit</button>
    </div>
  );
};

export default TrainingLog;
