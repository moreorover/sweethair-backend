import { Router } from 'express';
import { validateDto } from '../../middleware/validateBodyToDto';
import { all, findById, update, create, deleteById } from './sale.controller';
import { SaleCreateDto, SaleUpdateDto } from './sale.dto';

const router = Router();

router.get('', all);
router.post('/', validateDto(SaleCreateDto), create);
router.get('/:id', findById);
router.patch('/:id', validateDto(SaleUpdateDto), update);
router.delete('/:id', deleteById);

module.exports = router;
