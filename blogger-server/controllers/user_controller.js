const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Function to handle user signup
async function signUp(req, res) {
    try {
        const { email, password, name } = req.body;
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Email already exists" });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
        });
        const user = await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            user.toJSON(),
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            }
        );

        return res
            .status(201)
            .json({ message: "Sign Up Successful", token });
    } catch (error) {
        console.error("Error in signUp:", error);
        return res
            .status(500)
            .json({ message: "Internal server error" });
    }
}

// Function to handle user sign in
async function signIn(req, res) {
    try {
        const { email, password } = req.body;
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found" });
        }
        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (!passwordMatch) {
            return res
                .status(401)
                .json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            user.toJSON(),
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            }
        );

        return res
            .status(200)
            .json({ message: "SignIn successfully", token });
    } catch (error) {
        console.error("Error in signIn:", error);
        return res
            .status(500)
            .json({ message: "Internal server error" });
    }
}

// Function to handle user update
async function updateProfile(req, res) {
    try {
        const user = req.user;

        const { email, name, password } = req.body;

        user.name = name;
        user.email = email;
        user.password = password;

        await user.save();

        return res
            .status(200)
            .json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        return res
            .status(500)
            .json({ message: "Internal server error" });
    }
}

// Function to get user information
async function getUser(req, res) {
    try {
        const user = req.user;

        return res
            .status(200)
            .json({ name: user.name, email: user.email });
    } catch (error) {
        console.error("Error in getUser:", error);
        return res
            .status(500)
            .json({ message: "Internal server error" });
    }
}

module.exports = { signUp, signIn, updateProfile, getUser };
