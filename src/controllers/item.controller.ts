import { plainToClass } from 'class-transformer';
import { PaginateDto } from './dtos/common/paginate.dto';
import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';
import { Item } from '../entity/hair/Item';
import { ItemCreateDto } from './dtos/item/item-create.dto';
import { ItemUpdateDto } from './dtos/item/item-update.dto';

const all = async (req: Request, res: Response) => {
    const service: ItemService = new ItemService(Item);
    const results = await service.all(['invoices', 'customer', 'appointment'], { title: 'ASC' });
    return res.json(results);
};

const paginate = async (req, res) => {
    const service: ItemService = new ItemService(Item);
    const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
    const result = await service.paginate(page, ['invoices', 'customer', 'appointment'], {}, { title: 'ASC' });
    return res.send(result);
};

const findById = async (req, res): Promise<Item[]> => {
    const service: ItemService = new ItemService(Item);
    const results = await service.findOne({ id: req.params.id }, ['invoices', 'customer', 'appointment']);
    return res.send(results);
};

const create = async (req, res): Promise<Item> => {
    const service: ItemService = new ItemService(Item);
    const body: ItemCreateDto = plainToClass(ItemCreateDto, req.body);
    const savedItem = await service.create(body);
    return res.send(savedItem);
};

const update = async (req, res): Promise<Item> => {
    const service: ItemService = new ItemService(Item);
    const body: ItemUpdateDto = plainToClass(ItemUpdateDto, req.body, { strategy: 'excludeAll' });
    await service.update(req.params.id, body);
    const savedItem = await service.findOne({ id: req.params.id }, ['invoices', 'customer', 'appointment']);
    return res.send(savedItem);
};

const deleteById = async (req, res): Promise<Boolean | object> => {
    const service: ItemService = new ItemService(Item);
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
