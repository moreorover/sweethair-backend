import { plainToClass } from 'class-transformer';
import { Customer } from '../entity/hair/Customer';
import { CustomerService } from '../services/customer.service';
import { PaginateDto } from './dtos/common/paginate.dto';
import { CustomerCreateDto } from './dtos/customer/customer-create.dto';
import { CustomerUpdateDto } from './dtos/customer/customer-update.dto';

const all = async (req, res): Promise<Customer[]> => {
    const service: CustomerService = new CustomerService(Customer);
    const results = await service.all();
    return res.send(results);
};

const paginate = async (req, res) => {
    const service: CustomerService = new CustomerService(Customer);
    const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
    const result = await service.paginate(page);
    return res.send(result);
};

const findById = async (req, res): Promise<Customer[]> => {
    const service: CustomerService = new CustomerService(Customer);
    const results = await service.findOne({ id: req.params.id });
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
    const body: CustomerUpdateDto = plainToClass(CustomerUpdateDto, req.body);
    const savedCustomer = await service.update(req.params.id, body);
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
