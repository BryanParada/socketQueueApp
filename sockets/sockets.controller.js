const { TicketControl } = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) =>{

        socket.emit('last-ticket', ticketControl.last );

        //console.log('Client Connected', socket.id);
        
        socket.on('disconnect', () =>{
            //console.log('Client Disconnected', socket.id); 
        })
        
        //ESCUCHANDO CUANDO CLIENTE LO EMITE
        socket.on('next-ticket', (payload, callback) => {
          
            const next = ticketControl.next();
            callback(next);

            //TODO: notificar que hay un nuevo ticket pendiente de asignar

        })


}

 

module.exports = {
    socketController
}