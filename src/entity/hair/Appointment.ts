import { Customer } from './Customer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: null })
    start: Date;

    @ManyToMany(() => Customer, (customer) => customer.appointments)
    customers: Customer[];
}
