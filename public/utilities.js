const formatInput = string => {
    return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
}

const displayTickets = (ticketArr) => {
    main.innerHTML = ''
    console.log(ticketArr);
    ticketArr.forEach(ticketObj => {
        const {firstname, lastname, phone, brand, model, due_date, price, ticket_id, status} = ticketObj;
        let newTicket = document.createElement('div')
        newTicket.classList.add('ticketDiv')
        newTicket.classList.add('ticketContainer')
        let newButton = document.createElement('button')
        let newName = document.createElement('h4')
        newButton.textContent = ticket_id
        newName.textContent = `${firstname} ${lastname}`
        // newButton.addEventListener('click', homeClickHandler)
        newTicket.appendChild(newButton)
        newTicket.appendChild(newName)

        let newList = document.createElement('ul')
        newList.classList.add('ticketDiv')
        newList.innerHTML = `
            <li>${phone}</li>
            <li>${brand}</li>
            <li>${model}</li>
            <li>${due_date}</li>
            <li>${status}</li>
            <li>$${price}.00</li>
        `
        newTicket.appendChild(newList)
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

const displayTicket = (ticketObj) => {
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

        //need to add ability to display ticket items
}

const displaySideTickets = (ticketArr) => {
    ticketContainer.innerHTML = ''
    console.log(ticketArr);
    ticketArr.forEach(ticketObj => {
        let {firstname, lastname, phone, due_date, ticket_id, status} = ticketObj;
        let newTicket = document.createElement('div')
        newTicket.classList.add('viewTicketContainer')
       
        let newButton = document.createElement('button')
        newButton.textContent = ticket_id
        newButton.addEventListener('click', sideClickHandler)
        newTicket.appendChild(newButton)
        let spanContainer = document.createElement('div')
        spanContainer.innerHTML = `
            <span class="left">Customer Name:</span><span class="right">${firstname} ${lastname}</span><br>
            <span class="left">Phone:</span><span class="right">${phone}</span><br>
            <span class="left">Due Date:</span><span class="right">${due_date}</span><br>
            <span class="left">Status</span><span class="right">${status}</span>
        `
        newTicket.appendChild(spanContainer)
        ticketContainer.appendChild(newTicket);
    })
}

const sideSearchHandler = event => {
    event.preventDefault();
    let searchValue = document.getElementById('viewSearchInput').value;
    let searchStatus = document.getElementById('sideStatus').value;

    searchValue = formatInput(searchValue)

    console.log(searchValue)
    searchSideTickets(searchValue, searchStatus)
    
    viewTicketSearch.reset();
}

const sideClickHandler = event => {
    let ticketId = +(event.target.textContent);
    getSelectedTicket(ticketId);

    //send the ticket id to the server to grab other info
    //server grabs related ticket info and sends back
    //send that info into the displayTicket function
}