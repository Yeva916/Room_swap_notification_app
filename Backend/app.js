const express = require('express');
const db = require('./db');
const login = require('./routes/login');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())
app.use("/",login);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});