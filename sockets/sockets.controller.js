const { TicketControl } = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) =>{

        //console.log('Client Connected', socket.id);
        
        socket.on('disconnect', () =>{
            //console.log('Client Disconnected', socket.id); 
        })
        
        //ESCUCHANDO CUANDO CLIENTE LO EMITE
        socket.on('send-msg', (payload, callback) => {
            //console.log(payload);

            const id = 123456;
            callback({ id, date: new Date().getTime() });
            //CUANDO EL SERVIDOR DE SOCKETS LO ENVIA
            socket.broadcast.emit('send-msg', payload);
            
        })


}

 

module.exports = {
    socketController
}