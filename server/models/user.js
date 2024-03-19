const mongoose = require("mongoose");

// Define a schema for the 'User' model
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        dp: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Create a model named 'User' using the userSchema
const User = mongoose.model("User", userSchema);

// Export the 'User' model to be used in other parts of the application
module.exports = User;
