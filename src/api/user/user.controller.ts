import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import UsersService from '../../services/UserServices';
import { UserUpdateDto } from '../auth/user.dto';

export const all = async (req: Request, res: Response) => {
  const users = await UsersService.listUsers();
  return res.status(200).json(users);
};

export const findById = async (req: Request, res: Response) => {
  const user = await UsersService.findById(parseInt(req.params.id));
  if (user) return res.status(200).json(user);
  return res.sendStatus(404);
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
  return res.status(201).json(user);
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
  return res.status(205).json(user);
};
