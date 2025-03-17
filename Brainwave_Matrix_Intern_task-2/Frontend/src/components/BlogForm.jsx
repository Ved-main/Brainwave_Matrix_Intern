import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles

function BlogForm({ blog, onSubmit }) {
  const [title, setTitle] = useState(blog ? blog.title : '');
  const [content, setContent] = useState(blog ? blog.content : '');
  const [category, setCategory] = useState(blog ? blog.category : 'Educational');

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const blogData = { title, content, category };

    if (!token) {
      toast.error('Please log in to create or update a blog');
      return;
    }

    if (blog) {
      // Edit existing blog
      axios.put(`http://localhost:5000/api/blogs/${blog._id}`, blogData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          toast.success('Blog updated successfully!');
          onSubmit(response.data); // Callback for when the blog is updated
          window.location.reload(); // Reload the page to reflect the update
        })
        .catch((error) => {
          toast.error('Error updating blog!');
          console.error(error);
        });
    } else {
      // Create new blog
      axios.post('http://localhost:5000/api/blogs', blogData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          toast.success('Blog created successfully!');
          onSubmit(response.data); // Callback for when the blog is created
          window.location.reload(); // Reload the page to reflect the new blog
        })
        .catch((error) => {
          toast.error('Error creating blog!');
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>{blog ? 'Edit Blog' : 'Create Blog'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Educational">Educational</option>
            <option value="Fashion">Fashion</option>
            <option value="Medical">Medical</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <button type="submit">{blog ? 'Update Blog' : 'Create Blog'}</button>
        </form>
      </div>

      {/* Toast Container to show toasts */}
      <ToastContainer />
    </>
  );
}

export default BlogForm;
