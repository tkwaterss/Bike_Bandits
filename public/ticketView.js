const ticketDisplay = document.getElementById('ticketDisplay');
const ticketContainer = document.getElementById('sideTicketContainer');
const viewTicketSearch = document.querySelector('.viewTicketSearch');
const itemsContainer = document.getElementById('itemsContainer');
const ticketItemsForm = document.getElementById('ticketItemsForm');
const searchItemsContainer = document.getElementById('searchItemsContainer');

const toggleDeleteBtn = document.querySelector('#ticketDeleteBtn');
const nevermindBtn = document.querySelector('#nevermindBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const editTicketBtn = document.getElementById('editTicketBtn');

const createItemBtn = document.getElementById('showAddItem');
const cancelAddItemBtn = document.getElementById('cancelAddItem');

const errCallback = err => console.log(err);
const ticketsCallback = ({ data : ticketArr }) => displaySideTickets(ticketArr);
const mainTicketCallback = ({ data : ticketArr }) => displayTicket(ticketArr);
const itemsCallback = ({data : itemsArray }) => displayItems(itemsArray);
const searchItemsCallback = ({ data : itemsArray }) => displaySearchItems(itemsArray);
const editTicketCallback = ({ data : ticketObj }) => displayEditTicket(ticketObj);

const getTickets = () => axios.get('/api/sideBar').then(ticketsCallback).catch(errCallback);
const searchSideTickets = (searchValue, searchStatus) => axios.get(`/api/sideBar/search?value=${searchValue}&status=${searchStatus}`).then(ticketsCallback).catch(errCallback);
const getLastTicket = () => axios.get('/api/ticket').then(mainTicketCallback).catch(errCallback)
const getSelectedTicket = (ticketId) => axios.get(`/api/ticket/byId?ticketId=${ticketId}`).then(mainTicketCallback).catch(errCallback)
const getTicketItems = (ticketId) => axios.get(`/api/items/byId?ticketId=${ticketId}`).then(itemsCallback).catch(errCallback);
const deleteTicketItem = (targetId, ticketId) => axios.delete(`/api/items/byId?targetId=${targetId}&ticketId=${ticketId}`).then(itemsCallback).catch(errCallback);
const updateTicket = (updateObj) => axios.put(`/api/ticket`, updateObj).then(mainTicketCallback).catch(errCallback);
const searchItems = (searchInput) => axios.get(`/api/items?searchWord=${searchInput}`).then(searchItemsCallback).catch(errCallback);
const addNewItem = (newItemObj) => axios.post(`/api/items`, newItemObj).then(itemsCallback).catch(errCallback);
const addTicketItem = (targetId, ticketId) => axios.post(`/api/items/byId?targetId=${targetId}&ticketId=${ticketId}`).then(itemsCallback).catch(errCallback);
const deleteTicket = (targetId) => axios.delete(`/api/ticket?targetId=${targetId}`).then(mainTicketCallback).catch(errCallback);
const editTicket = (ticketObj, targetId) => axios.put(`/api/ticket/edit?targetId=${targetId}`, ticketObj).then(editTicketCallback).catch(errCallback);

getTickets();
getLastTicket();

viewTicketSearch.addEventListener('submit', sideSearchHandler);
ticketItemsForm.addEventListener('submit', ticketItemsFormHandler);
confirmDeleteBtn.addEventListener('click', ticketDeleteHandler);
editTicketBtn.addEventListener('click', editTicketHandler);
toggleDeleteBtn.addEventListener('click', toggleDelete);
nevermindBtn.addEventListener('click', toggleDelete);
createItemBtn.addEventListener('click', toggleAddItem);
cancelAddItemBtn.addEventListener('click', toggleAddItem);
