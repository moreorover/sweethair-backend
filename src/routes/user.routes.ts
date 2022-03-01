import { Router } from 'express';
import { UserUpdateDto } from '../controllers/dtos/user/user-update.dto';
import {
  all,
  findById,
  update,
  deleteById,
} from '../controllers/user.controller';
import { validateDto } from '../middleware/validateBodyToDto';

const router = Router();

router.get('', all);
router.get('/:id', findById);
router.patch('/:id', validateDto(UserUpdateDto), update);
router.delete('/:id', deleteById);

module.exports = router;
