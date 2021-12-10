import { Router } from 'express';
import { PaginateDto } from '../controllers/dtos/common/paginate.dto';
import { ItemCreateDto } from '../controllers/dtos/item/item-create.dto';
import { ItemUpdateDto } from '../controllers/dtos/item/item-update.dto';
import { authenticateToken } from '../middleware/requestAuthenticated';
import { all, paginate, findById, create, update, deleteById } from '../controllers/invoice.controller';
import { validateDto } from '../middleware/validateBodyToDto';

const router = Router();

router.get('', authenticateToken, all);
router.post('/paginate', authenticateToken, validateDto(PaginateDto), paginate);
router.post('', authenticateToken, validateDto(ItemCreateDto), create);
router.get('/:id', authenticateToken, findById);
router.patch('/:id', authenticateToken, validateDto(ItemUpdateDto), update);
router.delete('/:id', authenticateToken, deleteById);

module.exports = router;
