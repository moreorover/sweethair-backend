import { Router } from 'express';
import { PaginateDto } from '../controllers/dtos/common/paginate.dto';
import { TransactionCreateDto } from '../controllers/dtos/transaction/transaction-create.dto';
import { TransactionUpdateDto } from '../controllers/dtos/transaction/transaction-update.dto';
import { authenticateToken } from '../middleware/requestAuthenticated';
const { all, paginate, create, findById, update, deleteById } = require('../controllers/transaction.controller');
const { validateDto } = require('../middleware/validateBodyToDto');

const router = Router();

router.get('', authenticateToken, all);
router.post('/paginate', authenticateToken, validateDto(PaginateDto), paginate);
router.post('', authenticateToken, validateDto(TransactionCreateDto), create);
router.get('/:id', authenticateToken, findById);
router.patch('/:id', authenticateToken, validateDto(TransactionUpdateDto), update);
router.delete('/:id', authenticateToken, deleteById);

module.exports = router;
