import { IsEmail, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class SupplierCreateDto {
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

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}

export class SupplierUpdateDto {
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

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
