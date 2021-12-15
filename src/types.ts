import { createTransactionLoader } from './utils/createTransactionLoader';
import { createCustomerLoader } from './utils/CustomerLoader';
import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { Session } from 'express-session';

export type MyContext = {
  req: Request & { session?: Session & { userId?: number } };
  redis: Redis;
  res: Response;
  customerLoader: ReturnType<typeof createCustomerLoader>;
  customerTransactionsLoader: ReturnType<typeof createTransactionLoader>;
  transactionLoader: ReturnType<typeof createTransactionLoader>;
};
