import { Router } from 'express';
import { validateDto } from '../../../middleware/validateBodyToDto';
import {
  all,
  findById,
  findBySaleId,
  create,
  deleteById,
} from './saleDetails.controller';
import { SaleDetailsCreateDto } from './saleDetails.dto';

const router = Router();

router.get('/saleDetails', all);
router.get('/:saleId/saleDetails', findBySaleId);
router.post('/:saleId/saleDetails', validateDto(SaleDetailsCreateDto), create);
router.get('/:saleId/saleDetails/:saleDetailsId', findById);

router.delete('/:saleId/saleDetails/:saleDetailsId', deleteById);

module.exports = router;
