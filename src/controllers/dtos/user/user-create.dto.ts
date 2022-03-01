import { IsEmail, IsNotEmpty, Length } from 'class-validator';

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
