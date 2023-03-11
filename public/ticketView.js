const ticketDisplay = document.getElementById('ticketDisplay');
const ticketContainer = document.getElementById('sideTicketContainer');
const viewTicketSearch = document.querySelector('.viewTicketSearch');
const itemsContainer = document.getElementById('itemsContainer');
const ticketItemsForm = document.getElementById('ticketItemsForm');

const errCallback = err => console.log(err);
const ticketsCallback = ({ data : ticketArr }) => displaySideTickets(ticketArr);
const mainTicketCallback = ({ data : ticketObj }) => displayTicket(ticketObj);
const itemsCallback = ({data : itemsArray }) => displayItems(itemsArray);

const searchItemsCallback = ({ data : itemsArray }) => displaySearchItems(itemsArray);

const getTickets = () => axios.get('/api/sideBar').then(ticketsCallback).catch(errCallback);
const searchSideTickets = (searchValue, searchStatus) => axios.get(`/api/sideBar/search?value=${searchValue}&status=${searchStatus}`).then(ticketsCallback).catch(errCallback);
const getLastTicket = () => axios.get('/api/ticket').then(mainTicketCallback).catch(errCallback)
const getSelectedTicket = (ticketId) => axios.get(`/api/ticket/byId?ticketId=${ticketId}`).then(mainTicketCallback).catch(errCallback)
const getTicketItems = (ticketId) => axios.get(`/api/items/byId?ticketId=${ticketId}`).then(itemsCallback).catch(errCallback);
const deleteTicketItem = (targetId, ticketId) => axios.delete(`/api/items/byId?targetId=${targetId}&ticketId=${ticketId}`).then(itemsCallback).catch(errCallback);

const updateTicket = (updateObj) => axios.put(`/api/ticket`, updateObj).then(mainTicketCallback).catch(errCallback);
const searchItems = (searchInput) => axios.get(`/api/items?searchWord=${searchInput}`).then(searchItemsCallback).catch(errCallback);
const addNewItem = (newItemObj) => axios.post(`/api/items`, newItemObj).then(itemsCallback).catch(errCallback);

getTickets();
getLastTicket();

viewTicketSearch.addEventListener('submit', sideSearchHandler);
ticketItemsForm.addEventListener('submit', ticketItemsFormHandler);