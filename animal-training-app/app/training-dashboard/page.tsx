'use client'
import React from 'react';
import TopBar from '../animal-dashboard/Topbar';
import './trainLogs.css';

// Define the TrainingLog component directly in this file
const TrainingLog = ({ date, title, description }) => (
  <div className="logItem">
    <h3>{title}</h3>
    <p className="logDate">{date}</p>
    <p className="logDescription">{description}</p>
  </div>
);

const TrainingLogsPage = () => {
  const logs = [
    { date: '20 Oct - 2023', title: 'Complete sit lessons', description: 'Lucy finishes the sit lessons very well today. Should give her a treat' },
    { date: '19 Oct - 2023', title: 'Complete fetch lessons', description: 'Max did very well with fetch today!' },
    { date: '18 Oct - 2023', title: 'Complete agility training', description: 'Bella showed significant improvement in agility.' },
  ];

  return (
    <div className="pageContainer">
      <TopBar title="Training Logs" onCreateClick={() => alert("Create new log")} />
      <div className="logsContainer">
        {logs.map((log, index) => (
          <TrainingLog key={index} date={log.date} title={log.title} description={log.description} />
        ))}
      </div>
    </div>
  );
};

export default TrainingLogsPage;
