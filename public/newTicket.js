const errCallback = err => console.log(err);
const newTicketCallback = ({ data : ticketObj }) => displayTicket(ticketObj);

const addNewTicket = (ticketObj) => axios.post(`/api/ticket`, ticketObj).then(newTicketCallback).catch(errCallback)

newTicket.addEventListener('submit', newTicketHandler);