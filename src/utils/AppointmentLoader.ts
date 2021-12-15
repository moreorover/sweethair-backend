import { Item } from './../entity/hair/Item';
import { Transaction } from '../entity/hair/Transaction';
import { getConnection } from 'typeorm';
import { Appointment } from '../entity/hair/Appointment';
import DataLoader from 'dataloader';
import { Customer } from '../entity/hair/Customer';

export const createAppointmentLoader = () =>
  new DataLoader<number, Appointment>(async (appointmentIds) => {
    const connection = getConnection().getRepository(Appointment);
    const appointments = await connection.findByIds(appointmentIds as number[]);
    const appointmentIdToAppointment: Record<number, Appointment> = {};
    appointments.forEach((a) => {
      appointmentIdToAppointment[a.id] = a;
    });

    const sortedAppointments = appointmentIds.map(
      (appointmentId) => appointmentIdToAppointment[appointmentId]
    );
    return sortedAppointments;
  });

export const createAppointmentCustomersLoader = () =>
  new DataLoader<number, Customer[]>(async (appointmentIds) => {
    const connection = getConnection().getRepository(Appointment);
    const appointments = await connection.findByIds(
      appointmentIds as number[],
      {
        select: ['id', 'customers'],
        relations: ['customers'],
      }
    );
    const appointmentIdToCustomers: Record<number, Customer[]> = {};
    appointments.forEach((a) => {
      appointmentIdToCustomers[a.id] = a.customers;
    });

    const sortedCustomers = appointmentIds.map(
      (appointmentId) => appointmentIdToCustomers[appointmentId]
    );
    return sortedCustomers;
  });

export const createAppointmentItemsLoader = () =>
  new DataLoader<number, Item[]>(async (appointmentIds) => {
    const connection = getConnection().getRepository(Appointment);
    const appointments = await connection.findByIds(
      appointmentIds as number[],
      {
        select: ['id', 'items'],
        relations: ['items'],
      }
    );
    const appointmentIdToItems: Record<number, Item[]> = {};
    appointments.forEach((a) => {
      appointmentIdToItems[a.id] = a.items;
    });

    const sortedItems = appointmentIds.map(
      (appointmentId) => appointmentIdToItems[appointmentId]
    );
    return sortedItems;
  });

export const createAppointmentTransactionsLoader = () =>
  new DataLoader<number, Transaction[]>(async (appointmentIds) => {
    const connection = getConnection().getRepository(Appointment);
    const appointments = await connection.findByIds(
      appointmentIds as number[],
      {
        select: ['id', 'transactions'],
        relations: ['transactions'],
      }
    );
    const appointmentIdToTransactions: Record<number, Transaction[]> = {};
    appointments.forEach((a) => {
      appointmentIdToTransactions[a.id] = a.transactions;
    });

    const sortedTransactions = appointmentIds.map(
      (appointmentId) => appointmentIdToTransactions[appointmentId]
    );
    return sortedTransactions;
  });
