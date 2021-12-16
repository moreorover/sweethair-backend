import { Customer } from './../entity/hair/Customer';
import { Item } from './../entity/hair/Item';
import { Transaction } from './../entity/hair/Transaction';
import { Appointment } from './../entity/hair/Appointment';
import { AppointmentService } from './../services/appointment.service';
import {
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
  FieldResolver,
  Root,
  Mutation,
  Arg,
} from 'type-graphql';
import { isAuth } from '../middleware/isAUth';
import { MyContext } from '../types';

@Resolver(Appointment)
export class AppointmentResolver {
  @FieldResolver(() => [Customer])
  customers(
    @Root() appointment: Appointment,
    @Ctx() { appointmentLoaders }: MyContext
  ) {
    return appointmentLoaders.customers.load(appointment.id);
  }

  @FieldResolver(() => [Item])
  items(
    @Root() appointment: Appointment,
    @Ctx() { appointmentLoaders }: MyContext
  ) {
    return appointmentLoaders.items.load(appointment.id);
  }

  @FieldResolver(() => [Transaction])
  transactions(
    @Root() appointment: Appointment,
    @Ctx() { appointmentLoaders }: MyContext
  ) {
    return appointmentLoaders.transactions.load(appointment.id);
  }

  @Query(() => [Appointment])
  @UseMiddleware(isAuth)
  appointments() {
    const service: AppointmentService = new AppointmentService(Appointment);
    return service.all();
  }

  @Query(() => Appointment)
  async appointment(@Arg('appointmentId') appointmentId: number) {
    const appointment = await Appointment.findOne(appointmentId);
    return appointment;
  }
}
