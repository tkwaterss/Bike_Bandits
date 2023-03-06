require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const {SERVER_PORT} = process.env;
const {CONNECTION_STRING} = process.env
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'))

const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/home.html'))
})

app.listen(SERVER_PORT, () => console.log(`App running on ${SERVER_PORT}`))