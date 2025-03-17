import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogItem from './BlogItem';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch all blogs from the API
    axios.get('http://localhost:5000/api/blogs')
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="blog-list-container">
      <h2 className="blog-list-title">Blogs</h2>
      <div className="blog-list">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogItem key={blog._id} blog={blog} />
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
}

export default BlogList;
