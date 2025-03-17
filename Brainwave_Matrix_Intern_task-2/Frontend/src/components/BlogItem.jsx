import React from 'react';
import { Link } from 'react-router-dom';

function BlogItem({ blog }) {
  return (
    <div className="blog-item">
      <h3 className="blog-title">{blog.title}</h3>
      <p className="blog-excerpt">{blog.content.substring(0, 100)}...</p>
      <Link to={`/blogs/${blog._id}`} className="read-more">Read More</Link>
    </div>
  );
}

export default BlogItem;
