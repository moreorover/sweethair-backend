import { plainToClass } from 'class-transformer';
import { User } from '../entity/User';
import { UserService } from '../services/user.service';
import { UserCreateDto } from './dtos/user/user-create.dto';
import { UserLoginDto } from './dtos/user/user-login.dto';
const bcrypt = require('bcrypt');
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

    req.session.user = result;

    res.json(result);
};

const me = async (req, res) => {
    if (req.session.user) {
        return res.json(req.session.user);
    }
    return res.json({
        status: 404,
        message: 'You are not authorized.'
    });
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

    req.session.user = result;

    return res.json(result);
};

const logout = async (req, res) => {
    req.session.destroy();
    res.clearCookie('squid');
    res.status(200).send();
};

module.exports = {
    login,
    me,
    register,
    logout
};
