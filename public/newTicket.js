const errCallback = err => console.log(err);
const newTicketCallback = (response) => console.log(response.data, 'ticket submitted')

const addNewTicket = (ticketObj) => axios.post(`/api/ticket`, ticketObj).then(newTicketCallback).catch(errCallback)

newTicket.addEventListener('submit', newTicketHandler);