import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link to="/" className="not-found-btn">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
