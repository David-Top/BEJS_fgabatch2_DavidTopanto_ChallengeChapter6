require('./config/lib/instrument.js')
const express = require('express');
const Sentry = require('@sentry/node');
const app = express();
const PORT = 5500;

// const POOL = require('./config/db/index.js')
const prisma = require('./config/db/prisma.js')

app.use(express.json());

const INDEX_ROUTES = require('./routes/index');
app.use(INDEX_ROUTES);

prisma.$connect((err) => {
    if (err) {
        return console.error('Error Aquiring client', err);
    }
    console.log('Connected to Database');
})

// POOL.connect((err) => {
//     if (err) {
//         return console.error('Error Aquiring client', err);
//     }
//     console.log('Connected to Database');
// })

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}/api/v1/`);
})

Sentry.setupExpressErrorHandler(app);

module.exports = app;