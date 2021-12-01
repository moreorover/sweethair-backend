import { plainToClass } from 'class-transformer';
import { User } from '../entity/User';
import { UserService } from '../services/user.service';
import { UserCreateDto } from './dtos/user/user-create.dto';
import { UserLoginDto } from './dtos/user/user-login.dto';
import argon2 = require('argon2');
require('dotenv').config();

const login = async (req, res) => {
    const service: UserService = new UserService(User);

    const body: UserLoginDto = plainToClass(UserLoginDto, req.body);
    const user = await service.findOne({ email: body.email }, ['role']);

    if (!user) {
        return res.status(404).send({
            message: 'User does not exist.'
        });
    }

    if (!(await argon2.verify(user.password, body.password))) {
        return res.status(404).send({
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
    return res.status(404).json({
        message: 'You are not authorized.'
    });
};

const register = async (req, res) => {
    const service: UserService = new UserService(User);

    const body: UserCreateDto = plainToClass(UserCreateDto, req.body);
    const user = await service.findOne({ email: body.email });

    if (user) {
        return res.status(404).send({
            message: 'User already exists.'
        });
    }

    if (body.password != body.passwordConfirm) {
        return res.status(404).send({
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
