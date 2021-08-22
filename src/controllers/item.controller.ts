import { plainToClass } from 'class-transformer';
import { Item } from '../entity/scraper/Item';
import { ItemService } from '../services/item.service';
import { PaginateDto } from './dtos/common/paginate.dto';

const all = async (req, res): Promise<Item[]> => {
    const service: ItemService = new ItemService(Item);
    const results = await service.all(['prices']);
    return res.send(results);
};

const paginate = async (req, res) => {
    const service: ItemService = new ItemService(Item);
    const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
    const result = await service.paginate(page, ['prices']);
    return res.send(result);
};

const paginateDeals = async (req, res) => {
    const service: ItemService = new ItemService(Item);
    const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
    const result = await service.paginate(page, ['prices'], { isDeal: true });
    return res.send(result);
};

const findById = async (req, res) => {
    const service: ItemService = new ItemService(Item);
    const results: Item = await service.findOne({ id: req.params.id }, ['prices']);
    res.json(results);
};

// const create = async (req, res): Promise<Item> => {
//     const service: ItemService = new ItemService(Item);
//     const body: ItemCreateDto = plainToClass(ItemCreateDto, req.body);
//     const savedItem = await service.create(body);
//     return res.send(savedItem);
// };

// const update = async (req, res): Promise<Item> => {
//     const service: ItemService = new ItemService(Item);
//     const body: ItemUpdateDto = plainToClass(ItemUpdateDto, req.body);
//     const savedItem = await service.update(req.params.id, body);
//     let { password, ...data } = savedItem;
//     return res.send(data);
// };

// const deleteById = async (req, res): Promise<Boolean | object> => {
//     const service: ItemService = new ItemService(Item);
//     return res.send(await service.delete(req.params.id));
// };

module.exports = {
    all,
    paginate,
    paginateDeals,
    // create,
    findById
    // update,
    // deleteById
};
