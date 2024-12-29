import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [role, setRole] = useState(localStorage.getItem('role')); 
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);
  
  return (
    
    <div className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <button className="sidebar-close-btn" onClick={toggleSidebar}>
        ✖
      </button>
     
      <ul className='sidebar-menu'>
        {isLoggedIn ? (
          <>
            {role === 'admin' ? (
              <>
                <li>
                  <Link to="/manage-products">Manage Products</Link>
                </li>
                <li>
                  <Link to="/manage-categories">Manage Categories</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/categories">Categories</Link>
                </li>
                <li>
                  <Link to="/my-orders">My Orders</Link>
                </li>
              </>
            )}
          </>
        ) : (
          <>
          <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/display-products">Products</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
      
    </div>
  );
};

export default Sidebar;



