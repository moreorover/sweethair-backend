import { Customer } from './Customer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { Transaction } from './Transaction';
import { Expose } from 'class-transformer';

@Entity()
@Expose()
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    scheduledAt: Date;

    @Column({ default: '', nullable: true })
    title: string;

    @ManyToMany(() => Customer, (customer) => customer.appointments)
    customers: Customer[];

    @OneToMany(() => Transaction, (transaction) => transaction.appointment, {
        cascade: true
    })
    transactions: Transaction[];
}
