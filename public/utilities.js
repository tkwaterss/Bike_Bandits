const formatInput = string => {
    let stringArr = string.split(' ')
    let newStr = stringArr.map(word => {
        return word.toLowerCase().charAt(0).toUpperCase() + word.slice(1);
    })
    return newStr.join(' ')
 }
const formatItems = string => {
    return string.toUpperCase()
}

const formatDescription = string => {
    return string.replaceAll("'", "''");
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
        description: document.getElementById('viewDescription').value,
        dueDate: document.getElementById('viewDueDate').value
    }

    newTicketData.description = formatDescription(newTicketData.description);
    newTicketData.firstname = formatInput(newTicketData.firstname);
    newTicketData.lastname = formatInput(newTicketData.lastname);
    newTicketData.brand = formatInput(newTicketData.brand);
    newTicketData.model = formatInput(newTicketData.model);
    newTicketData.color = formatInput(newTicketData.color);
    newTicketData.size = formatInput(newTicketData.size);

    addNewTicket(newTicketData);

    newTicket.reset();
}

const displayTicket = (ticketArr) => {
        let {ticket_id, firstname, lastname, email, phone, brand, model, color, size, due_date, description} = ticketArr[0];
        let {total_price} = ticketArr[1];

        if(total_price) {
            document.getElementById('viewPrice').textContent = `$ ${total_price}.00`
        } else {
            document.getElementById('viewPrice').textContent = `$ 0.00`
        }
        
        due_date = due_date.slice(0,10)

        document.getElementById('viewTicketId').textContent = `${ticket_id}`
        document.getElementById('headerDueDate').textContent = `${due_date}`
        document.getElementById('viewName').textContent = `${firstname} ${lastname}`
        document.getElementById('viewPhone').textContent = phone
        document.getElementById('viewEmail').textContent = email
        document.getElementById('viewBrand').textContent = brand
        document.getElementById('viewModel').textContent = model
        document.getElementById('viewColor').textContent = color
        document.getElementById('viewSize').textContent = size
        document.getElementById('viewDescription').value = description
        document.getElementById('viewDueDate').value = due_date

        getTicketItems(ticket_id);
        getTickets();
}

const displaySideTickets = (ticketArr) => {
    ticketContainer.innerHTML = ''
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
            <span class="left">Status:</span><span class="right">${status}</span>
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

    searchSideTickets(searchValue, searchStatus)
    
    viewTicketSearch.reset();
}

const sideClickHandler = event => {
    let ticketId = +(event.target.textContent);
    getSelectedTicket(ticketId);
    getTicketItems(ticketId);
}

const displayItems = itemsArray => {
    itemsContainer.innerHTML = '';
    itemsArray.forEach(itemObj => {
        const {ticket_item_id, item_id, title, price} = itemObj
        let newItem = document.createElement('div');
        newItem.classList.add('itemDiv')
        newItem.classList.add('itemContainer')

        let deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'X'
        deleteBtn.setAttribute('id',`${ticket_item_id}`)
        deleteBtn.classList.add('itemBtn')
        deleteBtn.addEventListener('click', deleteItemHandler)

        newItem.innerHTML = `
        <div class="itemInfoDiv">
            <p>${title}</p>
            <h4>$${price}.00</h4>
        </div>
        `
        newItem.appendChild(deleteBtn)
        itemsContainer.appendChild(newItem);
    })
}

const deleteItemHandler = event => {
    let targetId = +(event.target.id)
    let ticketId = +(document.getElementById('viewTicketId').textContent)
    deleteTicketItem(targetId, ticketId);
}

