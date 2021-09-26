import { Customer } from './Customer';
import { Appointment } from './Appointment';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 11, scale: 2 })
    total: number;

    @Column({ default: false, type: 'boolean' })
    isPaid: boolean;

    @ManyToOne(() => Customer, (customer) => customer.transactions)
    customer: Customer;

    @ManyToOne(() => Appointment, (appointment) => appointment.transactions)
    appointment: Appointment;
}
