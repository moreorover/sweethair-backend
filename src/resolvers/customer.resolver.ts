import { Transaction } from './../entity/hair/Transaction';
import { CustomerInput } from './types/customer.types';
import { Customer } from '../entity/hair/Customer';
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  UseMiddleware,
  Ctx,
  FieldResolver,
  Root,
} from 'type-graphql';
import { CustomerService } from '../services/customer.service';
import { isAuth } from '../middleware/isAUth';
import { MyContext } from '../types';

@Resolver(Customer)
export class CustomerResolver {
  @FieldResolver(() => [Transaction])
  transactions(
    @Root() customer: Customer,
    @Ctx() { customerLoaders }: MyContext
  ) {
    return customerLoaders.transactions.load(customer.id);
  }

  @Query(() => [Customer])
  // @UseMiddleware(isAuth)
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
