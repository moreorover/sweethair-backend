import { ItemService } from './../services/item.service';
import { Item } from './../entity/hair/Item';
import { Resolver, Query, Arg, Int, Mutation } from 'type-graphql';
import { ItemCreate, ItemUpdate } from './types/item.types';
import { getConnection } from 'typeorm';

@Resolver(Item)
export class ItemResolver {
  @Query(() => [Item])
  // @UseMiddleware(isAuth)
  items() {
    const service: ItemService = new ItemService(Item);
    return service.all();
  }

  @Query(() => Item, { nullable: true })
  async item(
    @Arg('itemId', (type) => Int) itemId: number
  ): Promise<Item | undefined> {
    const item = await Item.findOne(itemId);
    return item;
  }

  @Mutation(() => Item)
  async createItem(@Arg('item') item: ItemCreate): Promise<Item> {
    return Item.create(item).save();
  }

  @Mutation(() => Item)
  async updateItem(@Arg('item') item: ItemUpdate): Promise<Item> {
    const result = await getConnection().getRepository(Item).save(item);
    return result;
  }
}
