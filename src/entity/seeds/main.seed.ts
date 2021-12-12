import { Item } from './../hair/Item';
import { Transaction } from './../hair/Transaction';
import { Appointment } from './../hair/Appointment';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Customer } from '../hair/Customer';
import * as Faker from 'faker';
import { Invoice } from '../hair/Invoice';

export default class Main implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Appointment)().createMany(100);
    await factory(Customer)().createMany(20);
    await factory(Invoice)()
      .map(async (invoice) => {
        invoice.items = await factory(Item)().createMany(
          Faker.datatype.number({ min: 6, max: 35 }),
        );
        invoice.total = invoice.items.reduce((p, c) => p + c.total, 0);
        invoice.transactions = await factory(Transaction)().createMany(
          Faker.datatype.number({ min: 1, max: 3 }),
        );
        return invoice;
      })
      .createMany(5);
    await factory(Item)().createMany(60);
    await factory(Transaction)().createMany(150);

    const customers = await connection.getRepository(Customer).find();

    const appointments: Appointment[] = await connection
      .getRepository(Appointment)
      .find();
    for (let appointment of appointments) {
      const cs = Faker.random.arrayElements(
        customers,
        Faker.datatype.number({ min: 1, max: 2 }),
      );
      appointment.customers = cs;

      const items: Item[] = await connection
        .getRepository(Item)
        .find({ customer: null, appointment: null });
      const randomItems = Faker.random.arrayElements(
        items,
        Faker.datatype.number({ min: 0, max: 2 }),
      );
      randomItems.forEach((rI) => {
        rI.customer = Faker.random.arrayElements(cs, 1)[0];
        rI.appointment = appointment;
      });

      for (let rI of randomItems) {
        await connection.getRepository(Item).save(rI);
      }

      const transactions = await connection
        .getRepository(Transaction)
        .find({ appointment: null, invoice: null });
      const randomTransactions = Faker.random.arrayElements(
        transactions,
        Faker.datatype.number(4),
      );
      appointment.transactions = randomTransactions;
      for (let transaction of randomTransactions) {
        transaction.customer = Faker.random.arrayElements(
          cs,
          Faker.datatype.number(1),
        )[0];
        await connection.getRepository(Transaction).save(transaction);
      }
      await connection.getRepository(Appointment).save(appointment);
    }
  }
}
