const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index, 
    new: newFlight, 
    create, 
    show, 
    deleteDestination, 
    delete: deleteFlight
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', { flights});
    });
}

function newFlight(req, res) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    const departsDate = dt.toISOString().slice(0, 16);
    console.log(departsDate);
    res.render('flights/new', { departsDate});
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key].length < 2) delete req.body[key]; 
    }
    req.body.flightNo = parseInt(req.body.flightNo);
    const flight = new Flight(req.body); 
    flight.save(function(err) {
        if (err) {
            const newFlight = new Flight();
            // Obtain the default date
            const dt = newFlight.departs;
            const departsDate = dt.toISOString().slice(0, 16);
            return res.render('flights/new', {departsDate});
        }
        res.redirect('/flights');
    });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            console.log(tickets);
            res.render('flights/show', {flight, tickets});
        });
    });
}

function deleteDestination(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.destinations.remove(req.body.destinationId); 
        flight.save(function(err) {
            res.redirect(`/flights/${flight.id}`);
        });
    });
}

function deleteFlight(req, res){
    console.log('deleting');
    Flight.findById(req.params.id, function(err, flight){
        console.log(flight);
    });
    Flight.findByIdAndDelete(req.params.id, function(err) {
        res.redirect('/flights');
    });
}