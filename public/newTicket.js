const errCallback = err => console.log(err);
//upon successful post, opens the viewWindow page
//window.location() for redirect
const newTicketCallback = () => window.open('./ticketView.html', '_blank');

//sends input ticket data to server to be added to DB, gets returned a status of 200
const addNewTicket = (ticketObj) => axios.post(`/api/ticket`, ticketObj).then(newTicketCallback).catch(errCallback)

newTicket.addEventListener('submit', newTicketHandler);
