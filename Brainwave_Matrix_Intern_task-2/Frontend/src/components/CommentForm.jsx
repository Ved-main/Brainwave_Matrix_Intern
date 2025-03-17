import React, { useState } from 'react';
import axios from 'axios';

function CommentForm({ blogId }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Check if the user is logged in
    if (!token) {
      alert('Please Login To Comment');
      return;
    }

    axios.post(`http://localhost:5000/api/blogs/${blogId}/comment`, { content }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        alert('Comment Added');
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
}

export default CommentForm;
