import React from 'react';
import { Link } from 'react-router-dom';

const handleLogout = () => {
  // Remove the token from localStorage
  localStorage.removeItem('token'); // If using localStorage
  // Or if you're using cookies, you can remove it like so:
  // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

  // Redirect user to login page after logout
  window.location.href = '/login'; // Or you can use React Router's history.push('/login')
}

function Navbar() {
  // Check if the user is logged in by checking the existence of a token in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <h1>Blog App</h1>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>

        {/* Show Create Blog button only if the user is logged in */}
        {isLoggedIn && (
          <Link to="/create">
            <button className="navbar-btn">Create Blog</button>
          </Link>
        )}

        {/* Show Login/Signup if not logged in, otherwise show Logout */}
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button className="navbar-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
