import { plainToClass } from 'class-transformer';
import { Customer } from '../entity/hair/Customer';
import { CustomerService } from '../services/customer.service';
import { PaginateDto } from './dtos/common/paginate.dto';
import { CustomerCreateDto } from './dtos/customer/customer-create.dto';
import { CustomerUpdateDto } from './dtos/customer/customer-update.dto';
import { Request, Response } from 'express';

const all = async (req: Request, res: Response) => {
    const service: CustomerService = new CustomerService(Customer);
    const results = await service.all(['appointments', 'transactions'], { firstName: 'ASC' });
    return res.json(results);
};

const paginate = async (req, res) => {
    const service: CustomerService = new CustomerService(Customer);
    const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
    const result = await service.paginate(page, ['appointments', 'transactions'], {}, { firstName: 'ASC' });
    return res.send(result);
};

const findById = async (req, res): Promise<Customer[]> => {
    const service: CustomerService = new CustomerService(Customer);
    const results = await service.findOne({ id: req.params.id }, ['appointments', 'transactions']);
    return res.send(results);
};

const create = async (req, res): Promise<Customer> => {
    const service: CustomerService = new CustomerService(Customer);
    const body: CustomerCreateDto = plainToClass(CustomerCreateDto, req.body);
    const savedCustomer = await service.create(body);
    return res.send(savedCustomer);
};

const update = async (req, res): Promise<Customer> => {
    const service: CustomerService = new CustomerService(Customer);
    const body: CustomerUpdateDto = plainToClass(CustomerUpdateDto, req.body, { strategy: 'excludeAll' });
    await service.update(req.params.id, body);
    const savedCustomer = await service.findOne({ id: req.params.id }, ['appointments', 'transactions']);
    return res.send(savedCustomer);
};

const deleteById = async (req, res): Promise<Boolean | object> => {
    const service: CustomerService = new CustomerService(Customer);
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
