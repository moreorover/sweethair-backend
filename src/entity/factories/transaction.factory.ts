import { Transaction } from './../hair/Transaction';
import { define } from 'typeorm-seeding';
import Faker from 'faker';
import moment from 'moment';

define(Transaction, (faker: typeof Faker) => {
  const transaction = new Transaction();
  transaction.total = Math.random() * (1032.49 - -450) + -450;
  transaction.isPaid = Math.random() < 0.5;
  transaction.scheduledAt = faker.date.between(
    moment().subtract(1, 'month').toDate(),
    moment().add(1, 'month').toDate()
  );

  return transaction;
});
