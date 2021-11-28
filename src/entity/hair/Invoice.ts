import { Item } from './Item';
import { Transaction } from './Transaction';
import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { DataEntity } from '../DataEntity';
import { Expose } from 'class-transformer';

@Entity()
@Expose()
export class Invoice extends DataEntity {
    @Column('float', { precision: 11, scale: 2 })
    total: number;

    @Column({ default: false, type: 'boolean' })
    isReceived: boolean;

    @Column({ default: false, type: 'boolean' })
    idPaid: boolean;

    @Column({ default: null })
    scheduledAt: Date;

    @OneToMany(() => Transaction, (transaction) => transaction.invoice, {
        cascade: true
    })
    transactions: Transaction[];

    @ManyToMany(() => Item, (item) => item.invoices)
    @JoinTable({ name: 'invoice_items' })
    items: Item[];
}
