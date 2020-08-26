const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket, 
    create, 
    delete: deleteTicket
}

function newTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        res.render('tickets/new', {flight});
    });
}

function create(req, res) {
    req.body.flight = req.params.id;
    console.log(req.body);
    Ticket.create(req.body, function(err, ticket) {
        res.redirect(`/flights/${req.params.id}`);
    });
}

function deleteTicket(req, res) {
    Ticket.findByIdAndDelete(req.params.id, function(err, ticket){
        res.redirect(`/flights`);
    });
}
