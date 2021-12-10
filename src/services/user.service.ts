import { UserUpdateDto } from './../controllers/dtos/user/user-update.dto';
import { UserCreateDto } from './../controllers/dtos/user/user-create.dto';
import { User } from '../entity/User';
import { AbstractService } from './abstract.service';
import argon2 = require('argon2');

export class UserService extends AbstractService<User, UserCreateDto, UserUpdateDto> {
    public async create(data: UserCreateDto): Promise<User> {
        data.password = await argon2.hash(data.password);
        return this.repository.save({ ...data, role: { id: 2 } });
    }

    public async update(id: number, data: UserUpdateDto): Promise<User> {
        const { role_id, ...body } = data;
        this.repository.update(id, { ...body, role: { id: data.role_id } });
        return super.findOne({ id }, { relations: ['role'] });
    }
}
