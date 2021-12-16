import { createTransactionLoader } from './utils/TransactionLoader';
import { createCustomerLoader } from './utils/CustomerLoader';
import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { Session } from 'express-session';
import {
  createAppointmentCustomersLoader,
  createAppointmentItemsLoader,
  createAppointmentLoader,
  createAppointmentTransactionsLoader,
} from './utils/AppointmentLoader';

export type MyContext = {
  req: Request & { session?: Session & { userId?: number } };
  redis: Redis;
  res: Response;

  appointmentLoaders: {
    appointment: ReturnType<typeof createAppointmentLoader>;
    customers: ReturnType<typeof createAppointmentCustomersLoader>;
    items: ReturnType<typeof createAppointmentItemsLoader>;
    transactions: ReturnType<typeof createAppointmentTransactionsLoader>;
  };
  customerLoaders: {
    customer: ReturnType<typeof createCustomerLoader>;
    transactions: ReturnType<typeof createTransactionLoader>;
  };
  transactionLoader: ReturnType<typeof createTransactionLoader>;
};
