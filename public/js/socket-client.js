//Referencias del HTML
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline'); 
const txtMessage = document.querySelector('#txtMessage');
const btnSend    = document.querySelector('#btnSend');

//socket del cliente / Navegador!
const socket = io();

socket.on('connect', () =>{ 
    //console.log('Connected'); 

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () =>{ 
    //console.log('Disconnected from Server');
    
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

//A PESAR DE QUE SE LLAME SEND-MSG, ESTE SERA UN EVENTO DE ESCUCHA AL SERVIDOR
socket.on('send-msg', (payload) => {
    console.log(payload);
    
});

btnSend.addEventListener('click', () =>{

    const msg = txtMessage.value; 
    const payload = {
        msg, 
        id: '123abc',
        date: new Date().getTime()
    }

    socket.emit('send-msg', payload, ( id) => {
        console.log('From the server', id);
        
    });
    
});