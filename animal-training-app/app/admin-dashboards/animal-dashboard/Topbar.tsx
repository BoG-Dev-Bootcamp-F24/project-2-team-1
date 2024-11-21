import React from 'react';
import styles from './TopBar.module.css';
import { FaPlus } from 'react-icons/fa';

interface TopBarProps {
  title: string;
  onCreateClick?: () => void;
  showCreateButton?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ title, onCreateClick, showCreateButton = true }) => {
  return (
    <div className={styles.topBar}>
      <h2 className={styles.title}>{title}</h2>
      {showCreateButton && (
        <button className={styles.createButton} onClick={onCreateClick}>
          <FaPlus className={styles.icon} /> Create new
        </button>
      )}
    </div>
  );
};

export default TopBar;
