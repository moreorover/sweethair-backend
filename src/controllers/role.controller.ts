import { plainToClass } from 'class-transformer';
import { Role } from '../entity/Role';
import { RoleService } from '../services/role.service';
import { PaginateDto } from './dtos/common/paginate.dto';
import { RoleCreateDto } from './dtos/role/role-create.dto';
import { RoleUpdateDto } from './dtos/role/role-update.dto';
import { Request, Response } from 'express';

export const all = async (req: Request, res: Response) => {
  const service: RoleService = new RoleService(Role);
  const results = await service.all({});
  return res.send(results);
};

export const paginate = async (req: Request, res: Response) => {
  const service: RoleService = new RoleService(Role);
  const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
  const result = await service.paginate(page);
  return res.send(result);
};

export const findById = async (req: Request, res: Response) => {
  const service: RoleService = new RoleService(Role);
  const results = await service.findOne({ id: parseInt(req.params.id) });
  return res.send(results);
};

export const create = async (req: Request, res: Response) => {
  const service: RoleService = new RoleService(Role);
  const body: RoleCreateDto = plainToClass(RoleCreateDto, req.body);
  const savedRole = await service.create(body);
  return res.send(savedRole);
};

export const update = async (req: Request, res: Response) => {
  const service: RoleService = new RoleService(Role);
  const body: RoleUpdateDto = plainToClass(RoleUpdateDto, req.body);
  const savedRole = await service.update(parseInt(req.params.id), body);
  return res.send(savedRole);
};

export const deleteById = async (req: Request, res: Response) => {
  const service: RoleService = new RoleService(Role);
  return res.send(await service.delete(parseInt(req.params.id)));
};
