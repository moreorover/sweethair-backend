import { plainToClass } from 'class-transformer';
import { PaginateDto } from './dtos/common/paginate.dto';
import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';
import { Item } from '../entity/hair/Item';
import { ItemCreateDto } from './dtos/item/item-create.dto';
import { ItemUpdateDto } from './dtos/item/item-update.dto';

export const all = async (req: Request, res: Response) => {
    const service: ItemService = new ItemService(Item);
    const results = await service.all(['invoice', 'customer', 'appointment'], { id: 'ASC' });
    return res.json(results);
};

export const paginate = async (req: Request, res: Response) => {
    const service: ItemService = new ItemService(Item);
    const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
    const result = await service.paginate(page, ['invoice', 'customer', 'appointment'], {}, { id: 'ASC' });
    return res.send(result);
};

export const findById = async (req: Request, res: Response) => {
    const service: ItemService = new ItemService(Item);
    const results = await service.findOne({ id: req.params.id }, ['invoice', 'customer', 'appointment']);
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
    const body: ItemUpdateDto = plainToClass(ItemUpdateDto, req.body, { strategy: 'excludeAll' });
    await service.update(req.params.id, body);
    const savedItem = await service.findOne({ id: req.params.id }, ['invoice', 'customer', 'appointment']);
    return res.send(savedItem);
};

export const deleteById = async (req: Request, res: Response) => {
    const service: ItemService = new ItemService(Item);
    return res.send(await service.delete(req.params.id));
};
