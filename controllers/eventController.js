const eventService = require('../services/eventService');


exports.createEvent = async (req, res) => {
    try {
        const { eventName, capacity } = req.body;
        const eventId = await eventService.createEvent(eventName, capacity);
        res.status(201).json({ message: 'Event created successfully', eventId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.bookEvent = async (req, res) => {
    try {
        const { userId, eventId } = req.body;
        const bookingId = await eventService.bookEvent(userId, eventId);
        res.status(201).json({ message: 'Event booked successfully', bookingId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.getEventBookingCount = async (req, res) => {
    try {
        const { eventId } = req.params;
        const bookingCount = await eventService.getEventBookingCount(eventId);
        res.status(200).json({ eventId, bookingCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
