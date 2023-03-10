require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {SERVER_PORT} = process.env;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'))

const {
    loadPage,
    getTickets,
    searchTickets,
    addNewTicket,
    getRecentTicket,
    getSideTickets,
    getTicketById,
    getTicketItems,
    deleteTicketItem
} = require('./controller');

app.get('/', loadPage)
app.get('/api/home', getTickets)
app.get('/api/home/search', searchTickets)
app.post('/api/ticket', addNewTicket)
app.get('/api/ticket', getRecentTicket)
app.get('/api/sideBar', getSideTickets)
app.get('/api/sideBar/search', searchTickets)
app.get('/api/ticket/byId', getTicketById)
app.get('/api/items/byId', getTicketItems)
app.delete('/api/items/byId', deleteTicketItem)

app.listen(SERVER_PORT, () => console.log(`App running on ${SERVER_PORT}`))