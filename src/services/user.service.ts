import { UserCreateDto } from './../controllers/dtos/user/user-create.dto';
import { User } from '../entity/User';
import { AbstractService } from './abstract.service';
import argon2 = require('argon2');

export class UserService extends AbstractService<User, UserCreateDto> {
  public async create(data: UserCreateDto): Promise<User> {
    data.password = await argon2.hash(data.password);
    return this.repository.save({ ...data, role: { id: 2 } });
  }
}
