import React from 'react';
import './trainLogs.css';

interface TrainingLogProps {
  date: string;
  title: string;
  description: string;
}

const TrainLogNew: React.FC<TrainingLogProps> = ({ date, title, description }) => {
  return (
    <div className="trainingLogContainer">
      <div className="logDateContainer">
        <p className="logDateDay">{date.split(' ')[0]}</p>
        <p className="logDateMonthYear">{date.split(' ').slice(1).join(' ')}</p>
      </div>
      <div className="logContentContainer">
        <div className="logHeader">
          <h3 className="logTitle">{title}</h3>
          <span className="logHours">• 20 hours</span>
        </div>
        <p className="logDescription">{description}</p>
        <p className="logSubtitle">Long Lam - Golden Retriever - Lucy</p>
      </div>
      <button className="editButton">
        <i className="material-icons">edit</i>
      </button>
    </div>
  );
};

export default TrainLogNew;
