const Blog = require("../models/blog");

// Function to add a new blog
async function addBlog(req, res) {
    try {
        const { title, content } = req.body;
        const writer = req.user._id;
        const newBlog = new Blog({ writer, title, content });
        await newBlog.save();
        return res.status(201).json({
            message: "Blog added successfully",
            blog: newBlog,
        });
    } catch (error) {
        console.error("Error in addBlog:", error);
        return res
            .status(500)
            .json({ message: "Internal server error" });
    }
}

// Function to edit an existing blog
async function editBlog(req, res) {
    try {
        const { title, content } = req.body;
        const blogId = req.query.blogId;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res
                .status(404)
                .json({ message: "Blog not found" });
        }
        if (String(blog.writer) !== String(req.user._id)) {
            return res.status(403).json({
                message: "You are not authorized to edit this blog",
            });
        }
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { title, content },
            { new: true }
        );
        return res.status(200).json({
            message: "Blog updated successfully",
            blog: updatedBlog,
        });
    } catch (error) {
        console.error("Error in editBlog:", error);
        return res
            .status(500)
            .json({ message: "Internal server error" });
    }
}

// Function to delete an existing blog
async function deleteBlog(req, res) {
    try {
        const blogId = req.query.blogId;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res
                .status(404)
                .json({ message: "Blog not found" });
        }
        if (String(blog.writer) !== String(req.user._id)) {
            return res.status(403).json({
                message: "You are not authorized to delete this blog",
            });
        }
        await Blog.findByIdAndDelete(blogId);
        return res
            .status(200)
            .json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error in deleteBlog:", error);
        return res
            .status(500)
            .json({ message: "Internal server error" });
    }
}

// Function to get details of a single blog
async function getBlog(req, res) {
    try {
        const blogId = req.query.blogId;
        const blog = await Blog.findById(blogId).populate(
            "writer",
            "name email"
        );
        if (!blog) {
            return res
                .status(404)
                .json({ message: "Blog not found" });
        }
        return res.status(200).json({ blog });
    } catch (error) {
        console.error("Error in getBlog:", error);
        return res
            .status(500)
            .json({ message: "Internal server error" });
    }
}

// Function to get blogs with pagination
async function getAllBlogs(req, res) {
    try {
        const page = parseInt(req.query.page) || 1; // Parse the page number from query parameters, default to 1
        const limit = parseInt(req.query.limit) || 20; // Parse the limit from query parameters, default to 20
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const blogs = await Blog.find()
            .populate("writer", "name email")
            .skip(skip) // Skip documents based on the calculated skip value
            .limit(limit); // Limit the number of documents returned

        return res.status(200).json({ blogs });
    } catch (error) {
        console.error("Error in getAllBlogs:", error);
        return res
            .status(500)
            .json({ message: "Internal server error" });
    }
}

module.exports = {
    addBlog,
    editBlog,
    deleteBlog,
    getBlog,
    getAllBlogs,
};
