import { plainToClass } from 'class-transformer';
import { Customer } from '../entity/hair/Customer';
import { CustomerService } from '../services/customer.service';
import { PaginateDto } from './dtos/common/paginate.dto';
import { CustomerCreateDto } from './dtos/customer/customer-create.dto';
import { CustomerUpdateDto } from './dtos/customer/customer-update.dto';
import { Request, Response } from 'express';

export const all = async (req: Request, res: Response) => {
    const service: CustomerService = new CustomerService(Customer);
    const results = await service.all(['appointments', 'transactions', 'items'], { fullName: 'ASC' });
    return res.json(results);
};

export const paginate = async (req: Request, res: Response) => {
    const service: CustomerService = new CustomerService(Customer);
    const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
    const result = await service.paginate(page, ['appointments', 'transactions', 'items'], {}, { fullName: 'ASC' });
    return res.send(result);
};

export const findById = async (req: Request, res: Response) => {
    const service: CustomerService = new CustomerService(Customer);
    const results = await service.findOne({ id: req.params.id }, ['appointments', 'transactions', 'items']);
    return res.send(results);
};

export const create = async (req: Request, res: Response) => {
    const service: CustomerService = new CustomerService(Customer);
    const body: CustomerCreateDto = plainToClass(CustomerCreateDto, req.body);
    const savedCustomer = await service.create(body);
    return res.send(savedCustomer);
};

export const update = async (req: Request, res: Response) => {
    const service: CustomerService = new CustomerService(Customer);
    const body: CustomerUpdateDto = plainToClass(CustomerUpdateDto, req.body, { strategy: 'excludeAll' });
    await service.update(req.params.id, body);
    const savedCustomer = await service.findOne({ id: req.params.id }, ['appointments', 'transactions', 'items']);
    return res.send(savedCustomer);
};

export const deleteById = async (req: Request, res: Response) => {
    const service: CustomerService = new CustomerService(Customer);
    return res.send(await service.delete(req.params.id));
};
