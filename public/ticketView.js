const ticketDisplay = document.getElementById('ticketDisplay');
const ticketContainer = document.getElementById('sideTicketContainer');
const viewTicketSearch = document.querySelector('.viewTicketSearch');

const errCallback = err => console.log(err);
const ticketsCallback = ({ data : ticketArr }) => displaySideTickets(ticketArr);

const getTickets = () => axios.get('/api/sideBar').then(ticketsCallback).catch(errCallback);
const searchSideTickets = (searchValue, searchStatus) => axios.get(`/api/sideBar/search?value=${searchValue}&status=${searchStatus}`).then(ticketsCallback).catch(errCallback);



const displayTicket = () => {
    //retrieve most recently created ticket and populate fields with returned data
    axios.get('/api/ticket').then((response) => {
        let ticketObj = response.data
        console.log(ticketObj);
        const {ticket_id, firstname, lastname, email, phone, brand, model, color, size, due_date, description} = ticketObj;
        
        document.getElementById('viewTicketId').textContent = ticket_id
        document.getElementById('viewName').textContent = `${firstname} ${lastname}`
        document.getElementById('viewPhone').textContent = phone
        document.getElementById('viewEmail').textContent = email
        document.getElementById('viewBrand').textContent = brand
        document.getElementById('viewModel').textContent = model
        document.getElementById('viewColor').textContent = color
        document.getElementById('viewSize').textContent = size
        document.getElementById('viewDescription').value = description
        document.getElementById('viewDueDate').value = due_date
    })
}

getTickets();
displayTicket();

viewTicketSearch.addEventListener('submit', sideSearchHandler);