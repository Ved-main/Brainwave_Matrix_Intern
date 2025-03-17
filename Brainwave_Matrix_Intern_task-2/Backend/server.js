const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.get("/",(req,res)=>{
    res.send("API is running...");
})
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
