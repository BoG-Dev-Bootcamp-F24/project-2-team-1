'use client'
import React from "react";
import styles from "./UsersDashboard.module.css";
import TopBar from "./Topbar";
import User from "./User";

const UsersDashboard = () => {
  const users = [
    { name: "Alice", role: "Admin", location: "NYC" },
    { name: "Bob", role: "User", location: "LA" },
  ];

  const handleCreateClick = () => {
    console.log("hello");
  };

  return (
    <div className={styles.entireDashboard}>
      <TopBar title={"All users"} onCreateClick={handleCreateClick} />
      <div className={styles.userContainer}>
        {users.map((user, index) => (
          <User key={index} name={user.name} role={user.role} location={user.location} />
        ))}
      </div>
    </div>
  );
};

export default UsersDashboard;
