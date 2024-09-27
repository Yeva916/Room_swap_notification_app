const express = require('express');
const db = require('./db'); // Database module
const login = require('./routes/login');
const home = require('./routes/home');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(bodyParser.json());

// Connect to the database before starting the server
db.connectDB()
    .then(() => {
        // Use routes only after successful connection
        app.use("/", login);
        app.use("/", home);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
        process.exit(1); // Exit the process if DB connection fails
    });
