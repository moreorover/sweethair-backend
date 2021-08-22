import { Router } from 'express';
import { PaginateDto } from '../controllers/dtos/common/paginate.dto';
import { UserUpdateDto } from '../controllers/dtos/user/user-update.dto';
import { authenticateToken } from '../middleware/requestAuthenticated';
const { all, paginate, findById, update, deleteById } = require('../controllers/user.controller');
const { validateDto } = require('../middleware/validateBodyToDto');

const router = Router();

router.get('', authenticateToken, all);
router.post('/paginate', authenticateToken, validateDto(PaginateDto), paginate);
// router.post('', authenticateToken, validateDto(UserCreateDto), create);
router.get('/:id', authenticateToken, findById);
router.patch('/:id', authenticateToken, validateDto(UserUpdateDto), update);
router.delete('/:id', authenticateToken, deleteById);

module.exports = router;
