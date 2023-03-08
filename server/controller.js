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
            SELECT SUM(i.price) AS price, c.firstname, c.lastname, c.phone, b.brand, b.model, t.due_date
            FROM tickets AS t
                JOIN tickets_items AS ti
                ON t.ticket_id = ti.ticket_id
                JOIN items AS i
                ON ti.item_id = i.item_id
                JOIN clients AS c
                ON t.client_id = c.client_id
                JOIN bikes AS b
                ON c.client_id = b.client_id
            GROUP BY t.ticket_id, c.firstname, c.lastname, c.phone, b.brand, b.model
            LIMIT 10;
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    searchTickets: (req, res) => {
        let {value, status} = req.query;
        let queryStatus = `AND s.status LIKE '%${status}%'`
        if(status = 'All Tickets') {
            queryStatus = ''
        }
        sequelize.query(`
        SELECT SUM(i.price) AS price, s.status, c.firstname, c.lastname, c.phone, b.brand, b.model, t.due_date
        FROM tickets AS t
            JOIN tickets_items AS ti
            ON t.ticket_id = ti.ticket_id
            JOIN items AS i
            ON ti.item_id = i.item_id
            JOIN clients AS c
            ON t.client_id = c.client_id
            JOIN bikes AS b
            ON c.client_id = b.client_id
            JOIN statuses AS s
            ON t.status_id = s.status_id
        WHERE c.firstname LIKE '%${value}%' ${queryStatus}
        GROUP BY t.ticket_id, c.firstname, c.lastname, c.phone, b.brand, b.model, s.status
        LIMIT 10;
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }
}