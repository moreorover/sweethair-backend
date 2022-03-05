import { Router } from 'express';
import { validateDto } from '../../../middleware/validateBodyToDto';
import {
  all,
  findById,
  findByPurchaseId,
  create,
  deleteById,
} from './purchaseDetails.controller';
import { PurchaseDetailsCreateDto } from './purchaseDetails.dto';

const router = Router();

router.get('/purchaseDetails', all);
router.get('/:purchaseId/purchaseDetails', findByPurchaseId);
router.post(
  '/:purchaseId/purchaseDetails',
  validateDto(PurchaseDetailsCreateDto),
  create
);
router.get('/:purchaseId/purchaseDetails/:purchaseDetailsId', findById);

router.delete('/:purchaseId/purchaseDetails/:purchaseDetailsId', deleteById);

module.exports = router;
