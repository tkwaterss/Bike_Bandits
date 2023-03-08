// const {
//     displayTickets
// } = require('./controller.js');

const main = document.querySelector('main');
const ticketSearch = document.querySelector('.ticketSearch');

const errCallback = err => console.log(err);
const ticketsCallback = ({ data : ticketArr }) => displayTickets(ticketArr);

const getTickets = () => axios.get('/api/home').then(ticketsCallback).catch(errCallback);
const searchTickets = (searchValue, searchStatus) => axios.get(`/api/home/search?value=${searchValue}&status=${searchStatus}`).then(ticketsCallback).catch(errCallback);

const displayTickets = (ticketArr) => {
    main.innerHTML = ''
    console.log(ticketArr);
    ticketArr.forEach(ticketObj => {
        let {firstname, lastname, phone, brand, model, due_date, price} = ticketObj;
        let newTicket = document.createElement('div')
        newTicket.classList.add('ticketDiv')
        newTicket.innerHTML = `
            <h4>${firstname} ${lastname}</h4>
            <ul class="ticketDiv">
                <li>${phone}</li>
                <li>${brand}</li>
                <li>${model}</li>
                <li>${due_date}</li>
                <li>$${price}.00</li>
            </ul>
            `
        main.appendChild(newTicket);
    })
}

const searchHandler = event => {
    event.preventDefault();
    let searchValue = document.getElementById('searchInput').value;
    let searchStatus = document.querySelector('select').value;

    searchValue = formatInput(searchValue)

    console.log(searchValue)
    searchTickets(searchValue, searchStatus)
    
    ticketSearch.reset();
}

const formatInput = string => {
    return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
}

getTickets();

ticketSearch.addEventListener('submit', searchHandler)