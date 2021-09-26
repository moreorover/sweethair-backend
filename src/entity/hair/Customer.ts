import { Transaction } from './Transaction';
import { Appointment } from './Appointment';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
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

    @ManyToMany(() => Appointment, (appointment) => appointment.customers)
    @JoinTable({ name: 'customer_appointments' })
    appointments: Appointment[];

    @OneToMany(() => Transaction, (transaction) => transaction.customer)
    transactions: Transaction[];
}
