import { Appointment } from './../entity/hair/Appointment';
import { plainToClass } from 'class-transformer';
import { AppointmentService } from '../services/appointment.service';
import { PaginateDto } from './dtos/common/paginate.dto';
import { Request, Response } from 'express';
import { AppointmentCreateDto } from './dtos/appointment/appointment-create.dto';
import { AppointmentUpdateDto } from './dtos/appointment/appointment-update.dto';

const all = async (req: Request, res: Response) => {
    const service: AppointmentService = new AppointmentService(Appointment);
    const results = await service.all(['customers', 'transactions', 'items'], { scheduledAt: 'ASC' });
    return res.json(results);
};

const paginate = async (req, res) => {
    const service: AppointmentService = new AppointmentService(Appointment);
    const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
    const result = await service.paginate(page, ['customers', 'transactions', 'items'], {}, { scheduledAt: 'ASC' });
    return res.send(result);
};

const findById = async (req, res): Promise<Appointment[]> => {
    const service: AppointmentService = new AppointmentService(Appointment);
    const results = await service.findOne({ id: req.params.id }, ['customers', 'transactions', 'items']);
    return res.send(results);
};

const create = async (req, res): Promise<Appointment> => {
    const service: AppointmentService = new AppointmentService(Appointment);
    const body: AppointmentCreateDto = plainToClass(AppointmentCreateDto, req.body);
    const savedCustomer = await service.create(body);
    return res.send(savedCustomer);
};

const update = async (req, res): Promise<Appointment> => {
    const service: AppointmentService = new AppointmentService(Appointment);
    const body: AppointmentUpdateDto = plainToClass(AppointmentUpdateDto, req.body, { strategy: 'excludeAll' });
    await service.update(req.params.id, body);
    const savedCustomer = await service.findOne({ id: req.params.id }, ['customers', 'transactions', 'items']);
    return res.send(savedCustomer);
};

const deleteById = async (req, res): Promise<Boolean | object> => {
    const service: AppointmentService = new AppointmentService(Appointment);
    return res.send(await service.delete(req.params.id));
};

module.exports = {
    all,
    paginate,
    create,
    findById,
    update,
    deleteById
};
