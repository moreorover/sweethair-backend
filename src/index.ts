import userRoutes = require('./api/user/user.routes');
const bodyParser = require('body-parser');
import all_routes = require('express-list-endpoints');
var cors = require('cors');
require('dotenv').config();

const express = require('express');

const port: string = process.env.PORT;

const main = async () => {
  const app = express();

  app.use(express.json());

  // app.use(cors({ credentials: true, origin: '***IP address of where the site is hosted***' }));
  app.use(cors({ credentials: true, origin: 'http://localhost:' + port }));
  app.use(bodyParser.json());

  app.use('/users', userRoutes);

  console.log(all_routes(app));

  app.listen(port, () => {
    console.log('server started on http://localhost:' + port);
  });
};

main();
