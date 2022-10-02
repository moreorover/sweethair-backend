import { User } from '@prisma/client';
import prisma from '../prisma';

export interface CreateUserParams {
  fullName: string;
  email: string;
  password: string;
}

export const createUserAction = async (
  user: CreateUserParams
): Promise<User> => {
  return prisma.user.create({ data: user });
};

export interface UpdateUserParams {
  id: number;
  fullName: string;
  email: string;
  password: string;
}

export const updateUserAction = async (
  user: UpdateUserParams
): Promise<User> => {
  return prisma.user.update({ where: { id: user.id }, data: user });
};
