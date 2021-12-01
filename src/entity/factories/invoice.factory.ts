import { Invoice } from './../hair/Invoice';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import moment from 'moment';

define(Invoice, (faker: typeof Faker) => {
    const invoice = new Invoice();
    invoice.total = faker.datatype.float({ min: 32.5, max: 1032.49 });
    invoice.isReceived = faker.datatype.boolean();
    invoice.isPaid = faker.datatype.boolean();
    invoice.scheduledAt = faker.date.between(moment().subtract(1, 'month').toDate(), moment().add(1, 'month').toDate());

    return invoice;
});
