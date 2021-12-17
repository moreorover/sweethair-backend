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
import { TypeormLoader } from 'type-graphql-dataloader';

@ObjectType()
@Entity()
@Expose()
export class Transaction extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field((_type) => Float)
  @Column('float', { precision: 11, scale: 2 })
  total!: number;

  @Field()
  @Column({ default: false, type: 'boolean' })
  isPaid!: boolean;

  @Field()
  @Column({ default: null })
  scheduledAt!: Date;

  @Field({ nullable: true })
  @Column()
  customerId: number;

  @Field((type) => Customer, { nullable: true })
  @TypeormLoader()
  @ManyToOne(() => Customer, (customer) => customer.transactions)
  customer: Customer;

  @Field({ nullable: true })
  @Column()
  appointmentId: number;

  @Field((type) => Appointment, { nullable: true })
  @TypeormLoader()
  @ManyToOne(() => Appointment, (appointment) => appointment.transactions)
  appointment: Appointment;

  @Field({ nullable: true })
  @Column()
  invoiceId: number;

  @Field((type) => Invoice, { nullable: true })
  @TypeormLoader()
  @ManyToOne(() => Invoice, (invoice) => invoice.transactions)
  invoice: Invoice;

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  modifiedOn: Date;
}
