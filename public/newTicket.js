const newTicket = document.getElementById('newTicket')

const errCallback = err => console.log(err);
const newTicketCallback = () => window.open('./ticketView.html', '_blank');

const addNewTicket = (ticketObj) => axios.post(`/api/ticket`, ticketObj).then(newTicketCallback).catch(errCallback)

newTicket.addEventListener('submit', newTicketHandler);
