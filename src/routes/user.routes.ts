import { Router } from 'express';
import { PaginateDto } from '../controllers/dtos/common/paginate.dto';
import { UserUpdateDto } from '../controllers/dtos/user/user-update.dto';
import { authenticateToken } from '../middleware/requestAuthenticated';
import { validateUserRoleToAdmin } from '../middleware/validateUserRoleToAdmin';
const { all, paginate, findById, update, deleteById } = require('../controllers/user.controller');
const { validateDto } = require('../middleware/validateBodyToDto');

const router = Router();

router.get('', authenticateToken, validateUserRoleToAdmin, all);
router.post('/paginate', authenticateToken, validateDto(PaginateDto), paginate);
// router.post('', authenticateToken, validateDto(UserCreateDto), create);
router.get('/:id', authenticateToken, validateUserRoleToAdmin, findById);
router.patch('/:id', authenticateToken, validateUserRoleToAdmin, validateDto(UserUpdateDto), update);
router.delete('/:id', authenticateToken, validateUserRoleToAdmin, deleteById);

module.exports = router;
