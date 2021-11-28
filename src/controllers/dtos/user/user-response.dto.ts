import { Role } from '../../../entity/Role';

export class UserResponseDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}
