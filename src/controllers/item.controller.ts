import { plainToClass } from 'class-transformer';
import { PaginateDto } from './dtos/common/paginate.dto';
import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';
import { Item } from '../entity/hair/Item';
import { ItemCreateDto } from './dtos/item/item-create.dto';
import { ItemUpdateDto } from './dtos/item/item-update.dto';

export const all = async (req: Request, res: Response) => {
  const service: ItemService = new ItemService(Item);
  const results = await service.all({
    relations: ['invoice', 'customer', 'appointment'],
    order: { id: 'ASC' },
  });
  return res.json(results);
};

export const allAvailable = async (req: Request, res: Response) => {
  const service: ItemService = new ItemService(Item);
  const results = await service.all({
    where: { customerId: null },
  });
  return res.json(results);
};

export const paginate = async (req: Request, res: Response) => {
  const service: ItemService = new ItemService(Item);
  const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
  const result = await service.paginate(page, {
    relations: ['invoice', 'customer', 'appointment'],
    order: { id: 'ASC' },
  });
  return res.send(result);
};

export const findById = async (req: Request, res: Response) => {
  const service: ItemService = new ItemService(Item);
  const results = await service.findOne(
    { id: parseInt(req.params.id) },
    { relations: ['invoice', 'customer', 'appointment'] }
  );
  return res.send(results);
};

export const create = async (req: Request, res: Response) => {
  const service: ItemService = new ItemService(Item);
  const body: ItemCreateDto = plainToClass(ItemCreateDto, req.body);
  const savedItem = await service.create(body);
  return res.send(savedItem);
};

export const update = async (req: Request, res: Response) => {
  const service: ItemService = new ItemService(Item);
  const body: ItemUpdateDto = plainToClass(ItemUpdateDto, req.body, {
    strategy: 'excludeAll',
  });
  await service.update(parseInt(req.params.id), body);
  const savedItem = await service.findOne(
    { id: parseInt(req.params.id) },
    { relations: ['invoice', 'customer', 'appointment'] }
  );
  return res.send(savedItem);
};

export const deleteById = async (req: Request, res: Response) => {
  const service: ItemService = new ItemService(Item);
  return res.send(await service.delete(parseInt(req.params.id)));
};
