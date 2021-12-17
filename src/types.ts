import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { Session } from 'express-session';

import { createIdsToRelationshipsLoader } from './utils/idsToRelationshipLoader';

export type MyContext = {
  req: Request & { session?: Session & { userId?: number } };
  redis: Redis;
  res: Response;

  appointmentLoaders: {
    appointment: ReturnType<typeof createIdsToRelationshipsLoader>;
    customers: ReturnType<typeof createIdsToRelationshipsLoader>;
    items: ReturnType<typeof createIdsToRelationshipsLoader>;
    transactions: ReturnType<typeof createIdsToRelationshipsLoader>;
  };
  customerLoaders: {
    customer: ReturnType<typeof createIdsToRelationshipsLoader>;
    appointments: ReturnType<typeof createIdsToRelationshipsLoader>;
    items: ReturnType<typeof createIdsToRelationshipsLoader>;
    transactions: ReturnType<typeof createIdsToRelationshipsLoader>;
  };
  transactionLoaders: {
    transaction: ReturnType<typeof createIdsToRelationshipsLoader>;
    appointment: ReturnType<typeof createIdsToRelationshipsLoader>;
    customer: ReturnType<typeof createIdsToRelationshipsLoader>;
    invoice: ReturnType<typeof createIdsToRelationshipsLoader>;
  };
  itemLoaders: {
    item: ReturnType<typeof createIdsToRelationshipsLoader>;
    appointment: ReturnType<typeof createIdsToRelationshipsLoader>;
    customer: ReturnType<typeof createIdsToRelationshipsLoader>;
    invoice: ReturnType<typeof createIdsToRelationshipsLoader>;
  };
};
