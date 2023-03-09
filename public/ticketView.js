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

// const homeClickHandler = event => {
//     //target the div, grab the ticket id
//     //send the ticket id to the server to grab other info
//     //server grabs related ticket info and sends back
//     //send that info into the displayTicket function
// }

displayTicket();
