import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import { SupplierCreateDto, SupplierUpdateDto } from './supplier.dto';

export const all = async (req: Request, res: Response) => {
  const all = await prisma.supplier.findMany();
  return res.send(all);
};

export const findById = async (req: Request, res: Response) => {
  const Supplier = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(Supplier);
};

export const create = async (req: Request, res: Response) => {
  const body: SupplierCreateDto = plainToClass(SupplierCreateDto, req.body);

  const user = await prisma.supplier.create({
    data: { ...body },
  });
  return res.send(user);
};

export const update = async (req: Request, res: Response) => {
  const body: SupplierUpdateDto = plainToClass(SupplierUpdateDto, req.body);

  const user = await prisma.supplier.update({
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
