import { plainToClass } from 'class-transformer';
import { User } from '../entity/User';
import { UserService } from '../services/user.service';
import { UserCreateDto } from './dtos/user/user-create.dto';
import { UserLoginDto } from './dtos/user/user-login.dto';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
    const service: UserService = new UserService(User);

    const body: UserLoginDto = plainToClass(UserLoginDto, req.body);
    const user = await service.findOne({ email: body.email }, ['role']);

    if (!user) {
        return res.send({
            status: 404,
            message: 'User does not exist.'
        });
    }

    if (!(await bcrypt.compare(body.password, user.password))) {
        return res.send({
            status: 404,
            message: 'Incorrect password.'
        });
    }

    const { password, ...result } = user;

    const accessToken = jwt.sign(result, process.env.JWT_ACCESS_TOKEN);

    res.cookie('jwt', accessToken, { httpOnly: true });

    res.json(result);
};

const me = async (req, res) => {
    const jwt_access_token = req.cookies.jwt;
    const data = jwt.verify(jwt_access_token, process.env.JWT_ACCESS_TOKEN);
    res.json(data);
};

const register = async (req, res) => {
    const service: UserService = new UserService(User);

    const body: UserCreateDto = plainToClass(UserCreateDto, req.body);
    const user = await service.findOne({ email: body.email });

    if (user) {
        return res.send({
            status: 404,
            message: 'User already exists.'
        });
    }

    if (body.password != body.passwordConfirm) {
        return res.send({
            status: 404,
            message: 'Passwords do not match.'
        });
    }

    const savedUser = await service.create(body);

    const results: User = await service.findOne({ id: savedUser.id }, ['role']);
    let { password, ...result } = results;

    const accessToken = jwt.sign(result, process.env.JWT_ACCESS_TOKEN);

    res.cookie('jwt', accessToken, { httpOnly: true });

    return res.json(result);
};

const logout = async (req, res) => {
    res.clearCookie('jwt');
    return res.json({ message: 'Success' });
};

module.exports = {
    login,
    me,
    register,
    logout
};
