// server.js
import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js'; // Import the database connection
import User from './models/User.js'; // Import your user model

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Login route
app.post('/login', async (req, res) => {
    const { usn } = req.body;

    // Ensure that the incoming usn is lowercase
    const lowerCaseUsn = usn.toLowerCase();

    try {
        // Check if user exists in the database
        const user = await User.findOne({ 'USN': lowerCaseUsn });

        if (user) {
            // User found, send success response
            res.status(200).send({ message: 'Login successful' });
        } else {
            // User not found, send error response
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        // Handle unexpected errors
        res.status(500).send({ message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
