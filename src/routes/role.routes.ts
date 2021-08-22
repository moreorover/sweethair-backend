import { Router } from 'express';
import { PaginateDto } from '../controllers/dtos/common/paginate.dto';
import { RoleCreateDto } from '../controllers/dtos/role/role-create.dto';
import { RoleUpdateDto } from '../controllers/dtos/role/role-update.dto';
import { authenticateToken } from '../middleware/requestAuthenticated';
import { validateUserRoleToAdmin } from '../middleware/validateUserRoleToAdmin';
const { all, paginate, create, findById, update, deleteById } = require('../controllers/role.controller');
const { validateDto } = require('../middleware/validateBodyToDto');

const router = Router();

router.get('', authenticateToken, validateUserRoleToAdmin, all);
router.post('/paginate', authenticateToken, validateUserRoleToAdmin, validateDto(PaginateDto), paginate);
router.post('', authenticateToken, validateUserRoleToAdmin, validateDto(RoleCreateDto), create);
router.get('/:id', authenticateToken, validateUserRoleToAdmin, findById);
router.patch('/:id', authenticateToken, validateUserRoleToAdmin, validateDto(RoleUpdateDto), update);
router.delete('/:id', authenticateToken, validateUserRoleToAdmin, deleteById);

module.exports = router;
