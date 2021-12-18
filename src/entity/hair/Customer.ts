import { Transaction } from './Transaction';
import { Appointment } from './Appointment';
import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Item } from './Item';
import { Field, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@ObjectType()
@Entity()
@Expose()
export class Customer extends BaseEntity {
  @Field((_type) => Int)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column({ default: '', nullable: false, unique: true })
  fullName!: string;

  @Field()
  @Column({ default: '', nullable: true })
  location: string;

  @Field()
  @Column({ default: '', nullable: true })
  about: string;

  @Field()
  @Column({ type: 'text', unique: true, nullable: true })
  email: string;

  @Field()
  @Column({ type: 'text', unique: true, nullable: true })
  instagram: string;

  @Field((type) => [Appointment])
  @TypeormLoader()
  @ManyToMany(() => Appointment, (appointment) => appointment.customers)
  @JoinTable({ name: 'customer_appointments' })
  appointments: Appointment[];

  // @RelationId((customer: Customer) => customer.appointments)
  // appointmentIds: number[];

  @Field((type) => [Transaction])
  @TypeormLoader()
  @OneToMany(() => Transaction, (transaction) => transaction.customer)
  transactions: Transaction[];

  @Field((type) => [Item])
  @TypeormLoader()
  @OneToMany(() => Item, (item) => item.customer)
  items: Item[];

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  modifiedOn: Date;
}
