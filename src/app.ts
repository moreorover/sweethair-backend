import { createConnection } from 'typeorm';
import appointmentRoutes = require('./routes/appointment.routes');
import userRoutes = require('./routes/user.routes');
import itemRoutes = require('./routes/item.routes');
import roleRoutes = require('./routes/role.routes');
import authRoutes = require('./routes/auth.routes');
import invoiceRoutes = require('./routes/invoice.routes');
import customerRoutes = require('./routes/customer.routes');
import transactionRoutes = require('./routes/transaction.routes');
const bodyParser = require('body-parser');
import all_routes = require('express-list-endpoints');
var cors = require('cors');
import redis = require('redis');
import session = require('express-session');
require('dotenv').config();

const express = require('express');

const main = async () => {
    await createConnection();

    const app = express();

    const RedisStore = require('connect-redis')(session);
    const redisClient = redis.createClient({ host: process.env.REDIS_HOST });

    app.use(
        session({
            name: 'squid',
            store: new RedisStore({ client: redisClient, disableTouch: true }),
            cookie: { maxAge: 1000 * 60 * 60 * 24 * 365, httpOnly: true, secure: false, sameSite: 'none' },
            saveUninitialized: false,
            secret: process.env.JWT_ACCESS_TOKEN,
            resave: false
        })
    );

    // app.use(cors({ credentials: true, origin: '***IP address of where the site is hosted***' }));
    app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.use('/appointments', appointmentRoutes);
    app.use('/users', userRoutes);
    app.use('/roles', roleRoutes);
    app.use('/auth', authRoutes);
    app.use('/items', itemRoutes);
    app.use('/customers', customerRoutes);
    app.use('/transactions', transactionRoutes);
    app.use('/invoices', invoiceRoutes);

    console.log(all_routes(app));

    app.listen(3000, () => {
        console.log('server started on http://localhost:3000');
    });
};

main();
