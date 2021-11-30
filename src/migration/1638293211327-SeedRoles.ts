import { MigrationInterface, QueryRunner } from 'typeorm';
import { Role } from '../entity/Role';
import { RoleService } from '../services/role.service';

export class SeedRoles1638293211327 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const admin = { id: 1, name: 'Admin' };
        const user = { id: 2, name: 'User' };

        const service: RoleService = new RoleService(Role);

        await service.create(admin);
        await service.create(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
