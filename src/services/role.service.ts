import { RoleUpdateDto } from './../controllers/dtos/role/role-update.dto';
import { RoleCreateDto } from './../controllers/dtos/role/role-create.dto';
import { Role } from '../entity/Role';
import { AbstractService } from './abstract.service';

export class RoleService extends AbstractService<Role, RoleCreateDto, RoleUpdateDto> {}
