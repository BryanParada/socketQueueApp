//Referencias HTML
const lblNewTicket = document.querySelector('#lblNewTicket')
const btnCreate = document.querySelector('button')


//socket del cliente / Navegador!
const socket = io();

socket.on('connect', () =>{ 
    //console.log('Connected'); 
 
    btnCreate.disabled = false;
});

socket.on('disconnect', () =>{ 
    //console.log('Disconnected from Server');
    
    btnCreate.disabled = true;
});

//A PESAR DE QUE SE LLAME SEND-MSG, ESTE SERA UN EVENTO DE ESCUCHA AL SERVIDOR
socket.on('last-ticket', (lastTicket) => {
    lblNewTicket.innerText = 'Ticket ' + lastTicket;
    
});

btnCreate.addEventListener('click', () =>{
 
    socket.emit('next-ticket', null, ( ticket) => {
        // console.log('From the server', ticket);
        lblNewTicket.innerText = ticket;
        
    });
    
});