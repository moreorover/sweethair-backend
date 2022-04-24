import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { prisma } from '../../../prisma';
import { PurchaseDetailsCreateDto } from './purchaseDetails.dto';

export const all = async (req: Request, res: Response) => {
  const all = await prisma.purchaseDetail.findMany();

  const remapped = all.map((pd) => {
    return {
      ...pd,
      total: pd.total.toNumber(),
      quantity: pd.quantity.toNumber(),
    };
  });
  return res.send(remapped);
};

export const findById = async (req: Request, res: Response) => {
  const purchaseDetail = await prisma.purchaseDetail.findUnique({
    where: { id: parseInt(req.params.purchaseDetailsId) },
  });

  if (!purchaseDetail)
    return res.status(500).json(`No purchaseDetail with id: ${req.params.id}`);

  const remapped = {
    ...purchaseDetail,
    total: purchaseDetail.total.toNumber(),
    quantity: purchaseDetail.quantity.toNumber(),
  };
  res.json(remapped);
};

export const findByPurchaseId = async (req: Request, res: Response) => {
  const purchaseId = parseInt(req.params.purchaseId);
  if (!purchaseId) return res.json('Purchase ID is invalid.');

  const purchaseDetail = await prisma.purchase.findUnique({
    where: { id: purchaseId },
    select: { purchaseDetails: true },
  });

  if (!purchaseDetail)
    return res.status(500).json(`No purchaseDetail with id: ${req.params.id}`);

  res.json(purchaseDetail);
};

export const create = async (req: Request, res: Response) => {
  const purchaseId = parseInt(req.params.purchaseId);
  if (!purchaseId) return res.status(500).json('Purchase ID is invalid.');

  const body: PurchaseDetailsCreateDto = plainToClass(
    PurchaseDetailsCreateDto,
    req.body
  );

  const purchase = await prisma.purchase.findUnique({
    where: { id: purchaseId },
  });
  if (!purchase)
    return res.status(500).json(`Purchase not found with id: ${purchaseId}`);

  const product = await prisma.product.findUnique({
    where: { id: body.productId },
  });
  if (!product)
    return res.status(500).json(`Product not found with id: ${body.productId}`);

  const purchaseDetail = await prisma.purchaseDetail.create({
    data: { purchaseId, ...body },
  });

  const remapped = {
    ...purchaseDetail,
    total: purchaseDetail.total.toNumber(),
    quantity: purchaseDetail.quantity.toNumber(),
  };

  await prisma.product.update({
    where: { id: product.id },
    data: {
      currentStock: product.currentStock.toNumber() + body.quantity,
      startingStock: product.startingStock
        ? product.startingStock.toNumber() + body.quantity
        : body.quantity,
    },
  });
  await prisma.purchase.update({
    where: { id: purchase.id },
    data: { total: purchase.total.toNumber() + body.total },
  });

  return res.send(remapped);
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const purchaseDetailsId = parseInt(req.params.purchaseDetailsId);
    if (!purchaseDetailsId) return res.json('PurchaseDetails ID is invalid.');

    const purchaseDetail = await prisma.purchaseDetail.findUnique({
      where: { id: parseInt(req.params.purchaseDetailsId) },
      include: { product: true },
    });

    if (purchaseDetail.product.currentStock < purchaseDetail.quantity) {
      return res.json(
        'Unable to delete this record as current stock is less than the record trying to delete.'
      );
    }

    const deletedPurchaseDetail = await prisma.purchaseDetail.delete({
      where: { id: parseInt(req.params.purchaseDetailsId) },
    });

    const purchaseId = parseInt(req.params.purchaseId);
    if (!purchaseId) return res.json('Purchase ID is invalid.');

    const purchase = await prisma.purchase.findUnique({
      where: { id: purchaseId },
      select: { total: true },
    });

    await prisma.purchase.update({
      where: { id: purchaseId },
      data: {
        total: purchase.total.toNumber() - purchaseDetail.total.toNumber(),
      },
    });

    if (purchaseDetail.product.id > 0) {
      const product = await prisma.product.findUnique({
        where: { id: purchaseDetail.product.id },
        select: { currentStock: true, startingStock: true },
      });

      await prisma.product.update({
        where: { id: purchaseDetail.product.id },
        data: {
          currentStock:
            product.currentStock.toNumber() -
            purchaseDetail.quantity.toNumber(),
          startingStock:
            product.startingStock.toNumber() -
            purchaseDetail.quantity.toNumber(),
        },
      });
    }

    return res.send(deletedPurchaseDetail);
  } catch (e) {
    return res.json(
      `Failed to delete record by id: ${req.params.purchaseDetailsId}`
    );
  }
};
