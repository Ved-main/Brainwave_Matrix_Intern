import React from 'react';
import BlogList from '../components/BlogList';


function Home() {
  return (
    <div className="home-container">
      <h1>All Blogs</h1>
      <BlogList />
    </div>
  );
}

export default Home;
