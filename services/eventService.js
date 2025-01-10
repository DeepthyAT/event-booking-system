const db = require('../config/db');

//create event
exports.createEvent = (eventName, capacity) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO events (event_name, capacity) VALUES (?, ?)';
        db.query(sql, [eventName, capacity], (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        });
    });
};

//book event
exports.bookEvent = (userId, eventId) => {
    return new Promise((resolve, reject) => {
        const checkCapacitySql = 'SELECT capacity, (SELECT COUNT(*) FROM bookings WHERE event_id = ?) AS booking_count FROM events WHERE event_id = ?';

        db.query(checkCapacitySql, [eventId, eventId], (err, results) => {
            if (err) return reject(err);

            if (results.length === 0) return reject(new Error('Event not found'));

            const { capacity, booking_count } = results[0];
            if (booking_count >= capacity) return reject(new Error('Event capacity exceeded'));

            const checkDuplicateSql = 'SELECT * FROM bookings WHERE user_id = ? AND event_id = ?';
            db.query(checkDuplicateSql, [userId, eventId], (err, duplicateResults) => {
                if (err) return reject(err);
                if (duplicateResults.length > 0) return reject(new Error('Duplicate booking'));

                const insertBookingSql = 'INSERT INTO bookings (user_id, event_id) VALUES (?, ?)';
                db.query(insertBookingSql, [userId, eventId], (err, insertResult) => {
                    if (err) return reject(err);
                    resolve(insertResult.insertId);
                });
            });
        });
    });
};


// Get Booking Count
exports.getEventBookingCount = (eventId) => {
    return new Promise((resolve, reject) => {
        const checkEventSql = 'SELECT * FROM events WHERE event_id = ?';

        db.query(checkEventSql, [eventId], (err, eventResults) => {
            if (err) return reject(err);

            // If event doesn't exist, return error
            if (eventResults.length === 0) return reject(new Error('Event not found'));

            // Now fetch the booking count
            const sql = 'SELECT COUNT(*) AS booking_count FROM bookings WHERE event_id = ?';
            db.query(sql, [eventId], (err, results) => {
                if (err) return reject(err);
                resolve(results[0].booking_count);
            });
        });
    });
};
