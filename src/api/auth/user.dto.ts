import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @Length(6)
  password: string;

  @Length(6)
  passwordConfirm: string;
}

export class UserLoginDto {
  @IsEmail()
  email: string;

  @Length(6)
  password: string;
}

export class UserUpdateDto {
  @IsPositive()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Length(6)
  password: string;

  @IsOptional()
  role_id: number;

  @Exclude()
  createdOn: Date;

  @Exclude()
  modifiedOn: Date;
}
