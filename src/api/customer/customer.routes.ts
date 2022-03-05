import { Router } from 'express';
import { validateDto } from '../../middleware/validateBodyToDto';
import {
  all,
  findById,
  update,
  create,
  deleteById,
} from './customer.controller';
import { CustomerCreateDto, CustomerUpdateDto } from './customer.dto';

const router = Router();

router.get('', all);
router.post('/', validateDto(CustomerCreateDto), create);
router.get('/:id', findById);
router.patch('/:id', validateDto(CustomerUpdateDto), update);
router.delete('/:id', deleteById);

module.exports = router;
