import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { prisma } from '../../../prisma';
import { SaleDetailsCreateDto } from './saleDetails.dto';

export const all = async (req: Request, res: Response) => {
  const all = await prisma.saleDetail.findMany();
  return res.send(all);
};

export const findById = async (req: Request, res: Response) => {
  const saleDetail = await prisma.saleDetail.findUnique({
    where: { id: parseInt(req.params.saleDetailsId) },
  });

  if (!saleDetail) return res.json(`No saleDetail with id: ${req.params.id}`);
  res.json(saleDetail);
};

export const findBySaleId = async (req: Request, res: Response) => {
  const saleId = parseInt(req.params.saleId);
  if (!saleId) return res.json('Sale ID is invalid.');

  const saleDetail = await prisma.sale.findUnique({
    where: { id: saleId },
    select: { saleDetails: true },
  });

  if (!saleDetail) return res.json(`No saleDetail with id: ${req.params.id}`);
  res.json(saleDetail);
};

export const create = async (req: Request, res: Response) => {
  const saleId = parseInt(req.params.saleId);
  if (!saleId) return res.json('Sale ID is invalid.');

  const body: SaleDetailsCreateDto = plainToClass(
    SaleDetailsCreateDto,
    req.body
  );

  const sale = await prisma.sale.findUnique({ where: { id: saleId } });
  if (!sale) return res.json(`Sale not found with id: ${saleId}`);

  const product = await prisma.product.findUnique({
    where: { id: body.productId },
  });
  if (!product) return res.json(`Product not found with id: ${body.productId}`);

  if (product.currentStock.toNumber() < body.quantity)
    return res.json({
      message: 'Trying to sell more than in stock',
      currentStock: product.currentStock,
      selling: body.quantity,
    });

  const saleDetail = await prisma.saleDetail.create({
    data: { saleId, ...body },
  });

  await prisma.product.update({
    where: { id: product.id },
    data: { currentStock: product.currentStock.toNumber() - body.quantity },
  });
  await prisma.sale.update({
    where: { id: sale.id },
    data: { total: sale.total.toNumber() + body.total },
  });

  return res.send(saleDetail);
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const saleDetailsId = parseInt(req.params.saleDetailsId);
    if (!saleDetailsId) return res.json('SaleDetails ID is invalid.');

    const saleDetail = await prisma.saleDetail.delete({
      where: { id: parseInt(req.params.saleDetailsId) },
      include: { product: true },
    });

    const saleId = parseInt(req.params.saleId);
    if (!saleId) return res.json('Sale ID is invalid.');

    const sale = await prisma.sale.findUnique({
      where: { id: saleId },
      select: { total: true },
    });

    await prisma.sale.update({
      where: { id: saleId },
      data: { total: sale.total.toNumber() - saleDetail.total.toNumber() },
    });

    if (saleDetail.product.id > 0) {
      const product = await prisma.product.findUnique({
        where: { id: saleDetail.product.id },
        select: { currentStock: true },
      });

      await prisma.product.update({
        where: { id: saleDetail.product.id },
        data: {
          currentStock:
            product.currentStock.toNumber() + saleDetail.quantity.toNumber(),
        },
      });
    }

    return res.send(saleDetail);
  } catch (e) {
    return res.json(
      `Failed to delete record by id: ${req.params.saleDetailsId}`
    );
  }
};
