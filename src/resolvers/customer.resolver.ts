import { CustomerInput } from './types/customer.types';
import { Customer } from '../entity/hair/Customer';
import { Resolver, Query, Arg, Mutation, UseMiddleware } from 'type-graphql';
import { CustomerService } from '../services/customer.service';
import { isAuth } from '../middleware/isAUth';

@Resolver()
export class CustomerResolver {
  @Query(() => [Customer])
  @UseMiddleware(isAuth)
  customers() {
    const service: CustomerService = new CustomerService(Customer);
    return service.all();
  }

  @Mutation(() => Customer)
  @UseMiddleware(isAuth)
  async createCustomer(@Arg('input') input: CustomerInput): Promise<Customer> {
    return Customer.create(input).save();
  }
}
