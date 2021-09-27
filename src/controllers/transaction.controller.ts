import { TransactionService } from './../services/transaction.service';
import { Transaction } from './../entity/hair/Transaction';
import { plainToClass } from 'class-transformer';
import { PaginateDto } from './dtos/common/paginate.dto';
import { Request, Response } from 'express';
import { TransactionCreateDto } from './dtos/transaction/transaction-create.dto';
import { TransactionUpdateDto } from './dtos/transaction/transaction-update.dto';

const all = async (req: Request, res: Response) => {
    const service: TransactionService = new TransactionService(Transaction);
    const results = await service.all(['customer', 'appointment'], { date: 'DESC' });
    return res.json(results);
};

const paginate = async (req, res) => {
    const service: TransactionService = new TransactionService(Transaction);
    const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
    const result = await service.paginate(page, ['customer', 'appointment'], {}, { date: 'DESC' });
    return res.send(result);
};

const findById = async (req, res): Promise<Transaction[]> => {
    const service: TransactionService = new TransactionService(Transaction);
    const results = await service.findOne({ id: req.params.id }, ['customer', 'appointment']);
    return res.send(results);
};

const create = async (req, res): Promise<Transaction> => {
    const service: TransactionService = new TransactionService(Transaction);
    const body: TransactionCreateDto = plainToClass(TransactionCreateDto, req.body);
    const savedCustomer = await service.create(body);
    return res.send(savedCustomer);
};

const update = async (req, res): Promise<Transaction> => {
    const service: TransactionService = new TransactionService(Transaction);
    const body: TransactionUpdateDto = plainToClass(TransactionUpdateDto, req.body, { strategy: 'excludeAll' });
    const savedCustomer = await service.update(req.params.id, body);
    return res.send(savedCustomer);
};

const deleteById = async (req, res): Promise<Boolean | object> => {
    const service: TransactionService = new TransactionService(Transaction);
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
