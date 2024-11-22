import React from 'react';
import Link from 'next/link';
import { FaClipboardList, FaDog, FaFolderOpen, FaUsers, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidenav">
      {/* Links with icons */}
      <Link href="/training-dashboard" className="sidebarLink">
        <div className="linkContent">
          <FaClipboardList className="icon" /> Training Logs
        </div>
      </Link>
      <Link href="/animal-dashboard" className="sidebarLink active">
        <div className="linkContent">
          <FaDog className="icon" /> Animals
        </div>
      </Link>
      <hr />
      <p className="training-dashboard">Admin access</p>
      <Link href="/admin-dashboards/training-dashboard" className="sidebarLink">
        <div className="linkContent">
          <FaFolderOpen className="icon" /> All Training
        </div>
      </Link>
      <Link href="admin-dashboards/animal-dashboard" className="sidebarLink">
        <div className="linkContent">
          <FaDog className="icon" /> All Animals
        </div>
      </Link>
      <Link href="/user-dashboard" className="sidebarLink">
        <div className="linkContent">
          <FaUsers className="icon" /> All Users
        </div>
      </Link>

      <hr />
      {/* Log out link */}
      <Link href="/login" className="sidebarLink logoutLink">
        <div className="linkContent">
          <FaSignOutAlt className="icon" /> Log Out
        </div>
      </Link>

      <style jsx>{`
        .sidenav {
          display: flex;
          flex-direction: column;
          padding: 20px;
          width: 200px; /* Sidebar width */
          background-color: #ffffff; /* White background */
          border-right: 1px solid #ddd; /* Border between sidebar and content */
          min-height: 100vh; /* Full height */
          flex-shrink: 0; /* Prevent shrinking */
        }
        .sidebarLink {
          display: block;
          padding: 12px 0;
          margin-bottom: 10px;
          text-decoration: none;
          transition: background-color 0.3s, color 0.3s;
        }
        .linkContent {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          border-radius: 8px;
          color: #333;
          background-color: transparent;
          font-weight: 500;
          transition: background-color 0.3s, color 0.3s;
        }
        .sidebarLink:hover .linkContent {
          background-color: #e0e0e0; /* Hover background */
        }
        .active .linkContent {
          background-color: #c62828; /* Red background for active link */
          color: white;
        }
        .icon {
          margin-right: 10px; /* Space between icon and text */
        }
        .adminTitle {
          margin: 15px 0;
          font-size: 14px;
          color: #888;
          font-weight: bold;
        }
        hr {
          margin: 10px 0;
          border: none;
          border-top: 1px solid #ccc;
        }
        .logoutLink .linkContent {
          margin-top: auto; /* Push log out link to the bottom */
          background-color: #f44336; /* Red background for log out */
          color: white; /* White text for log out */
        }
        .logoutLink:hover .linkContent {
          background-color: #d32f2f; /* Darker red on hover */
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
