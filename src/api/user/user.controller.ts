import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import { UserUpdateDto } from '../auth/user.dto';

export const all = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return res.send(users);
};

export const findById = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
    select: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.json(user);
};

export const update = async (req: Request, res: Response) => {
  const body: UserUpdateDto = plainToClass(UserUpdateDto, req.body);

  const user = await prisma.user.update({
    where: { id: parseInt(req.params.id) },
    data: { ...body },
    select: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return res.send(user);
};

export const deleteById = async (req: Request, res: Response) => {
  const user = await prisma.user.delete({
    where: { id: parseInt(req.params.id) },
    select: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return res.send(user);
};
