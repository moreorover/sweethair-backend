import { createCustomerLoader } from './utils/createCustomerLoader';
import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { Session } from 'express-session';

export type MyContext = {
  req: Request & { session?: Session & { userId?: number } };
  redis: Redis;
  res: Response;
  customerLoader: ReturnType<typeof createCustomerLoader>;
};
