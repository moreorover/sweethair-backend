import { ItemService } from './../services/item.service';
import { Item } from './../entity/hair/Item';
import { Invoice } from '../entity/hair/Invoice';
import { Appointment } from '../entity/hair/Appointment';
import { Transaction } from '../entity/hair/Transaction';
import { Customer } from '../entity/hair/Customer';
import { Resolver, Query, Ctx, FieldResolver, Root } from 'type-graphql';
import { MyContext } from '../types';

@Resolver(Item)
export class ItemResolver {
  @FieldResolver(() => Appointment, { nullable: true })
  appointment(
    @Root() transaction: Transaction,
    @Ctx() { itemLoaders }: MyContext
  ) {
    return itemLoaders.appointment.load(transaction.id);
  }

  @FieldResolver(() => Customer, { nullable: true })
  customer(
    @Root() transaction: Transaction,
    @Ctx() { itemLoaders }: MyContext
  ) {
    return itemLoaders.customer.load(transaction.id);
  }

  @FieldResolver(() => Invoice, { nullable: true })
  invoice(@Root() transaction: Transaction, @Ctx() { itemLoaders }: MyContext) {
    return itemLoaders.invoice.load(transaction.id);
  }

  @Query(() => [Item])
  // @UseMiddleware(isAuth)
  items() {
    const service: ItemService = new ItemService(Item);
    return service.all();
  }
}
