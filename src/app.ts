import { createConnection } from 'typeorm';
import userRoutes = require('./routes/user.routes');
import itemRoutes = require('./routes/item.routes');
import roleRoutes = require('./routes/role.routes');
import authRoutes = require('./routes/auth.routes');
const bodyParser = require('body-parser');
const all_routes = require('express-list-endpoints');
const cookieParser = require('cookie-parser');
var cron = require('node-cron');
var cors = require('cors');

const express = require('express');

const main = async () => {
    await createConnection();

    const app = express();

    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors({ credentials: true, origin: true }));

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.use('/users', userRoutes);
    app.use('/roles', roleRoutes);
    app.use('/auth', authRoutes);
    app.use('/items', itemRoutes);

    console.log(all_routes(app));

    app.listen(3000, () => {
        console.log('server started on http://localhost:3000');
    });
};

main();