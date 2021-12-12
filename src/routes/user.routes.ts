import { Router } from 'express';
import { PaginateDto } from '../controllers/dtos/common/paginate.dto';
import { UserUpdateDto } from '../controllers/dtos/user/user-update.dto';
import { authenticateToken } from '../middleware/requestAuthenticated';
import {
  all,
  paginate,
  findById,
  update,
  deleteById,
} from '../controllers/user.controller';
import { validateDto } from '../middleware/validateBodyToDto';

const router = Router();

router.get('', authenticateToken, all);
router.post('/paginate', authenticateToken, validateDto(PaginateDto), paginate);
// router.post('', authenticateToken, validateDto(UserCreateDto), create);
router.get('/:id', authenticateToken, findById);
router.patch('/:id', authenticateToken, validateDto(UserUpdateDto), update);
router.delete('/:id', authenticateToken, deleteById);

module.exports = router;
