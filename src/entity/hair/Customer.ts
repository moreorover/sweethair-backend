import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: '' })
    firstName: string;

    @Column({ default: '' })
    lastName: string;

    @Column({ default: '', unique: true })
    email: string;

    @Column({ default: '' })
    instagram: string;
}
