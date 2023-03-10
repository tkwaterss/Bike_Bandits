const ticketDisplay = document.getElementById('ticketDisplay');
const ticketContainer = document.getElementById('sideTicketContainer');
const viewTicketSearch = document.querySelector('.viewTicketSearch');

const errCallback = err => console.log(err);
const ticketsCallback = ({ data : ticketArr }) => displaySideTickets(ticketArr);
const mainTicketCallback = ({ data : ticketObj }) => displayTicket(ticketObj);

const getTickets = () => axios.get('/api/sideBar').then(ticketsCallback).catch(errCallback);
const searchSideTickets = (searchValue, searchStatus) => axios.get(`/api/sideBar/search?value=${searchValue}&status=${searchStatus}`).then(ticketsCallback).catch(errCallback);
const getLastTicket = () => axios.get('/api/ticket').then(mainTicketCallback).catch(errCallback)
const getSelectedTicket = (ticketId) => axios.get(`/api/ticket/byId?ticketId=${ticketId}`).then(mainTicketCallback).catch(errCallback)

getTickets();
getLastTicket();

viewTicketSearch.addEventListener('submit', sideSearchHandler);