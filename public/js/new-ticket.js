//Referencias HTML
const lblNewTicket = document.querySelector('#lblNewTicket')
const btnCreate = document.querySelector('button')


//socket del cliente / Navegador!
const socket = io();

socket.on('connect', () =>{   
    btnCreate.disabled = false;
});

socket.on('disconnect', () =>{   
    btnCreate.disabled = true;
});
 
socket.on('last-ticket', (lastTicket) => {
    lblNewTicket.innerText = 'Ticket ' + lastTicket; 
});

btnCreate.addEventListener('click', () =>{
 
    socket.emit('next-ticket', null, ( ticket) => {
        // console.log('From the server', ticket);
        lblNewTicket.innerText = ticket;
        
    });
    
});