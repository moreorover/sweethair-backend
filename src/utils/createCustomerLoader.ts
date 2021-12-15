import { getConnection } from 'typeorm';
import { Customer } from '../entity/hair/Customer';
import DataLoader from 'dataloader';

// [1, 78, 8, 9]
// [{id: 1, username: 'tim'}, {}, {}, {}]
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
    // console.log("userIds", userIds);
    // console.log("map", userIdToUser);
    // console.log("sortedUsers", sortedUsers);
    return sortedCustomers;
  });
