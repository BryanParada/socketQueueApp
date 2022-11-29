//referencias HTML
const lblDesktop = document.querySelector('h1');
const btnAttend = document.querySelector('button'); 


const searchParams = new URLSearchParams( window.location.search);

if ( !searchParams.has('desktop'))
{
    window.location = 'index.html';
    throw new Error('Desktop is required')
}

const desktop = searchParams.get('desktop');
lblDesktop.innerText = desktop;

//socket del cliente / Navegador!
const socket = io();

socket.on('connect', () =>{ 
    //console.log('Connected'); 
 
    btnAttend.disabled = false;
});

socket.on('disconnect', () =>{ 
    //console.log('Disconnected from Server');
    
    btnAttend.disabled = true;
});

//A PESAR DE QUE SE LLAME SEND-MSG, ESTE SERA UN EVENTO DE ESCUCHA AL SERVIDOR
socket.on('last-ticket', (lastTicket) => {
    //lblNewTicket.innerText = 'Ticket ' + lastTicket;
    
});

btnAttend.addEventListener('click', () =>{
 
    // socket.emit('next-ticket', null, ( ticket) => {
    //     // console.log('From the server', ticket);
    //     lblNewTicket.innerText = ticket;
        
    // });
    
});