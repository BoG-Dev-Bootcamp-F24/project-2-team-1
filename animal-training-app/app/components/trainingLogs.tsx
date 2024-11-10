import React from 'react';
import DashboardLayout from './DashboardLayout';
import TopBar from './TopBar';
import TrainingLog from './TrainingLog';
import styles from './TrainingLogsPage.module.css';

const TrainingLogsPage: React.FC = () => {
  const logs = [
    { date: '20 Oct - 2023', title: 'Complete sit lessons', description: 'Lucy finishes the sit lessons very well today. Should give her a treat' },
    { date: '19 Oct - 2023', title: 'Complete fetch lessons', description: 'Max did very well with fetch today!' },
    { date: '18 Oct - 2023', title: 'Complete agility training', description: 'Bella showed significant improvement in agility.' }
  ];

  return (
    <DashboardLayout>
      <TopBar onCreateClick={() => alert("Create new log")} />
      <div className={styles.logsContainer}>
        {logs.map((log, index) => (
          <TrainingLog key={index} date={log.date} title={log.title} description={log.description} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TrainingLogsPage;
