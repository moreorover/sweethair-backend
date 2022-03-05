import { Router } from 'express';
import { login, register, logout } from './auth.controller';
import { validateDto } from '../../middleware/validateBodyToDto';
import { UserCreateDto, UserLoginDto } from './user.dto';

const router = Router();

router.post('/register', validateDto(UserCreateDto), register);
router.post('/login', validateDto(UserLoginDto), login);
router.get('/logout', logout);

module.exports = router;
