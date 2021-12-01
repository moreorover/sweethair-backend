import { Transaction } from './../hair/Transaction';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import moment from 'moment';

define(Transaction, (faker: typeof Faker) => {
    const transaction = new Transaction();
    transaction.total = faker.datatype.float({ min: 32.5, max: 1032.49 });
    transaction.isPaid = faker.datatype.boolean();
    transaction.scheduledAt = faker.date.between(moment().subtract(1, 'month').toDate(), moment().add(1, 'month').toDate());

    return transaction;
});
