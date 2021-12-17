import { ItemService } from './../services/item.service';
import { Item } from './../entity/hair/Item';
import { Resolver, Query } from 'type-graphql';

@Resolver(Item)
export class ItemResolver {
  @Query(() => [Item])
  // @UseMiddleware(isAuth)
  items() {
    const service: ItemService = new ItemService(Item);
    return service.all();
  }
}
