import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  email: string;

  @Length(6)
  password: string;
}
