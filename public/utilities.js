const main = document.querySelector('main');
const ticketSearch = document.querySelector('.ticketSearch');
const newTicket = document.getElementById('newTicket')

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