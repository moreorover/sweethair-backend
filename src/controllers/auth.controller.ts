import { plainToClass } from 'class-transformer';
import { User } from '../entity/User';
import { UserService } from '../services/user.service';
import { UserCreateDto } from './dtos/user/user-create.dto';
import { UserLoginDto } from './dtos/user/user-login.dto';
import argon2 = require('argon2');
require('dotenv').config();
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
    const service: UserService = new UserService(User);

    const body: UserLoginDto = plainToClass(UserLoginDto, req.body);
    const user = await service.findOne({ email: body.email }, { relations: ['role'] });

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

    user.password = '';
    req.session.user = user;

    res.json(result);
};

export const me = async (req: Request, res: Response) => {
    if (req.session.user) {
        return res.json(req.session.user);
    }
    return res.status(404).json({
        message: 'You are not authorized.'
    });
};

export const register = async (req: Request, res: Response) => {
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

    const results: User = await service.findOne({ id: savedUser.id }, { relations: ['role'] });
    results.password = '';
    req.session.user = results;

    return res.json(results);
};

export const logout = async (req: Request, res: Response) => {
    req.session.destroy(() => {});
    res.clearCookie('squid');
    res.status(200).send();
};
