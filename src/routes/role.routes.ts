import { Router } from 'express';
import { PaginateDto } from '../controllers/dtos/common/paginate.dto';
import { RoleCreateDto } from '../controllers/dtos/role/role-create.dto';
import { RoleUpdateDto } from '../controllers/dtos/role/role-update.dto';
import { authenticateToken } from '../middleware/requestAuthenticated';
const { all, paginate, create, findById, update, deleteById } = require('../controllers/role.controller');
const { validateDto } = require('../middleware/validateBodyToDto');

const router = Router();

router.get('', authenticateToken, all);
router.post('/paginate', authenticateToken, validateDto(PaginateDto), paginate);
router.post('', authenticateToken, validateDto(RoleCreateDto), create);
router.get('/:id', authenticateToken, findById);
router.patch('/:id', authenticateToken, validateDto(RoleUpdateDto), update);
router.delete('/:id', authenticateToken, deleteById);

module.exports = router;
