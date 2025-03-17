import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogForm from '../components/BlogForm';
import { useNavigate, useParams } from 'react-router-dom';

function EditBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  // Fetch blog data when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleBlogUpdate = (updatedBlog) => {
    // Send PUT request to update the blog
    axios.put(`http://localhost:5000/api/blogs/${id}`, updatedBlog)
      .then((response) => {
        // After successful update, navigate to the homepage or blog list
        navigate(`/blog/${id}`);
      })
      .catch((error) => {
        console.error('Error updating the blog:', error);
      });
  };

  return (
    <div className="edit-blog-container">
      <h1>Edit Blog</h1>
      {blog ? (
        <BlogForm blog={blog} onSubmit={handleBlogUpdate} />
      ) : (
        <p>Loading blog...</p>
      )}
    </div>
  );
}

export default EditBlog;
