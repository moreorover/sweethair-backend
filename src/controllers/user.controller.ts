import { plainToClass } from 'class-transformer';
import { User } from '../entity/User';
import { UserService } from '../services/user.service';
import { PaginateDto } from './dtos/common/paginate.dto';
import { UserUpdateDto } from './dtos/user/user-update.dto';

const all = async (req, res): Promise<User[]> => {
    const service: UserService = new UserService(User);
    const results = await service.all(['role']);
    return res.send(results);
};

const paginate = async (req, res) => {
    const service: UserService = new UserService(User);
    const { page }: PaginateDto = plainToClass(PaginateDto, req.body);
    const result = await service.paginate(page, ['role']);
    return res.send(result);
};

const findById = async (req, res) => {
    const service: UserService = new UserService(User);
    const results: User = await service.findOne({ id: req.params.id }, ['role']);
    let { password, ...data } = results;
    res.json(data);
};

// const create = async (req, res): Promise<User> => {
//     const service: UserService = new UserService(User);
//     const body: UserCreateDto = plainToClass(UserCreateDto, req.body);
//     const savedUser = await service.create(body);
//     return res.send(savedUser);
// };

const update = async (req, res): Promise<User> => {
    const service: UserService = new UserService(User);
    const body: UserUpdateDto = plainToClass(UserUpdateDto, req.body);
    const savedUser = await service.update(req.params.id, body);
    let { password, ...data } = savedUser;
    return res.send(data);
};

const deleteById = async (req, res): Promise<Boolean | object> => {
    const service: UserService = new UserService(User);
    return res.send(await service.delete(req.params.id));
};

module.exports = {
    all,
    paginate,
    // create,
    findById,
    update,
    deleteById
};
