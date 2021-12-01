import { Item } from './../hair/Item';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

define(Item, (faker: typeof Faker) => {
    const item = new Item();
    item.title = faker.datatype.string();
    item.total = faker.datatype.float({ min: 3, max: 430 });
    return item;
});
