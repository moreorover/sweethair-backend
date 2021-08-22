import { Router } from 'express';
import { UserCreateDto } from '../controllers/dtos/user/user-create.dto';
import { UserLoginDto } from '../controllers/dtos/user/user-login.dto';
const { login, me, register, logout } = require('../controllers/auth.controller');
const { validateDto } = require('../middleware/validateBodyToDto');

const router = Router();

router.post('/register', validateDto(UserCreateDto), register);
router.post('/login', validateDto(UserLoginDto), login);
router.get('/me', me);
router.get('/logout', logout);

module.exports = router;
