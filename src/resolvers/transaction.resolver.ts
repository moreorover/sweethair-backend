import { Invoice } from './../entity/hair/Invoice';
import { Appointment } from './../entity/hair/Appointment';
import { Transaction } from './../entity/hair/Transaction';
import { Customer } from '../entity/hair/Customer';
import { Resolver, Query, Ctx, FieldResolver, Root } from 'type-graphql';
import { MyContext } from '../types';
import { TransactionService } from '../services/transaction.service';

@Resolver(Transaction)
export class TransactionResolver {
  @FieldResolver(() => Appointment, { nullable: true })
  appointment(
    @Root() transaction: Transaction,
    @Ctx() { transactionLoaders }: MyContext
  ) {
    return transactionLoaders.appointment.load(transaction.id);
  }

  @FieldResolver(() => Customer, { nullable: true })
  customer(
    @Root() transaction: Transaction,
    @Ctx() { transactionLoaders }: MyContext
  ) {
    return transactionLoaders.customer.load(transaction.id);
  }

  @FieldResolver(() => Invoice, { nullable: true })
  invoice(
    @Root() transaction: Transaction,
    @Ctx() { transactionLoaders }: MyContext
  ) {
    return transactionLoaders.invoice.load(transaction.id);
  }

  @Query(() => [Transaction])
  // @UseMiddleware(isAuth)
  transactions() {
    const service: TransactionService = new TransactionService(Transaction);
    return service.all();
  }
}
