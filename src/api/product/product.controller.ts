import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import { ProductCreateDto, ProductUpdateDto } from './product.dto';

export const all = async (req: Request, res: Response) => {
  const all = await prisma.product.findMany();

  const remapped = all.map((p) => {
    return {
      ...p,
      startingStock: p.startingStock.toNumber(),
      currentStock: p.currentStock.toNumber(),
    };
  });

  return res.send(remapped);
};

export const findById = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!product) return res.json(`No product with id: ${req.params.id}`);
  res.json(product);
};

export const create = async (req: Request, res: Response) => {
  const body: ProductCreateDto = plainToClass(ProductCreateDto, req.body);

  const product = await prisma.product.create({
    data: { ...body },
  });
  return res.send(product);
};

export const update = async (req: Request, res: Response) => {
  const body: ProductUpdateDto = plainToClass(ProductUpdateDto, req.body);

  const product = await prisma.product.update({
    where: { id: parseInt(req.params.id) },
    data: { ...body },
  });
  return res.send(product);
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.delete({
      where: { id: parseInt(req.params.id) },
    });
    return res.send(product);
  } catch (e) {
    return res.json(`Failed to delete record by id: ${req.params.id}`);
  }
};
