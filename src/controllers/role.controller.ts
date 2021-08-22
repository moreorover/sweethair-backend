import { plainToClass } from 'class-transformer';
import { Role } from '../entity/Role';
import { RoleService } from '../services/role.service';
import { PaginateDto } from './dtos/common/paginate.dto';
import { RoleCreateDto } from './dtos/role/role-create.dto';
import { RoleUpdateDto } from './dtos/role/role-update.dto';

const all = async (req, res): Promise<Role[]> => {
    const service: RoleService = new RoleService(Role);
    const results = await service.all();
    return res.send(results);
};

const paginate = async (req, res) => {
    const service: RoleService = new RoleService(Role);
    const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
    const result = await service.paginate(page);
    return res.send(result);
};

const findById = async (req, res): Promise<Role[]> => {
    const service: RoleService = new RoleService(Role);
    const results = await service.findOne({ id: req.params.id });
    return res.send(results);
};

const create = async (req, res): Promise<Role> => {
    const service: RoleService = new RoleService(Role);
    const body: RoleCreateDto = plainToClass(RoleCreateDto, req.body);
    const savedRole = await service.create(body);
    return res.send(savedRole);
};

const update = async (req, res): Promise<Role> => {
    const service: RoleService = new RoleService(Role);
    const body: RoleUpdateDto = plainToClass(RoleUpdateDto, req.body);
    const savedRole = await service.update(req.params.id, body);
    return res.send(savedRole);
};

const deleteById = async (req, res): Promise<Boolean | object> => {
    const service: RoleService = new RoleService(Role);
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
