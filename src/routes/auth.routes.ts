import { Router } from 'express';
import { UserCreateDto } from '../controllers/dtos/user/user-create.dto';
import { UserLoginDto } from '../controllers/dtos/user/user-login.dto';
import { login, register, logout } from '../controllers/auth.controller';
import { validateDto } from '../middleware/validateBodyToDto';

const router = Router();

router.post('/register', validateDto(UserCreateDto), register);
router.post('/login', validateDto(UserLoginDto), login);
router.get('/logout', logout);

module.exports = router;
