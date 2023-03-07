require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const path = require('path');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })

module.exports = {
    loadPage: (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../public/home.html'))
    },

    getTickets: (req, res) => {
        sequelize.query(`
            SELECT firstname, lastname, email, phone
            FROM clients;
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }
}