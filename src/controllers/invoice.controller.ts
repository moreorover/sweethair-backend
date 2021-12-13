import { plainToClass } from 'class-transformer';
import { PaginateDto } from './dtos/common/paginate.dto';
import { Request, Response } from 'express';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../entity/hair/Invoice';
import { InvoiceCreateDto } from './dtos/invoice/invoice-create.dto';
import { InvoiceUpdateDto } from './dtos/invoice/invoice-update.dto';

export const all = async (req: Request, res: Response) => {
  const service: InvoiceService = new InvoiceService(Invoice);
  const results = await service.all({
    relations: ['transactions', 'items'],
    order: { scheduledAt: 'ASC' },
  });
  return res.json(results);
};

export const paginate = async (req: Request, res: Response) => {
  const service: InvoiceService = new InvoiceService(Invoice);
  const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
  const result = await service.paginate(page, {
    relations: ['transactions', 'items'],
    order: { scheduledAt: 'ASC' },
  });
  return res.send(result);
};

export const findById = async (req: Request, res: Response) => {
  const service: InvoiceService = new InvoiceService(Invoice);
  const results = await service.findOne(
    { id: parseInt(req.params.id) },
    { relations: ['transactions', 'items'] }
  );
  return res.send(results);
};

export const create = async (req: Request, res: Response) => {
  const service: InvoiceService = new InvoiceService(Invoice);
  const body: InvoiceCreateDto = plainToClass(InvoiceCreateDto, req.body);
  const savedInvoice = await service.create(body);
  return res.send(savedInvoice);
};

export const update = async (req: Request, res: Response) => {
  const service: InvoiceService = new InvoiceService(Invoice);
  const body: InvoiceUpdateDto = plainToClass(InvoiceUpdateDto, req.body, {
    strategy: 'excludeAll',
  });
  await service.update(parseInt(req.params.id), body);
  const savedInvoice = await service.findOne(
    { id: parseInt(req.params.id) },
    { relations: ['transactions', 'items'] }
  );
  return res.send(savedInvoice);
};

export const deleteById = async (req: Request, res: Response) => {
  const service: InvoiceService = new InvoiceService(Invoice);
  return res.send(await service.delete(parseInt(req.params.id)));
};
