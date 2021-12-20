import { Transaction } from './../entity/hair/Transaction';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
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
}
