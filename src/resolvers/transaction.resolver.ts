import { Transaction } from './../entity/hair/Transaction';
import { Customer } from '../entity/hair/Customer';
import {
  Resolver,
  Query,
  Ctx,
  UseMiddleware,
  FieldResolver,
  Root,
} from 'type-graphql';
import { MyContext } from '../types';
import { isAuth } from '../middleware/isAUth';
import { TransactionService } from '../services/transaction.service';

@Resolver(Transaction)
export class TransactionResolver {
  @FieldResolver(() => Customer, { nullable: true })
  customer(
    @Root() transaction: Transaction,
    @Ctx() { customerLoaders }: MyContext
  ) {
    return transaction.customerId
      ? customerLoaders.customer.load(transaction.customerId)
      : null;
  }

  @Query(() => [Transaction])
  @UseMiddleware(isAuth)
  transactions() {
    const service: TransactionService = new TransactionService(Transaction);
    return service.all();
  }
}
