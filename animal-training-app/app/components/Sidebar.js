import React from 'react';
import Link from 'next/link';
import { FaClipboardList, FaDog, FaFolderOpen, FaUsers } from 'react-icons/fa'; // Import icons from react-icons

const Sidebar = () => {
  return (
    <div className="container">
      <div className="sidenav">
        {/* Links with icons */}
        <Link href="/AnimalsDashboard" className="sidebarLink">
          <div className="linkContent">
            <FaClipboardList className="icon" /> Training Logs
          </div>
        </Link>
        <Link href="/AnimalsDashboard" className="sidebarLink active">
          <div className="linkContent">
            <FaDog className="icon" /> Animals
          </div>
        </Link>
        <hr />
        <p className="adminTitle">Admin access</p>
        <Link href="/AnimalsDashboard" className="sidebarLink">
          <div className="linkContent">
            <FaFolderOpen className="icon" /> All Training
          </div>
        </Link>
        <Link href="/AnimalsDashboard" className="sidebarLink">
          <div className="linkContent">
            <FaDog className="icon" /> All Animals
          </div>
        </Link>
        <Link href="/AnimalsDashboard" className="sidebarLink">
          <div className="linkContent">
            <FaUsers className="icon" /> All Users
          </div>
        </Link>
      </div>

      
      <style jsx>{`
        .container {
          display: flex;
          height: 100vh; /* Full height to take up the entire screen */
        }

        .sidenav {
          display: flex;
          flex-direction: column;
          padding: 20px;
          width: 200px; /* Sidebar width */
          background-color: #ffffff; /* White background */
          border-right: 1px solid #ddd; /* Border between sidebar and content */
          min-height: 100vh; /* Full height */
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

        .mainContent {
          flex-grow: 1;
          padding: 20px;
          background-color: #f4f4f4;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
