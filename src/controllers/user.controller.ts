import { plainToClass } from 'class-transformer';
import { User } from '../entity/User';
import { UserService } from '../services/user.service';
import { PaginateDto } from './dtos/common/paginate.dto';
import { UserUpdateDto } from './dtos/user/user-update.dto';
import { Request, Response } from 'express';

export const all = async (req: Request, res: Response) => {
    const service: UserService = new UserService(User);
    const results = await service.all({ relations: ['role'] });
    return res.send(results);
};

export const paginate = async (req: Request, res: Response) => {
    const service: UserService = new UserService(User);
    const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
    const result = await service.paginate(page, { relations: ['role'] });
    return res.send(result);
};

export const findById = async (req: Request, res: Response) => {
    const service: UserService = new UserService(User);
    const results: User = await service.findOne({ id: parseInt(req.params.id) }, { relations: ['role'] });
    let { password, ...data } = results;
    res.json(data);
};

// export const create = async (req: Request, res: Response) => {
//     const service: UserService = new UserService(User);
//     const body: UserCreateDto = plainToClass(UserCreateDto, req.body);
//     const savedUser = await service.create(body);
//     return res.send(savedUser);
// };

export const update = async (req: Request, res: Response) => {
    const service: UserService = new UserService(User);
    const body: UserUpdateDto = plainToClass(UserUpdateDto, req.body);
    const savedUser = await service.update(parseInt(req.params.id), body);
    return res.send(savedUser);
};

export const deleteById = async (req: Request, res: Response) => {
    const service: UserService = new UserService(User);
    return res.send(await service.delete(parseInt(req.params.id)));
};
