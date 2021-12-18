import {
  AppointmentCreate,
  AppointmentUpdate,
} from './types/appointment.types';
import { Appointment } from './../entity/hair/Appointment';
import { AppointmentService } from './../services/appointment.service';
import { Resolver, Query, Arg, Mutation, Int } from 'type-graphql';
import { getConnection } from 'typeorm';

@Resolver(Appointment)
export class AppointmentResolver {
  @Query(() => [Appointment])
  // @UseMiddleware(isAuth)
  appointments(): Promise<Appointment[]> {
    const service: AppointmentService = new AppointmentService(Appointment);
    return service.all();
  }

  @Query(() => Appointment, { nullable: true })
  async appointment(
    @Arg('appointmentId', (type) => Int) appointmentId: number
  ): Promise<Appointment | undefined> {
    const appointment = await Appointment.findOne(appointmentId);
    return appointment;
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Arg('appointment') appointment: AppointmentCreate
  ): Promise<Appointment> {
    return Appointment.create(appointment).save();
  }

  @Mutation(() => Appointment)
  async updateAppointment(
    @Arg('appointment') appointment: AppointmentUpdate
  ): Promise<Appointment> {
    const result = await getConnection()
      .getRepository(Appointment)
      .save(appointment);
    return result;
  }

  @Mutation(() => Appointment)
  async addCustomerToAppointment(
    @Arg('appointmentId') appointmentId: number,
    @Arg('customerId') customerId: number
  ): Promise<Appointment> {
    await getConnection()
      .createQueryBuilder()
      .relation(Appointment, 'customers')
      .of(appointmentId)
      .add(customerId);

    const result = await getConnection()
      .getRepository(Appointment)
      .createQueryBuilder('appointment')
      .where('appointment.id = :id', { id: appointmentId })
      .getOne();
    return result;
  }

  @Mutation(() => Appointment)
  async removeCustomerToAppointment(
    @Arg('appointmentId') appointmentId: number,
    @Arg('customerId') customerId: number
  ): Promise<Appointment> {
    const appointment: Appointment = await getConnection()
      .getRepository(Appointment)
      .findOne(appointmentId, { relations: ['items', 'transactions'] });

    const canRemoveCustomer: boolean =
      appointment.items.filter((i) => i.customerId === customerId).length ==
        0 &&
      appointment.transactions.filter((i) => i.customerId === customerId)
        .length == 0;

    if (canRemoveCustomer) {
      await getConnection()
        .createQueryBuilder()
        .relation(Appointment, 'customers')
        .of(appointmentId)
        .remove(customerId);
    }

    const result = await getConnection()
      .getRepository(Appointment)
      .createQueryBuilder('appointment')
      .where('appointment.id = :id', { id: appointmentId })
      .getOne();
    return result;
  }
}
