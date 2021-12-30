import { Transaction } from './../entity/hair/Transaction';
import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';
import { TransactionService } from '../services/transaction.service';
import {
  TransactionCreate,
  TransactionUpdate,
} from './types/transaction.types';
import { getConnection } from 'typeorm';

@Resolver(Transaction)
export class TransactionResolver {
  @Query(() => [Transaction])
  // @UseMiddleware(isAuth)
  transactions() {
    const service: TransactionService = new TransactionService(Transaction);
    return service.all();
  }

  @Mutation(() => Transaction)
  async createTransaction(
    @Arg('transaction') transaction: TransactionCreate
  ): Promise<Transaction> {
    return Transaction.create(transaction).save();
  }

  @Mutation(() => Transaction)
  async updateTransaction(
    @Arg('transaction') transaction: TransactionUpdate
  ): Promise<Transaction> {
    const result = await getConnection()
      .getRepository(Transaction)
      .save(transaction);
    return result;
  }

  @Mutation(() => Transaction, { nullable: true })
  async removeTransaction(
    @Arg('transactionId', (type) => Int) transactionId: number
  ): Promise<Transaction | undefined> {
    const transaction = await Transaction.findOne(transactionId);
    await Transaction.delete(transactionId);
    return transaction;
  }
}
