import { createTransactionLoader } from './utils/createTransactionLoader';
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

  appointmentLoader: ReturnType<typeof createAppointmentLoader>;
  appointmentCustomersLoader: ReturnType<
    typeof createAppointmentCustomersLoader
  >;
  appointmentItemsLoader: ReturnType<typeof createAppointmentItemsLoader>;
  appointmentTransactionsLoader: ReturnType<
    typeof createAppointmentTransactionsLoader
  >;
  customerLoader: ReturnType<typeof createCustomerLoader>;
  customerTransactionsLoader: ReturnType<typeof createTransactionLoader>;
  transactionLoader: ReturnType<typeof createTransactionLoader>;
};
