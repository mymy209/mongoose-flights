const express = require('express');
const router = express.Router(); 
const flightsCtrl = require('../controllers/flights');
const destinationsCtrl = require('../controllers/destinations');

//POST /flights/:id/destinations
router.post('/flights/:id/destinations', destinationsCtrl.create); 
//DELETE /flights
//router.put('/flights/:id/destinations/:id', destinationsCtrl.delete);

module.exports = router; 