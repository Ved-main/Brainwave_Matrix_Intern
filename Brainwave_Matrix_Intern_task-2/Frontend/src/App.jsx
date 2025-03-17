import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import BlogDetails from './pages/BlogDetails';
import Login from './pages/Login';
import SignUp from './pages/SignUp';  // Import SignUp component
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-container">
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
