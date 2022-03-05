import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import { SaleCreateDto, SaleUpdateDto } from './sale.dto';

export const all = async (req: Request, res: Response) => {
  const all = await prisma.sale.findMany();
  return res.send(all);
};

export const findById = async (req: Request, res: Response) => {
  const sale = await prisma.sale.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!sale) return res.json(`No sale with id: ${req.params.id}`);
  res.json(sale);
};

export const create = async (req: Request, res: Response) => {
  const body: SaleCreateDto = plainToClass(SaleCreateDto, req.body);

  const sale = await prisma.sale.create({
    data: { ...body },
  });
  return res.send(sale);
};

export const update = async (req: Request, res: Response) => {
  const body: SaleUpdateDto = plainToClass(SaleUpdateDto, req.body);

  const sale = await prisma.sale.update({
    where: { id: parseInt(req.params.id) },
    data: { ...body },
  });
  return res.send(sale);
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const sale = await prisma.sale.delete({
      where: { id: parseInt(req.params.id) },
    });
    return res.send(sale);
  } catch (e) {
    return res.json(`Failed to delete record by id: ${req.params.id}`);
  }
};
