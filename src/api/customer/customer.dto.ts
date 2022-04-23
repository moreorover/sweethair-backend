import { IsNotEmpty, IsOptional } from 'class-validator';

export class CustomerCreateDto {
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  location: string;

  @IsOptional()
  about: string;

  @IsOptional()
  email: string;

  @IsOptional()
  instagram: string;
}

export class CustomerUpdateDto {
  @IsOptional()
  fullName: string;

  @IsOptional()
  location: string;

  @IsOptional()
  about: string;

  @IsOptional()
  email: string;

  @IsOptional()
  instagram: string;
}
