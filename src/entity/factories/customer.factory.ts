import { define } from 'typeorm-seeding';
import { Customer } from '../hair/Customer';
import Faker from 'faker';

define(Customer, (faker: typeof Faker) => {
    const firstName = faker.name.firstName(1);
    const lastName = faker.name.lastName(1);
    const customer = new Customer();
    customer.fullName = `${firstName} ${lastName}`;
    customer.location = faker.address.city();
    customer.about = faker.lorem.words(12);
    customer.email = faker.internet.email(firstName, lastName);
    customer.instagram = `@${faker.lorem.word()}_${faker.random.word()}`;
    return customer;
});
