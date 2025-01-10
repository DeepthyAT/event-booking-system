const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

//Create Event
router.post('/events', eventController.createEvent);

//Book Event
router.post('/bookings', eventController.bookEvent);

//Get Booking Count
router.get('/events/:eventId/bookings/count', eventController.getEventBookingCount);

module.exports = router;
