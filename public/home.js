// const {

// } = require('./controller.js');

const main = document.querySelector('main');

const errCallback = err => console.log(err);
const ticketsCallback = ({ data : ticketArr }) => displayTickets(ticketArr);


const getTickets = () => axios.get('/api/home').then(ticketsCallback).catch(errCallback);


const displayTickets = ticketArr => {
    console.log(ticketArr);
    ticketArr.forEach(ticketObj => {
        let newTicket = document.createElement('div')
        newTicket.innerHTML = `
            <h4>${ticketObj.firstname} ${ticketObj.lastname}</h4>
            <ul>
                <li>${ticketObj.phone}</li>
                <li>${ticketObj.email}</li>
            </ul>
            `
        main.appendChild(newTicket);
    })
    
}

getTickets();