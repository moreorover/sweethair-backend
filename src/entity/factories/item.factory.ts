import { Item } from './../hair/Item';
import { define } from 'typeorm-seeding';
import Faker from 'faker';

define(Item, (faker: typeof Faker) => {
    const item = new Item();
    item.title = faker.lorem.words(4);
    item.total = Math.random() * (430 - 3) + 3;
    return item;
});
