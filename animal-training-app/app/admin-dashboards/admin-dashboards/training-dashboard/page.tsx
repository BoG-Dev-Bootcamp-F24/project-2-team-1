'use client';

import React, { useState, useEffect } from 'react';
import TopBar from '../animal-dashboard/Topbar';
import TrainLogNew from './TrainLogNew';
import styles from './trainLogs.module.css';
import Paw from '../../../animal-dashboard/Paw';

const TrainingLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<{ date: string; title: string; description: string }[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/admin/training-logs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error((await response.json()).message || 'Failed to fetch training logs');
        }

        const data = await response.json();
        setLogs(data.logs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleCreateLog = (newLog: { date: string; title: string; description: string }) => {
    setLogs((prevLogs) => [newLog, ...prevLogs]);
    setIsCreating(false);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  return (
    <div className={styles.pageContainer}>
      <Paw />
      <TopBar title="Training Logs" onCreateClick={handleCreateClick} />
      {isCreating ? (
        <TrainLogNew onCreateLog={handleCreateLog} onCancelCreate={handleCancelCreate} />
      ) : isLoading ? (
        <p>Loading training logs...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.logsContainer}>
          {logs.map((log, index) => (
            <div key={index} className={styles.trainingLogContainer}>
              <div className={styles.logDateContainer}>
                <div className={styles.logDateDay}>{log.date.split(' ')[0]}</div>
                <div className={styles.logDateMonthYear}>{log.date.substring(3)}</div>
              </div>
              <div className={styles.logContentContainer}>
                <div className={styles.logHeader}>
                  <h3 className={styles.logTitle}>{log.title}</h3>
                </div>
                <p className={styles.logDescription}>{log.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainingLogsPage;
