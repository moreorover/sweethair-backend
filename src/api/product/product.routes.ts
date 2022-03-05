import { Router } from 'express';
import { validateDto } from '../../middleware/validateBodyToDto';
import {
  all,
  findById,
  update,
  create,
  deleteById,
} from './product.controller';
import { ProductCreateDto, ProductUpdateDto } from './product.dto';

const router = Router();

router.get('', all);
router.post('/', validateDto(ProductCreateDto), create);
router.get('/:id', findById);
router.patch('/:id', validateDto(ProductUpdateDto), update);
router.delete('/:id', deleteById);

module.exports = router;
