import { Item } from './../entity/hair/Item';
import { Appointment } from './../entity/hair/Appointment';
import { Transaction } from '../entity/hair/Transaction';
import { getConnection } from 'typeorm';
import { Customer } from '../entity/hair/Customer';
import DataLoader from 'dataloader';

export const createCustomerLoader = () =>
  new DataLoader<number, Customer>(async (customerIds: number[]) => {
    const connection = getConnection().getRepository(Customer);
    const customers = await connection.findByIds(customerIds);
    const customerIdToCustomer: Record<number, Customer> = {};
    customers.forEach((c) => {
      customerIdToCustomer[c.id] = c;
    });

    const sortedCustomers = customerIds.map(
      (customerId) => customerIdToCustomer[customerId]
    );
    return sortedCustomers;
  });

export const createCustomerAppointmentsLoader = () =>
  new DataLoader<number, Appointment[]>(async (customerIds: number[]) => {
    const connection = getConnection().getRepository(Customer);
    const customers = await connection.findByIds(customerIds, {
      relations: ['appointments'],
    });
    const customerIdToAppointments: Record<number, Appointment[]> = {};
    customers.forEach((c) => {
      customerIdToAppointments[c.id] = c.appointments;
    });

    const sortedAppointments = customerIds.map(
      (customerId) => customerIdToAppointments[customerId]
    );
    return sortedAppointments;
  });

export const createCustomerTransactionsLoader = () =>
  new DataLoader<number, Transaction[]>(async (customerIds: number[]) => {
    const connection = getConnection().getRepository(Customer);
    const customers = await connection.findByIds(customerIds, {
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

export const createCustomerItemsLoader = () =>
  new DataLoader<number, Item[]>(async (customerIds: number[]) => {
    const connection = getConnection().getRepository(Customer);
    const customers = await connection.findByIds(customerIds, {
      select: ['id', 'items'],
      relations: ['items'],
    });
    const customerIdToItems: Record<number, Item[]> = {};
    customers.forEach((c) => {
      customerIdToItems[c.id] = c.items;
    });

    const sortedItems = customerIds.map(
      (customerId) => customerIdToItems[customerId]
    );
    return sortedItems;
  });
