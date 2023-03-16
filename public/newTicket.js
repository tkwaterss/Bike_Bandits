const newTicket = document.getElementById('newTicket')

const errCallback = err => console.log(err);
const newTicketCallback = () => window.location.replace('./ticketView.html');

const addNewTicket = (ticketObj) => axios.post(`/api/ticket`, ticketObj).then(newTicketCallback).catch(errCallback)

newTicket.addEventListener('submit', newTicketHandler);