const ticketItemsFormHandler = event => {
    event.preventDefault();
    let description = formatDescription(document.getElementById('viewDescription').value);
    let dueDate = document.getElementById('viewDueDate').value;
    let searchInput = formatItems(document.getElementById('searchInput').value);
    let newItemInput = formatItems(document.getElementById('newItemInput').value);
    let newItemPrice = +(document.getElementById('newItemPrice').value);
    let ticketId = +(document.getElementById('viewTicketId').textContent)

    if (searchInput) {
        let ticketData = {
            ticketId: ticketId,
            description: description,
            dueDate: dueDate
        }
        updateTicket(ticketData)
        searchItems(searchInput)
    } else if (newItemInput && newItemPrice) {
        let ticketData = {
            ticketId: ticketId,
            description: description,
            dueDate: dueDate
        }
        let newItemData = {
            ticketId: ticketId,
            newItemInput: newItemInput,
            newItemPrice: newItemPrice
        }
        updateTicket(ticketData)
        addNewItem(newItemData)
    } else if (newItemInput || newItemPrice) {
        alert('please enter a title and price')
    } else {
            let data = {
            ticketId: ticketId,
            description: description,
            dueDate: dueDate
        }
        updateTicket(data)
    }
    ticketItemsForm.reset();
}

const displaySearchItems = itemsArray => {
    searchItemsContainer.innerHTML = '';
    let searchDivider = document.getElementById('searchDivider');
    searchDivider.classList.remove('hide');
    itemsArray.forEach(itemObj => {
        const {item_id, title, price} = itemObj
        let newItem = document.createElement('div');
        newItem.classList.add('itemDiv')
        newItem.classList.add('itemContainer')

        let addBtn = document.createElement('button')
        addBtn.textContent = 'Add To Ticket'
        addBtn.setAttribute('id',`${item_id}`)
        addBtn.classList.add('itemBtn')
        addBtn.addEventListener('click', addItemHandler)

        newItem.innerHTML = `
        <div class="itemInfoDiv">
            <p>${title}</p>
            <h4>$${price}.00</h4>
        </div>
        `
        newItem.appendChild(addBtn)
        searchItemsContainer.appendChild(newItem);
    })
}

const addItemHandler = event => {
    let targetId = +(event.target.id)
    let ticketId = +(document.getElementById('viewTicketId').textContent)
    let searchDivider = document.getElementById('searchDivider');
    searchDivider.classList.add('hide');

    addTicketItem(targetId, ticketId)
    searchItemsContainer.innerHTML = ''
}

const ticketDeleteHandler = event => {
    let targetId = +(document.getElementById('viewTicketId').textContent);
    toggleDelete(event)

    deleteTicket(targetId);
}

const editTicketHandler = event => {
    let targetId = +(document.getElementById('viewTicketId').textContent);
    let ticketInfo = document.getElementById('newTicket');

    const name = document.getElementById('viewName').textContent
    const firstname = name.split(' ')[0]
    const lastname = name.split(' ')[1]

    const phone = document.getElementById('viewPhone').textContent
    const email = document.getElementById('viewEmail').textContent
    const brand = document.getElementById('viewBrand').textContent
    const model = document.getElementById('viewModel').textContent
    const color = document.getElementById('viewColor').textContent
    const size = document.getElementById('viewSize').textContent

    let editForm = document.createElement('form')
    editForm.setAttribute('id', 'editTicket')

    editForm.innerHTML = `
        <section class="newTicketForm ticketInputs" id="clientForm">
            <h3>Client Information</h3>
            <label for="firstname">First Name:</label>
            <input value="${firstname}" type="text" id="firstname" name="firstname" placeholder="Billy" required>
            <label for="lastname">Last Name:</label>
            <input value="${lastname}" type="text" id="lastname" name="lastname" placeholder="Bobby" required>
            <label for="phone">Phone Number:</label>
            <input value="${phone}" type="tel" id="phone" name="phone" placeholder="801-123-1234" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required>
            <label for="email">Your Email:</label>
            <input value="${email}" type="email" id="email" name="email" placeholder="youremail@email.com" required>
        </section>
        <section class="newTicketForm ticketInputs" id="bikeForm">
            <h3>Bike Information</h3>
            <label for="brand">Brand:</label>
            <input value="${brand}" type="text" id="brand" name="brand" placeholder="Giant" required>
            <label for="model">Model:</label>
            <input value="${model}" type="text" id="model" name="model" placeholder="Trance" required>
            <label for="color">Color:</label>
            <input value="${color}" type="text" id="color" name="color" placeholder="Blue" required>
            <label for="size">Size:</label>
            <input value="${size}" type="text" id="size" name="size" placeholder="Large" required>
        </section>
        <input type="submit" id="newTicketSubmit" class="submit">
    `
    editForm.addEventListener('submit', editTicketFormHandler)
    ticketInfo.innerHTML = ''
    ticketInfo.appendChild(editForm)
}

