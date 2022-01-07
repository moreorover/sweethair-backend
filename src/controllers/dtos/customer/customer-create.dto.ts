import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

@Expose()
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
