const main = document.querySelector('main');
const ticketSearch = document.querySelector('.ticketSearch');
// const homeTicketBtn = document.querySelector('#homeTicketId')
// const ticketContainer = document.querySelector('.ticketContainer')

const errCallback = err => console.log(err);
const ticketsCallback = ({ data : ticketArr }) => displayTickets(ticketArr);

const getTickets = () => axios.get('/api/home').then(ticketsCallback).catch(errCallback);
const searchTickets = (searchValue, searchStatus) => axios.get(`/api/home/search?value=${searchValue}&status=${searchStatus}`).then(ticketsCallback).catch(errCallback);

getTickets();

ticketSearch.addEventListener('submit', searchHandler);
// homeTicketBtn.addEventListener('click', homeClickHandler);