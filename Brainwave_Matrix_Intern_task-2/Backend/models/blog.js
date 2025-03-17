const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ["Educational", "Fashion", "Medical", "Sports", "Entertainment"], required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            content: { type: String },
        }
    ]
});

module.exports = mongoose.model("Blog", blogSchema);
