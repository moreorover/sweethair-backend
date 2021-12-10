import { Appointment } from './../entity/hair/Appointment';
import { plainToClass } from 'class-transformer';
import { AppointmentService } from '../services/appointment.service';
import { PaginateDto } from './dtos/common/paginate.dto';
import { Request, Response } from 'express';
import { AppointmentCreateDto } from './dtos/appointment/appointment-create.dto';
import { AppointmentUpdateDto } from './dtos/appointment/appointment-update.dto';

export const all = async (req: Request, res: Response) => {
    const service: AppointmentService = new AppointmentService(Appointment);
    const results = await service.all({ relations: ['customers', 'transactions', 'items'], order: { scheduledAt: 'ASC' } });
    return res.json(results);
};

export const paginate = async (req: Request, res: Response) => {
    const service: AppointmentService = new AppointmentService(Appointment);
    const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
    const result = await service.paginate(page, { relations: ['customers', 'transactions', 'items'], order: { scheduledAt: 'ASC' } });
    return res.send(result);
};

export const findById = async (req: Request, res: Response) => {
    const service: AppointmentService = new AppointmentService(Appointment);
    const results = await service.findOne({ id: parseInt(req.params.id) }, { relations: ['customers', 'transactions', 'items'] });
    return res.send(results);
};

export const create = async (req: Request, res: Response) => {
    const service: AppointmentService = new AppointmentService(Appointment);
    const body: AppointmentCreateDto = plainToClass(AppointmentCreateDto, req.body);
    const savedCustomer: Promise<Appointment> = await service.create(body);
    return res.send(savedCustomer);
};

export const update = async (req: Request, res: Response) => {
    const service: AppointmentService = new AppointmentService(Appointment);
    const body: AppointmentUpdateDto = plainToClass(AppointmentUpdateDto, req.body, { strategy: 'excludeAll' });
    await service.update(parseInt(req.params.id), body);
    const savedCustomer = await service.findOne({ id: parseInt(req.params.id) }, { relations: ['customers', 'transactions', 'items'] });
    return res.send(savedCustomer);
};

export const deleteById = async (req: Request, res: Response) => {
    const service: AppointmentService = new AppointmentService(Appointment);
    return res.send(await service.delete(parseInt(req.params.id)));
};
