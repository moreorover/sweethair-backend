import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import { PurchaseCreateDto, PurchaseUpdateDto } from './purchase.dto';

export const all = async (req: Request, res: Response) => {
  const all = await prisma.purchase.findMany();
  return res.send(all);
};

export const findById = async (req: Request, res: Response) => {
  const purchase = await prisma.purchase.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!purchase) return res.json(`No purchase with id: ${req.params.id}`);
  res.json(purchase);
};

export const create = async (req: Request, res: Response) => {
  const body: PurchaseCreateDto = plainToClass(PurchaseCreateDto, req.body);

  const purchase = await prisma.purchase.create({
    data: { ...body },
  });
  return res.send(purchase);
};

export const update = async (req: Request, res: Response) => {
  const body: PurchaseUpdateDto = plainToClass(PurchaseUpdateDto, req.body);

  const purchase = await prisma.purchase.update({
    where: { id: parseInt(req.params.id) },
    data: { ...body },
  });
  return res.send(purchase);
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const purchase = await prisma.purchase.delete({
      where: { id: parseInt(req.params.id) },
    });
    return res.send(purchase);
  } catch (e) {
    return res.json(`Failed to delete record by id: ${req.params.id}`);
  }
};
