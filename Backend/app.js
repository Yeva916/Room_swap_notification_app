const express = require('express');
const db = require('./db');
const login = require('./routes/login');
const home = require('./routes/home');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(cors({
     origin: 'http://localhost:3000',
}))

app.use(bodyParser.json())
app.use("/",login);
app.use("/",home);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});