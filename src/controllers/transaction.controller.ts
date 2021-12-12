import { TransactionService } from './../services/transaction.service';
import { Transaction } from './../entity/hair/Transaction';
import { plainToClass } from 'class-transformer';
import { PaginateDto } from './dtos/common/paginate.dto';
import { Request, Response } from 'express';
import { TransactionCreateDto } from './dtos/transaction/transaction-create.dto';
import { TransactionUpdateDto } from './dtos/transaction/transaction-update.dto';

export const all = async (req: Request, res: Response) => {
  const service: TransactionService = new TransactionService(Transaction);
  const results = await service.all({
    relations: ['customer', 'appointment', 'invoice'],
    order: { scheduledAt: 'ASC' },
  });
  return res.json(results);
};

export const paginate = async (req: Request, res: Response) => {
  const service: TransactionService = new TransactionService(Transaction);
  const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
  const result = await service.paginate(page, {
    relations: ['customer', 'appointment', 'invoice'],
    order: { scheduledAt: 'ASC' },
  });
  return res.send(result);
};

export const findById = async (req: Request, res: Response) => {
  const service: TransactionService = new TransactionService(Transaction);
  const results = await service.findOne({ id: parseInt(req.params.id) });
  return res.send(results);
};

export const create = async (req: Request, res: Response) => {
  const service: TransactionService = new TransactionService(Transaction);
  const body: TransactionCreateDto = plainToClass(
    TransactionCreateDto,
    req.body,
  );
  const saved = await service.create(body);
  const savedTransaction = await service.findOne(saved.id, {
    relations: ['customer', 'appointment', 'invoice'],
  });
  return res.send(savedTransaction);
};

export const update = async (req: Request, res: Response) => {
  const service: TransactionService = new TransactionService(Transaction);
  const body: TransactionUpdateDto = plainToClass(
    TransactionUpdateDto,
    req.body,
    { strategy: 'excludeAll' },
  );
  await service.update(parseInt(req.params.id), body);
  const savedTransaction = await service.findOne(
    { id: parseInt(req.params.id) },
    { relations: ['customer', 'appointment', 'invoice'] },
  );
  return res.send(savedTransaction);
};

export const deleteById = async (req: Request, res: Response) => {
  const service: TransactionService = new TransactionService(Transaction);
  return res.send(await service.delete(parseInt(req.params.id)));
};
