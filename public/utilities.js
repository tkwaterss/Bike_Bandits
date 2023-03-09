const main = document.querySelector('main');
const ticketSearch = document.querySelector('.ticketSearch');
const newTicket = document.getElementById('newTicket')
const ticketContainer = document.getElementsByClassName('ticketContainer')

const formatInput = string => {
    return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
}

const displayTickets = (ticketArr) => {
    main.innerHTML = ''
    console.log(ticketArr);
    ticketArr.forEach(ticketObj => {
        let {firstname, lastname, phone, brand, model, due_date, price, ticket_id, status} = ticketObj;
        let newTicket = document.createElement('div')
        newTicket.classList.add('ticketDiv')
        newTicket.classList.add('ticketContainer')
        //add an onclick() and hover() to the div for directing to the full ticket page
        newTicket.innerHTML = `
            <h4>${ticket_id}</h4>
            <h4>${firstname} ${lastname}</h4>
            <ul class="ticketDiv">
                <li>${phone}</li>
                <li>${brand}</li>
                <li>${model}</li>
                <li>${due_date}</li>
                <li>${status}</li>
                <li>$${price}.00</li>
            </ul>
            `
        main.appendChild(newTicket);
    })
}

const searchHandler = event => {
    event.preventDefault();
    let searchValue = document.getElementById('searchInput').value;
    let searchStatus = document.querySelector('select').value;

    searchValue = formatInput(searchValue)

    console.log(searchValue)
    searchTickets(searchValue, searchStatus)
    
    ticketSearch.reset();
}

const newTicketHandler = event => {
    event.preventDefault();

    let newTicketData = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        brand: document.getElementById('brand').value,
        model: document.getElementById('model').value,
        color: document.getElementById('color').value,
        size: document.getElementById('size').value,
        description: document.getElementById('description').value,
        dueDate: document.getElementById('dueDate').value
    }

    newTicketData.firstname = formatInput(newTicketData.firstname);
    newTicketData.lastname = formatInput(newTicketData.lastname);
    newTicketData.brand = formatInput(newTicketData.brand);
    newTicketData.model = formatInput(newTicketData.model);
    newTicketData.color = formatInput(newTicketData.color);
    newTicketData.size = formatInput(newTicketData.size);

    addNewTicket(newTicketData);

    newTicket.reset();
}
//we are going to grab the dbRes and destructure it
//take that data an populate the view Ticket page
// const displayTicket = ticketObj => {
//     //window.location() for redirect
//     window.open('./ticketView.html', '_blank')
//     console.log(ticketObj);
//     const {ticket_id, firstname, lastname, email, phone, brand, model, color, size, dueDate, description} = ticketObj;
//     //first need to redirect to view Ticket page
//     //then immediately populate fields

//     document.getElementById('viewTicketId').textContent = ticket_id
//     document.getElementById('viewName').textContent = `${firstname} ${lastname}`
//     document.getElementById('viewPhone').textConent = phone
//     document.getElementById('viewEmail').textConent = email
//     document.getElementById('viewBrand').textConent = brand
//     document.getElementById('viewModel').textConent = model
//     document.getElementById('viewColor').textConent = color
//     document.getElementById('viewSize').textConent = size
//     document.getElementById('viewDescription').value = description
//     document.getElementById('viewDueDate').value = dueDate
    
//     //pull in all the elements
//     //asign text conent of each text element to be correct info
// }

// const homeClickHandler = event => {
//     //target the div, grab the ticket id
//     //send the ticket id to the server to grab other info
//     //server grabs related ticket info and sends back
//     //send that info into the displayTicket function
// }