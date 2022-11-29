const path = require('path');
const fs = require('fs');

class Ticket {
    constructor( number, desktop){
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {

    constructor(){ 
        this.last    = 0;
        this.today   = new Date().getDate();
        this.tickets = [];
        this.last4   = [];

        this.init();
    }

    get toJson(){
        return{
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        }
    }

    init(){
        const {today, tickets, last, last4} = require('../db/data.json'); 
        //si se cumple estariamos recargando el server
        if (today === this.today) {
            this.tickets = tickets;
            this.last = last;
            this.last4 = last4
        }else{
            //es otro dia
            this.saveDB();
        }
        
    }

    saveDB(){
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify( this.toJson ));
    }

    nextTicket(){
        this.last += 1;
        const ticket = new Ticket( this.last, null);
        this.tickets.push( ticket );

        this.saveDB();
        return 'Ticket ' + ticket.number;
    }

    attendTicket( desktop){
        // no tenemos tickets
        console.log(this.tickets);
        if (this.tickets.length === 0){
            return null;
        }
        
        // const ticket = this.tickets[0];
        // this.tickets.shift(); //remueve el primer elemento y lo retorna
        const ticket = this.tickets.shift();
        
        
        ticket.desktop = desktop;

        this.last4.unshift( ticket ); // añade elemento nuevo al inicio

        if ( this.last4.length > 4){
            this.last4.splice(-1, 1); //pos -1 y elimina 1
        }

        this.saveDB();

        return ticket;

    }

}

module.exports = {TicketControl}