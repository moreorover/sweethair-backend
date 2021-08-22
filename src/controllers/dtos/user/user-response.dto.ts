import { Role } from '../../../entity/Role';

export class UserResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}
