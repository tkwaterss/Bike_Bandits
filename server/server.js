require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const {SERVER_PORT} = process.env;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'))

const {
    //controller function names
} = require('./controller')

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/home.html'))
})


app.listen(SERVER_PORT, () => console.log(`App running on ${SERVER_PORT}`))