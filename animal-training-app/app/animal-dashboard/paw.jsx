import React from "react";
import styles from "./paw.module.css"; // Import the CSS module

const Paw = () => {
    return (
        <div className={styles.topBar}>
            <div className={styles.logo}>
                <img src="pawlogo.png" alt="Paw Logo" className={styles.logoImage} />
                <h1 className={styles.logoText}>Progress</h1>
            </div>
        </div>
    );
};

export default Paw;
