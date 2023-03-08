// const main = document.querySelector('main');

// module.exports = {
//     displayTickets: (ticketArr) => {
//         console.log(ticketArr);
//         ticketArr.forEach(ticketObj => {
//             let {firstname, lastname, phone, brand, model, due_date, price} = ticketObj;
//             let newTicket = document.createElement('div')
//             newTicket.classList.add('ticketDiv')
//             newTicket.innerHTML = `
//                 <h4>${firstname} ${lastname}</h4>
//                 <ul class="ticketDiv">
//                     <li>${phone}</li>
//                     <li>${brand}</li>
//                     <li>${model}</li>
//                     <li>${due_date}</li>
//                     <li>$${price}.00</li>
//                 </ul>
//                 `
//             main.appendChild(newTicket);
//         })
//     }
// }
