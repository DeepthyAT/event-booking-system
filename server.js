const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
//const redisClient = require('./config/redisClient');
//const rabbitmq = require('./config/rabbitmq');
const app = express();
app.use(bodyParser.json());
const PORT = 3000;
app.use('/api', eventRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
