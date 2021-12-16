import { Transaction } from './../entity/hair/Transaction';
import { getConnection } from 'typeorm';
import DataLoader from 'dataloader';

// [1, 78, 8, 9]
// [{id: 1, username: 'tim'}, {}, {}, {}]
export const createTransactionLoader = () =>
  new DataLoader<number, Transaction>(async (transactionIds) => {
    const connection = getConnection().getRepository(Transaction);
    const transactions = await connection.findByIds(transactionIds as number[]);
    const transactionIdToTransaction: Record<number, Transaction> = {};
    transactions.forEach((c) => {
      transactionIdToTransaction[c.id] = c;
    });

    const sortedTransactions = transactionIds.map(
      (transactionId) => transactionIdToTransaction[transactionId]
    );
    // console.log("userIds", userIds);
    // console.log("map", userIdToUser);
    // console.log("sortedUsers", sortedUsers);
    return sortedTransactions;
  });
