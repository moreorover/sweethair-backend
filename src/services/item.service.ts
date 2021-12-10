import { ItemUpdateDto } from './../controllers/dtos/item/item-update.dto';
import { ItemCreateDto } from './../controllers/dtos/item/item-create.dto';
import { Item } from '../entity/hair/Item';
import { AbstractService } from './abstract.service';

export class ItemService extends AbstractService<Item, ItemCreateDto, ItemUpdateDto> {}
