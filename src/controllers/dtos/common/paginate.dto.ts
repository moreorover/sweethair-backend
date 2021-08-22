import { IsPositive } from 'class-validator';

export class PaginateDto {
    @IsPositive()
    page: number;
}
