import { Router } from 'express';
import { UserCreateDto } from '../controllers/dtos/user/user-create.dto';
import { UserLoginDto } from '../controllers/dtos/user/user-login.dto';
import { login, me, register, logout } from '../controllers/auth.controller';
import { validateDto } from '../middleware/validateBodyToDto';
import { authenticateToken } from '../middleware/requestAuthenticated';

const router = Router();

router.post('/register', validateDto(UserCreateDto), register);
router.post('/login', validateDto(UserLoginDto), login);
router.get('/me', authenticateToken, me);
router.get('/logout', authenticateToken, logout);

module.exports = router;
