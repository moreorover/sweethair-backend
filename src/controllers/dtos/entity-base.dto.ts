import { IsPositive } from 'class-validator';
import { Expose } from 'class-transformer';

@Expose()
export class EntityBaseDto {
  @IsPositive()
  id: number;
}
