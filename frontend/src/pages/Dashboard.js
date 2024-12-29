import React from "react";
import Sidebar from "../components/Sidebar";
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Welcome to the Admin Dashboard</h2>
        <p>Here you can manage categories, products, and other details of your e-commerce store.</p>
      </div>
    </div>
  );
};

export default Dashboard;