const editTicketFormHandler = event => {
    event.preventDefault();
    let targetId = +(document.getElementById('viewTicketId').textContent);

    let newTicketData = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        brand: document.getElementById('brand').value,
        model: document.getElementById('model').value,
        color: document.getElementById('color').value,
        size: document.getElementById('size').value,
    }

    newTicketData.firstname = formatInput(newTicketData.firstname);
    newTicketData.lastname = formatInput(newTicketData.lastname);
    newTicketData.brand = formatInput(newTicketData.brand);
    newTicketData.model = formatInput(newTicketData.model);
    newTicketData.color = formatInput(newTicketData.color);
    newTicketData.size = formatInput(newTicketData.size);

    editTicket(newTicketData, targetId);
}

const displayEditTicket = (ticketArr) => {
    const {firstname, lastname, email, phone, brand, model, color, size} = ticketArr[0];
    
    let {total_price} = ticketArr[1]

    if(total_price === null) {
        let total_price = '$ 0.00'
    }

    let ticketInfo = document.getElementById('newTicket');
    ticketInfo.innerHTML = `
        <section class="newTicketForm ticketInputs" id="clientForm">
            <h3>Client Information</h3>
            <label for="viewName">Customer Name:</label>
            <h4 id="viewName" name="viewName">${firstname} ${lastname}</h4>
            <label for="viewPhone">Phone:</label>
            <h4 id="viewPhone" name="viewPhone">${phone}</h4>
            <label for="viewEmail">Email:</label>
            <h4 id="viewEmail" name="viewEmail">${email}</h4>
            <label class="ticket-left" for="viewPrice">Ticket Cost:</label>
            <h4 class="ticket-right" id="viewPrice" name="viewPrice">$ ${total_price}.00</h4>
        </section>
        <section class="newTicketForm ticketInputs" id="bikeForm">
            <h3>Bike Information</h3>
            <label for="viewBrand">Brand:</label>
            <h4 id="viewBrand" name="viewBrand">${brand}</h4>
            <label for="viewModel">Model:</label>
            <h4 id="viewModel" name="viewModel">${model}</h4>
            <label for="viewColor">Color:</label>
            <h4 id="viewColor" name="viewColor">${color}</h4>
            <label for="viewSize">Size:</label>
            <h4 id="viewSize" name="viewSize">${size}</h4>
        </section>
    `
    getTickets();
}

const toggleDelete = event => {
    let deleteDiv = document.getElementById('confirmDeleteDiv')
    if(event.target.id === "ticketDeleteBtn") {
        toggleDeleteBtn.classList.add('hide')
        deleteDiv.classList.remove('hide')
    } else {
        toggleDeleteBtn.classList.remove('hide')
        deleteDiv.classList.add('hide')
    }
}

const toggleAddItem = event => {
    let addItemDiv = document.getElementById('newItemDiv');
    let searchItemDiv = document.getElementById('searchItemDiv');
    if(event.target.id === 'showAddItem') {
        searchItemDiv.classList.add('hide')
        addItemDiv.classList.remove('hide')
    } else {
        searchItemDiv.classList.remove('hide')
        addItemDiv.classList.add('hide')
    }
}