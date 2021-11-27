import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DataEntity } from './DataEntity';
import { Role } from './Role';

@Entity()
export class User extends DataEntity {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role;
}
