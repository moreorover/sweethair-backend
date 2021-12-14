import { Customer } from './Customer';
import { Appointment } from './Appointment';
import { Invoice } from './Invoice';
import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Field, Float, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
@Expose()
export class Transaction extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field((type) => Float)
  @Column('float', { precision: 11, scale: 2 })
  total!: number;

  @Field()
  @Column({ default: false, type: 'boolean' })
  isPaid!: boolean;

  @Field()
  @Column({ default: null })
  scheduledAt!: Date;

  @Field((type) => Customer)
  @ManyToOne(() => Customer, (customer) => customer.transactions)
  customer: Customer;

  @Field((type) => Appointment)
  @ManyToOne(() => Appointment, (appointment) => appointment.transactions)
  appointment: Appointment;

  @Field((type) => Invoice)
  @ManyToOne(() => Invoice, (invoice) => invoice.transactions)
  invoice: Invoice;

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  modifiedOn: Date;
}
