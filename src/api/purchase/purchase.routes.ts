import { Router } from 'express';
import { validateDto } from '../../middleware/validateBodyToDto';
import {
  all,
  findById,
  update,
  create,
  deleteById,
} from './purchase.controller';
import { PurchaseCreateDto, PurchaseUpdateDto } from './purchase.dto';

const router = Router();

router.get('', all);
router.post('/', validateDto(PurchaseCreateDto), create);
router.get('/:id', findById);
router.patch('/:id', validateDto(PurchaseUpdateDto), update);
router.delete('/:id', deleteById);

module.exports = router;
