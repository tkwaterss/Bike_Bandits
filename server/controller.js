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
            SELECT SUM(i.price) AS price, c.firstname, c.lastname, c.phone, b.brand, b.model, t.due_date, t.ticket_id, s.status
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
            GROUP BY t.ticket_id, c.firstname, c.lastname, c.phone, b.brand, b.model, s.status
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
        SELECT SUM(i.price) AS price, s.status, c.firstname, c.lastname, c.phone, b.brand, b.model, t.due_date, t.ticket_id
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
    },
    addNewTicket: (req, res) => {
        const {firstname, lastname, phone, email, brand, model, color, size, description, dueDate} = req.body;
        
        sequelize.query(`
        SELECT phone
        FROM clients
        WHERE phone = '${phone}';
        `).then(dbRes => {
            let match = dbRes[0][0]
            if(match.phone === phone) {
                sequelize.query(`
                    SELECT c.client_id, b.bike_id
                    FROM clients AS c
                    JOIN bikes AS b
                    ON c.client_id = b.client_id
                    WHERE c.phone = '${phone}';
                `).then(dbRes => {
                    const {client_id, bike_id} = dbRes[0][0];
                    sequelize.query(`
                        INSERT INTO tickets (client_id, bike_id, status_id, due_date, description)
                        VALUES (${client_id}, ${bike_id}, 1, '${dueDate}', '${description}');
                    `).then(res.status(200).send(req.body))
                })
            } else {
                console.log('phone does not exist')
                sequelize.query(`
                
                `)
            }
        })
        .catch(err => console.log(err))
    }
}