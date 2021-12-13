import { Appointment } from './../entity/hair/Appointment';
import { plainToClass } from 'class-transformer';
import { AppointmentService } from '../services/appointment.service';
import { PaginateDto } from './dtos/common/paginate.dto';
import { Request, Response } from 'express';
import { AppointmentCreateDto } from './dtos/appointment/appointment-create.dto';
import { AppointmentUpdateDto } from './dtos/appointment/appointment-update.dto';
import { AppointmentSaveCustomersDto } from './dtos/appointment/appointment-save-customers.dto';

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
  const results = await service.findOne({ id: parseInt(req.params.id) });
  return res.send(results);
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
  await service.update(parseInt(req.params.id), body);
  const savedCustomer = await service.findOne(
    { id: parseInt(req.params.id) },
    { relations: ['customers', 'transactions', 'items'] }
  );
  return res.send(savedCustomer);
};

export const deleteById = async (req: Request, res: Response) => {
  const service: AppointmentService = new AppointmentService(Appointment);
  return res.send(await service.delete(parseInt(req.params.id)));
};

export const fetchTransactions = async (req: Request, res: Response) => {
  const service: AppointmentService = new AppointmentService(Appointment);
  const { transactions } = await service.findOne(
    { id: parseInt(req.params.id) },
    { relations: ['transactions', 'transactions.customer'] }
  );
  const t = transactions.map((t) => {
    return { ...t, customer: { id: t.customer?.id || null } };
  });
  return res.send(t);
};

export const fetchCustomers = async (req: Request, res: Response) => {
  const service: AppointmentService = new AppointmentService(Appointment);
  const { customers } = await service.findOne(
    { id: parseInt(req.params.id) },
    { relations: ['customers'] }
  );
  return res.send(customers);
};

export const fetchItems = async (req: Request, res: Response) => {
  const service: AppointmentService = new AppointmentService(Appointment);
  const { items } = await service.findOne(
    { id: parseInt(req.params.id) },
    { relations: ['items', 'items.customer'] }
  );
  const i = items.map((i) => {
    return { ...i, customer: { id: i.customer?.id || null } };
  });
  return res.send(i);
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
