import {
  AppointmentCreate,
} from './types/appointment.types';
import { Customer } from './../entity/hair/Customer';
import { Item } from './../entity/hair/Item';
import { Transaction } from './../entity/hair/Transaction';
import { Appointment } from './../entity/hair/Appointment';
import { AppointmentService } from './../services/appointment.service';
import {
  Resolver,
  Query,
  Ctx,
  FieldResolver,
  Root,
  Arg,
  Mutation,
} from 'type-graphql';
import { MyContext } from '../types';
import { getConnection } from 'typeorm';

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
  // @UseMiddleware(isAuth)
  appointments() {
    const service: AppointmentService = new AppointmentService(Appointment);
    return service.all();
  }

  @Query(() => Appointment)
  async appointment(@Arg('appointmentId') appointmentId: number) {
    const appointment = await Appointment.findOne(appointmentId);
    return appointment;
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Arg('input') input: AppointmentCreate
  ): Promise<Appointment> {
    return Appointment.create(input).save();
  }

  @Mutation(() => Appointment)
  async updateAppointment(
    @Arg('appointmentId') appointmentId: number,
    @Arg('scheduledAt') scheduledAt: Date,
    @Arg('title') title: string
  ): Promise<Appointment> {
    const result = await getConnection()
      .getRepository(Appointment)
      .save({ id: appointmentId, title, scheduledAt });
    return result;
  }

}
