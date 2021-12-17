import {
  AppointmentCreate,
  AppointmentCustomersUpdate,
} from './types/appointment.types';
import { Appointment } from './../entity/hair/Appointment';
import { AppointmentService } from './../services/appointment.service';
import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { getConnection } from 'typeorm';

@Resolver(Appointment)
export class AppointmentResolver {
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

  @Mutation(() => Appointment)
  async updateAppointmentCustomers(
    @Arg('appointmentId') appointmentId: number,
    @Arg('customers') customers: AppointmentCustomersUpdate
  ): Promise<Appointment> {
    const result = await getConnection()
      .getRepository(Appointment)
      .save({ id: appointmentId });
    return result;
  }
}
