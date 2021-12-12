import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entity/User';
import { UserService } from '../services/user.service';

export class SeedUser1638294163479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const admin = {
      firstName: 'Admin',
      lastName: 'Sweet',
      email: 'test@gmail.com',
      password: 'adminadmin',
      passwordConfirm: 'adminadmin',
      role_id: 1,
    };

    const service: UserService = new UserService(User);

    await service.create(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
