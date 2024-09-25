const express = require('express');
const db = require('./db');
const app = express();


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});