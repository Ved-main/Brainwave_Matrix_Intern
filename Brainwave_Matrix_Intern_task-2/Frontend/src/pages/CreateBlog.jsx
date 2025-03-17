import React from 'react';
import BlogForm from './../components/BlogForm';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
  const navigate = useNavigate();

  const handleBlogSubmit = (newBlog) => {
    // After blog is created, navigate to the homepage or blog list
    navigate('/');
  };

  return (
    <div className="create-blog-container">
      <h1>Create a New Blog</h1>
      <BlogForm onSubmit={handleBlogSubmit} />
    </div>
  );
}

export default CreateBlog;
