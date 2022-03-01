import { plainToClass } from 'class-transformer';
import { UserCreateDto } from './dtos/user/user-create.dto';
import { UserLoginDto } from './dtos/user/user-login.dto';
import argon2 = require('argon2');
require('dotenv').config();
import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const login = async (req: Request, res: Response) => {
  const body: UserLoginDto = plainToClass(UserLoginDto, req.body);
  const user = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (!user) {
    return res.status(404).send({
      message: 'User does not exist.',
    });
  }

  if (!(await argon2.verify(user.password, body.password))) {
    return res.status(404).send({
      message: 'Incorrect password.',
    });
  }

  const { password, ...result } = user;

  user.password = '';

  res.json(result);
};

export const register = async (req: Request, res: Response) => {
  const body: UserCreateDto = plainToClass(UserCreateDto, req.body);
  const user = await prisma.user.findFirst({ where: { email: body.email } });

  if (user) {
    return res.status(404).send({
      message: 'User already exists.',
    });
  }

  if (body.password != body.passwordConfirm) {
    return res.status(404).send({
      message: 'Passwords do not match.',
    });
  }

  const savedUser = await prisma.user.create({
    data: {
      fullName: body.fullName,
      email: body.email,
      password: await argon2.hash(body.password),
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!savedUser) {
    return res.status(404).send({
      message: 'Failed to create user.',
    });
  }

  return res.json(savedUser);
};

export const logout = async (req: Request, res: Response) => {
  req.session.destroy(() => {});
  res.clearCookie('squid');
  res.status(200).send();
};
