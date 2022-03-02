import { Router } from 'express';
import { validateDto } from '../../middleware/validateBodyToDto';
import {
  all,
  findById,
  update,
  create,
  deleteById,
} from './supplier.controller';
import { SupplierCreateDto, SupplierUpdateDto } from './supplier.dto';

const router = Router();

router.get('', all);
router.post('/', validateDto(SupplierCreateDto), create);
router.get('/:id', findById);
router.patch('/:id', validateDto(SupplierUpdateDto), update);
router.delete('/:id', deleteById);

module.exports = router;
