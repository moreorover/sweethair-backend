import { Invoice } from './../hair/Invoice';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import * as moment from 'moment';

define(Invoice, (faker: typeof Faker) => {
  const invoice = new Invoice();
  // invoice.total = faker.datatype.float({ min: 32.5, max: 1032.49 });
  invoice.total = Math.random() * (1032.49 - 32.5) + 32.5;
  invoice.isReceived = Math.random() < 0.5;
  invoice.isPaid = Math.random() < 0.5;
  invoice.scheduledAt = faker.date.between(
    moment().subtract(1, 'month').toDate(),
    moment().add(1, 'month').toDate()
  );

  return invoice;
});
