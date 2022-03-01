import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import { CustomerCreateDto, CustomerUpdateDto } from './customer.dto';

export const all = async (req: Request, res: Response) => {
  const all = await prisma.customer.findMany();
  return res.send(all);
};

export const findById = async (req: Request, res: Response) => {
  const customer = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(customer);
};

export const create = async (req: Request, res: Response) => {
  const body: CustomerCreateDto = plainToClass(CustomerCreateDto, req.body);

  const user = await prisma.customer.create({
    data: { ...body },
  });
  return res.send(user);
};

export const update = async (req: Request, res: Response) => {
  const body: CustomerUpdateDto = plainToClass(CustomerUpdateDto, req.body);

  const user = await prisma.customer.update({
    where: { id: parseInt(req.params.id) },
    data: { ...body },
  });
  return res.send(user);
};

export const deleteById = async (req: Request, res: Response) => {
  const user = await prisma.user.delete({
    where: { id: parseInt(req.params.id) },
  });
  return res.send(user);
};
