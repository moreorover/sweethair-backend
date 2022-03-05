import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CustomerCreateDto {
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsNotEmpty()
  about: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  instagram: string;
}

export class CustomerUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsNotEmpty()
  about: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  instagram: string;
}
