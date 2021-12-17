import { Transaction } from './../entity/hair/Transaction';
import { Resolver, Query } from 'type-graphql';
import { TransactionService } from '../services/transaction.service';

@Resolver(Transaction)
export class TransactionResolver {
  @Query(() => [Transaction])
  // @UseMiddleware(isAuth)
  transactions() {
    const service: TransactionService = new TransactionService(Transaction);
    return service.all();
  }
}
