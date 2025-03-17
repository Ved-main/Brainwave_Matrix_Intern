const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const protect = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name email'); // Populating author details if needed
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving blogs", error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name email');
        
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        
        res.json(blog); // Send back the blog details
    } catch (error) {
        // If there's an error, such as invalid ID format
        res.status(500).json({ message: "Error retrieving blog", error: error.message });
    }
});

router.post("/", protect, async (req, res) => {
    const { title, content, category } = req.body;

    const blog = new Blog({
        title,
        content,
        category,
        author: req.user._id
    });

    await blog.save();
    res.json(blog);
});

router.put("/:id", protect, async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
  
      // Check if the blog exists
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      // Check if the current user is the author of the blog
      if (blog.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }
  
      // Update blog fields
      blog.title = req.body.title || blog.title;
      blog.content = req.body.content || blog.content;
      blog.category = req.body.category || blog.category;
  
      // Save the updated blog
      await blog.save();
      res.json(blog); // Send the updated blog back as response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating the blog", error: error.message });
    }
  });

router.delete("/:id", protect, async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
    }

    // Use findByIdAndDelete to remove the document
    await Blog.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Blog deleted" });
});


router.post("/:id/comment", protect, async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    const { content } = req.body;

    blog.comments.push({ user: req.user._id, content });
    await blog.save();
    res.json(blog);
});

module.exports = router;
