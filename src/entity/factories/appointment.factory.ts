import { Appointment } from './../hair/Appointment';
import { define } from 'typeorm-seeding';
import Faker from 'faker';
import * as moment from 'moment';

define(Appointment, (faker: typeof Faker) => {
  const appointment = new Appointment();
  appointment.scheduledAt = faker.date.between(
    moment().subtract(1, 'month').toDate(),
    moment().add(1, 'month').toDate()
  );
  appointment.title = faker.lorem.words(2);

  return appointment;
});
