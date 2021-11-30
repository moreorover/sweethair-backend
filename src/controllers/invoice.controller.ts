import { plainToClass } from 'class-transformer';
import { PaginateDto } from './dtos/common/paginate.dto';
import { Request, Response } from 'express';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../entity/hair/Invoice';
import { InvoiceCreateDto } from './dtos/invoice/invoice-create.dto';
import { InvoiceUpdateDto } from './dtos/invoice/invoice-update.dto';

const all = async (req: Request, res: Response) => {
    const service: InvoiceService = new InvoiceService(Invoice);
    const results = await service.all(['transactions', 'items'], { scheduledAt: 'ASC' });
    return res.json(results);
};

const paginate = async (req, res) => {
    const service: InvoiceService = new InvoiceService(Invoice);
    const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
    const result = await service.paginate(page, ['transactions', 'items'], {}, { scheduledAt: 'ASC' });
    return res.send(result);
};

const findById = async (req, res): Promise<Invoice[]> => {
    const service: InvoiceService = new InvoiceService(Invoice);
    const results = await service.findOne({ id: req.params.id }, ['transactions', 'items']);
    return res.send(results);
};

const create = async (req, res): Promise<Invoice> => {
    const service: InvoiceService = new InvoiceService(Invoice);
    const body: InvoiceCreateDto = plainToClass(InvoiceCreateDto, req.body);
    const savedInvoice = await service.create(body);
    return res.send(savedInvoice);
};

const update = async (req, res): Promise<Invoice> => {
    const service: InvoiceService = new InvoiceService(Invoice);
    const body: InvoiceUpdateDto = plainToClass(InvoiceUpdateDto, req.body, { strategy: 'excludeAll' });
    await service.update(req.params.id, body);
    const savedInvoice = await service.findOne({ id: req.params.id }, ['transactions', 'items']);
    return res.send(savedInvoice);
};

const deleteById = async (req, res): Promise<Boolean | object> => {
    const service: InvoiceService = new InvoiceService(Invoice);
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