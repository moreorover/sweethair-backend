import { InvoiceCreateDto } from './../controllers/dtos/invoice/invoice-create.dto';
import { Invoice } from './../entity/hair/Invoice';
import { AbstractService } from './abstract.service';

export class InvoiceService extends AbstractService<
  Invoice,
  InvoiceCreateDto
> {}
