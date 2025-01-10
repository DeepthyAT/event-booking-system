const amqp = require('amqplib/callback_api');

let channel = null;
amqp.connect('amqp://localhost', (err, conn) => {
    if (err) {
        console.error('Error connecting to RabbitMQ:', err);
        return;
    }
    conn.createChannel((err, ch) => {
        if (err) {
            console.error('Error creating RabbitMQ channel:', err);
            return;
        }
        channel = ch;
        channel.assertQueue('emailQueue', { durable: true });
        console.log('RabbitMQ Connected');
    });
});

function sendMessage(message) {
    if (channel) {
        channel.sendToQueue('emailQueue', Buffer.from(message), { persistent: true });
    }
}

module.exports = { sendMessage };
