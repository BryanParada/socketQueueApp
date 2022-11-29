const { TicketControl } = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) =>{
        //cuando un cliente se conecta
        socket.emit('last-ticket', ticketControl.last );
        socket.emit('actual-status', ticketControl.last4);
        socket.emit('pending-tickets', ticketControl.tickets.length);

        //console.log('Client Connected', socket.id);
        
        socket.on('disconnect', () =>{
            //console.log('Client Disconnected', socket.id); 
        })
        
        //ESCUCHANDO CUANDO CLIENTE LO EMITE
        socket.on('next-ticket', (payload, callback) => {
          
            const nextTicket = ticketControl.nextTicket();
            callback(nextTicket);
            socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);  
        })

        socket.on('attend-ticket', ({desktop}, callback) => {
 
            if (!desktop){
                return callback({
                    ok: false,
                    msg: 'Desktop is required'
                });
            } 

            const ticket = ticketControl.attendTicket( desktop );
            socket.broadcast.emit('actual-status', ticketControl.last4)

            socket.emit('pending-tickets', ticketControl.tickets.length);
            socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

            //console.log(ticket);
            
            if(!ticket){
                callback({
                    ok: false,
                    msg: 'There is no pending tickets'
                })
            }else{
                callback({
                    ok: true,
                    ticket
                })
            }

            
        });


}

 

module.exports = {
    socketController
}