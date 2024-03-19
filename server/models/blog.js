const mongoose = require("mongoose");

// Define a schema for the 'Blog' model
const blogSchema = new mongoose.Schema(
    {
        writer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Create a model named 'Blog' using the blogSchema
const Blog = mongoose.model("Blog", blogSchema);

// Export the 'Blog' model to be used in other parts of the application
module.exports = Blog;
