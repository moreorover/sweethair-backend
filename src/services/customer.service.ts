import { CustomerUpdateDto } from './../controllers/dtos/customer/customer-update.dto';
import { CustomerCreateDto } from './../controllers/dtos/customer/customer-create.dto';
import { Customer } from '../entity/hair/Customer';
import { AbstractService } from './abstract.service';

export class CustomerService extends AbstractService<Customer, CustomerCreateDto, CustomerUpdateDto> {}
