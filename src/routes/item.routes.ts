import { Router } from 'express';
import { PaginateDto } from '../controllers/dtos/common/paginate.dto';
import { authenticateToken } from '../middleware/requestAuthenticated';
const { all, paginate, paginateDeals, findById } = require('../controllers/item.controller');
const { validateDto } = require('../middleware/validateBodyToDto');

const router = Router();

router.get('', authenticateToken, all);
router.post('/paginate', authenticateToken, validateDto(PaginateDto), paginate);
router.post('/paginate/deals', authenticateToken, validateDto(PaginateDto), paginateDeals);
// router.post('', authenticateToken, validateDto(UserCreateDto), create);
router.get('/:id', authenticateToken, findById);
// router.patch('/:id', authenticateToken, validateUserRoleToAdmin, validateDto(UserUpdateDto), update);
// router.delete('/:id', authenticateToken, validateUserRoleToAdmin, deleteById);

module.exports = router;
