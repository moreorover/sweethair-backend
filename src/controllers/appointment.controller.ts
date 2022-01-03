import { Transaction } from './../entity/hair/Transaction';
import { TransactionService } from './../services/transaction.service';
import { Appointment } from './../entity/hair/Appointment';
import { plainToClass } from 'class-transformer';
import { AppointmentService } from '../services/appointment.service';
import { PaginateDto } from './dtos/common/paginate.dto';
import { Request, Response } from 'express';
import { AppointmentCreateDto } from './dtos/appointment/appointment-create.dto';
import { AppointmentUpdateDto } from './dtos/appointment/appointment-update.dto';
import { AppointmentSaveCustomersDto } from './dtos/appointment/appointment-save-customers.dto';
import { AppointmentCreateTransactionDto } from './dtos/appointment/appointment-create-transaction.dto';

export const all = async (req: Request, res: Response) => {
  const service: AppointmentService = new AppointmentService(Appointment);
  const results = await service.all({
    relations: ['customers', 'transactions', 'items'],
    order: { scheduledAt: 'ASC' },
  });
  return res.json(results);
};

export const paginate = async (req: Request, res: Response) => {
  const service: AppointmentService = new AppointmentService(Appointment);
  const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
  const result = await service.paginate(page, {
    relations: ['customers', 'transactions', 'items'],
    order: { scheduledAt: 'ASC' },
  });
  return res.send(result);
};

export const findById = async (req: Request, res: Response) => {
  const service: AppointmentService = new AppointmentService(Appointment);
  const appointment = await service.findOne(
    { id: parseInt(req.params.id) },
    { relations: ['customers', 'transactions', 'items'] }
  );

  return res.send(appointment);
};

export const create = async (req: Request, res: Response) => {
  const service: AppointmentService = new AppointmentService(Appointment);
  const body: AppointmentCreateDto = plainToClass(
    AppointmentCreateDto,
    req.body
  );
  const savedCustomer: Promise<Appointment> = await service.create(body);
  return res.send(savedCustomer);
};

export const update = async (req: Request, res: Response) => {
  const service: AppointmentService = new AppointmentService(Appointment);
  const body: AppointmentUpdateDto = plainToClass(
    AppointmentUpdateDto,
    req.body,
    { strategy: 'excludeAll' }
  );
  const updatedAppointment = await service.update(
    parseInt(req.params.id),
    body
  );

  return res.send(updatedAppointment);
};

export const deleteById = async (req: Request, res: Response) => {
  const service: AppointmentService = new AppointmentService(Appointment);
  return res.send(await service.delete(parseInt(req.params.id)));
};

export const addCustomers = async (req: Request, res: Response) => {
  const appointmentService: AppointmentService = new AppointmentService(
    Appointment
  );
  const body: AppointmentSaveCustomersDto = plainToClass(
    AppointmentSaveCustomersDto,
    req.body
  );

  try {
    const appointment = await appointmentService.findOne(
      { id: parseInt(req.params.id) },
      { relations: ['customers'] }
    );

    const customersIds: number[] = appointment.customers.map((c) => c.id);

    const css = body.customers.filter((c) => !customersIds.includes(c.id));

    if (!css.length) return res.status(404).send({ error: 'Already added' });

    await appointmentService.repository
      .createQueryBuilder('appointment')
      .relation(Appointment, 'customers')
      .of(appointment)
      .add(css);

    const { customers } = await appointmentService.findOne(
      { id: parseInt(req.params.id) },
      { relations: ['customers'] }
    );

    return res.send(customers);
  } catch (err) {
    return res.status(404).send({ error: 'Something went wrong updating' });
  }
};

export const addTransaction = async (req: Request, res: Response) => {
  const transactionService: TransactionService = new TransactionService(
    Transaction
  );

  const body: AppointmentCreateTransactionDto = plainToClass(
    AppointmentCreateTransactionDto,
    req.body
  );

  try {
    if (body.appointmentId !== parseInt(req.params.id))
      throw 'Appointment Ids do not match';

    if (!body.customerId) throw 'Customer Id not available';
    const savedTransaction = await transactionService.repository.save({
      ...body.transaction,
      customerId: body.customerId,
      appointmentId: body.appointmentId,
    });

    return res.send(savedTransaction);
  } catch (err) {
    return res
      .status(404)
      .send({ error: 'Something went wrong saving transaction' });
  }
};
