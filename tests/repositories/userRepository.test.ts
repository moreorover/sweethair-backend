import {
  createUserAction,
  updateUserAction,
} from '../../src/repositories/userRepository';
import { prismaMock } from '../prismaMock';

test('should create new user ', async () => {
  const newDate = new Date();

  const user = {
    id: 1,
    fullName: 'Rich',
    email: 'hello@prisma.io',
    password: 'password',
    createdAt: newDate,
    updatedAt: newDate,
  };

  prismaMock.user.create.mockResolvedValue(user);

  await expect(createUserAction(user)).resolves.toEqual({
    id: 1,
    fullName: 'Rich',
    email: 'hello@prisma.io',
    password: 'password',
    createdAt: newDate,
    updatedAt: newDate,
  });
});

test('should update a users fullName and password', async () => {
  const newDate = new Date();

  const user = {
    id: 1,
    fullName: 'Rich Updated',
    email: 'hello@prisma.io',
    password: 'password updated',
    createdAt: newDate,
    updatedAt: newDate,
  };

  prismaMock.user.update.mockResolvedValue(user);

  await expect(updateUserAction(user)).resolves.toEqual({
    id: 1,
    fullName: 'Rich Updated',
    email: 'hello@prisma.io',
    password: 'password updated',
    createdAt: newDate,
    updatedAt: newDate,
  });
});
