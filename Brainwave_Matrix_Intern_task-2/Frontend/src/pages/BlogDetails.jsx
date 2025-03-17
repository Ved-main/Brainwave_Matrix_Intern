import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentForm from '../components/CommentForm';

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="blog-details-container">
      {blog && (
        <>
          <h1>{blog.title}</h1>
          <p>{blog.content}</p>
          <div className="comments-section">
            <h2>Comments</h2>
            {blog.comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p><strong>{comment.user.username}</strong>{comment.content}</p>
              </div>
            ))}
            <CommentForm blogId={blog._id} />
          </div>
        </>
      )}
    </div>
  );
}

export default BlogDetails;
