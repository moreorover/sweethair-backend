import { CustomerCreate, CustomerUpdate } from './types/customer.types';
import { Customer } from '../entity/hair/Customer';
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  UseMiddleware,
  Int,
} from 'type-graphql';
import { CustomerService } from '../services/customer.service';
import { isAuth } from '../middleware/isAUth';
import { getConnection } from 'typeorm';

@Resolver(Customer)
export class CustomerResolver {
  @Query(() => [Customer])
  // @UseMiddleware(isAuth)
  customers(): Promise<Customer[]> {
    const service: CustomerService = new CustomerService(Customer);
    return service.all();
  }

  @Query(() => Customer, { nullable: true })
  async customer(
    @Arg('customerId', (type) => Int) customerId: number
  ): Promise<Customer | undefined> {
    const customer = await Customer.findOne(customerId);
    return customer;
  }

  @Mutation(() => Customer)
  // @UseMiddleware(isAuth)
  async createCustomer(
    @Arg('customer') customer: CustomerCreate
  ): Promise<Customer> {
    return Customer.create(customer).save();
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Arg('customer') customer: CustomerUpdate
  ): Promise<Customer> {
    const result = await getConnection().getRepository(Customer).save(customer);
    return result;
  }
}
