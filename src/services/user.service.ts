import { User } from '../entity/User';
import { AbstractService } from './abstract.service';
import argon2 = require('argon2');

export class UserService extends AbstractService<User> {
    public async create(data): Promise<any> {
        data.password = await argon2.hash(data.password);
        return this.repository.save({ ...data, role: { id: 2 } });
    }

    public async update(id: string | number, data): Promise<any> {
        const { role_id, ...body } = data;
        this.repository.update(id, { ...body, role: { id: data.role_id } });
        return super.findOne({ id: id }, ['role']);
    }
}
