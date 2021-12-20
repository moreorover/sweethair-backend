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
import { Field, Float, Int, ObjectType, registerEnumType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

export enum TransactionType {
  IN = 'IN',
  OUT = 'OUT',
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: 'The basic directions',
  valuesConfig: {
    IN: {
      description: 'Marks transaction as income.',
    },
    OUT: {
      description: 'Marks transaction as expense.',
    },
  },
});

@ObjectType()
@Entity()
@Expose()
export class Transaction extends BaseEntity {
  @Field((_type) => Int)
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

  @Field()
  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.IN,
  })
  type: TransactionType;

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
