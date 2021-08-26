import { Router } from 'express';
import { PaginateDto } from '../controllers/dtos/common/paginate.dto';
import { CustomerCreateDto } from '../controllers/dtos/customer/customer-create.dto';
import { CustomerUpdateDto } from '../controllers/dtos/customer/customer-update.dto';
import { authenticateToken } from '../middleware/requestAuthenticated';
const { all, paginate, create, findById, update, deleteById } = require('../controllers/customer.controller');
const { validateDto } = require('../middleware/validateBodyToDto');

const router = Router();

router.get('', authenticateToken, all);
router.post('/paginate', authenticateToken, validateDto(PaginateDto), paginate);
router.post('', authenticateToken, validateDto(CustomerCreateDto), create);
router.get('/:id', authenticateToken, findById);
router.patch('/:id', authenticateToken, validateDto(CustomerUpdateDto), update);
router.delete('/:id', authenticateToken, deleteById);

module.exports = router;
