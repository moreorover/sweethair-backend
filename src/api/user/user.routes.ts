import { Router } from 'express';
import { all, findById, update, deleteById } from './user.controller';
import { validateDto } from '../../middleware/validateBodyToDto';
import { UserUpdateDto } from '../auth/user.dto';

const router = Router();

router.get('', all);
router.get('/:id', findById);
router.patch('/:id', validateDto(UserUpdateDto), update);
router.delete('/:id', deleteById);

module.exports = router;
