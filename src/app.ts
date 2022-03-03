import userRoutes = require('./api/user/user.routes');
import authRoutes = require('./api/auth/auth.routes');
import customerRoutes = require('./api/customer/customer.routes');
import productRoutes = require('./api/product/product.routes');
import supplierRoutes = require('./api/supplier/supplier.routes');
const bodyParser = require('body-parser');
import all_routes = require('express-list-endpoints');
var cors = require('cors');
require('dotenv').config();

const express = require('express');

const main = async () => {
  const app = express();

  app.use(express.json());

  // app.use(cors({ credentials: true, origin: '***IP address of where the site is hosted***' }));
  app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
  app.use(bodyParser.json());

  // app.use('/appointments', appointmentRoutes);
  app.use('/users', userRoutes);
  // app.use('/roles', roleRoutes);
  app.use('/auth', authRoutes);
  // app.use('/items', itemRoutes);
  app.use('/customers', customerRoutes);
  app.use('/products', productRoutes);
  app.use('/suppliers', supplierRoutes);
  // app.use('/transactions', transactionRoutes);
  // app.use('/invoices', invoiceRoutes);

  console.log(all_routes(app));

  app.listen(3000, () => {
    console.log('server started on http://localhost:3000');
  });
};

main();
