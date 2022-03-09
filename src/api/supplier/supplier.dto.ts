import { IsEmail, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class SupplierCreateDto {
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  location: string;

  @IsOptional()
  about: string;

  @IsOptional()
  // @IsEmail()
  email: string;

  @IsOptional()
  instagram: string;

  @IsOptional()
  // @IsUrl()
  url: string;
}

export class SupplierUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  location: string;

  @IsOptional()
  about: string;

  @IsOptional()
  // @IsEmail()
  email: string;

  @IsOptional()
  instagram: string;

  @IsOptional()
  // @IsUrl()
  url: string;
}
