import { Transaction } from './Transaction';
import { Appointment } from './Appointment';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { Expose } from 'class-transformer';

@Entity()
@Expose()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: '', nullable: false, unique: true })
    fullName: string;

    @Column({ default: '', nullable: true })
    location: string;

    @Column({ default: '', nullable: true })
    about: string;

    @Column({ type: 'text', unique: true, nullable: true })
    email: string;

    @Column({ type: 'text', unique: true, nullable: true })
    instagram: string;

    @ManyToMany(() => Appointment, (appointment) => appointment.customers)
    @JoinTable({ name: 'customer_appointments' })
    appointments: Appointment[];

    @OneToMany(() => Transaction, (transaction) => transaction.customer, {
        cascade: true
    })
    transactions: Transaction[];
}
