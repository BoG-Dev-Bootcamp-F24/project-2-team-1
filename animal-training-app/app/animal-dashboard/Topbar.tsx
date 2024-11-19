import React from 'react';
import styles from './TopBar.module.css';
import { FaPlus } from 'react-icons/fa'; // Using Font Awesome icon for the plus sign

interface TopBarProps {
    onCreateClick: () => void;
}
const TopBar: React.FC<TopBarProps> = ({ onCreateClick}) => {
  return (
    <div className={styles.topBar}>
      <h2 className={styles.title}>Animals</h2>
      <button className={styles.createButton} onClick={onCreateClick}>
        <FaPlus className={styles.icon} /> Create new
      </button>
    </div>
  );
};

export default TopBar;
