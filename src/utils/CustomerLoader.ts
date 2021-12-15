import { Transaction } from '../entity/hair/Transaction';
import { getConnection } from 'typeorm';
import { Customer } from '../entity/hair/Customer';
import DataLoader from 'dataloader';

export const createCustomerLoader = () =>
  new DataLoader<number, Customer>(async (customerIds) => {
    const connection = getConnection().getRepository(Customer);
    const customers = await connection.findByIds(customerIds as number[]);
    const customerIdToCustomer: Record<number, Customer> = {};
    customers.forEach((c) => {
      customerIdToCustomer[c.id] = c;
    });

    const sortedCustomers = customerIds.map(
      (customerId) => customerIdToCustomer[customerId]
    );
    return sortedCustomers;
  });

export const createCustomerTransactionsLoader = () =>
  new DataLoader<number, Transaction[]>(async (customerIds) => {
    const connection = getConnection().getRepository(Customer);
    const customers = await connection.findByIds(customerIds as number[], {
      select: ['id', 'transactions'],
      relations: ['transactions'],
    });
    const customerIdToTransactions: Record<number, Transaction[]> = {};
    customers.forEach((c) => {
      customerIdToTransactions[c.id] = c.transactions;
    });

    const sortedTransactions = customerIds.map(
      (customerId) => customerIdToTransactions[customerId]
    );
    return sortedTransactions;
  });
