import {
  createUserAction,
  updateUserAction,
} from '../../../src/repositories/userRepository';
import { prismaMock } from '../../prismaMock';

describe('createUserAction() - unit', () => {
  it('creates new user correctly', async () => {
    const user = {
      id: 1,
      fullName: 'Rich',
      email: 'hello@prisma.io',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.user.create.mockResolvedValue(user);

    const createdUser = expect(createUserAction(user)).resolves;

    createdUser.toHaveProperty('id', user.id);
    createdUser.toHaveProperty('fullName', user.fullName);
    createdUser.toHaveProperty('email', user.email);
    createdUser.toHaveProperty('password', user.password);
    createdUser.toHaveProperty('createdAt');
    createdUser.toHaveProperty('updatedAt');
  });
});

describe('updateUserAction() - unit', () => {
  it('updates user fullName and password', async () => {
    const user = {
      id: 1,
      fullName: 'Rich Updated',
      email: 'hello@prisma.io',
      password: 'password updated',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.user.update.mockResolvedValue(user);

    const updatedUser = expect(updateUserAction(user)).resolves;

    updatedUser.toHaveProperty('id', user.id);
    updatedUser.toHaveProperty('fullName', user.fullName);
    updatedUser.toHaveProperty('email', user.email);
    updatedUser.toHaveProperty('password', user.password);
    updatedUser.toHaveProperty('createdAt');
    updatedUser.toHaveProperty('updatedAt');
  });
});
