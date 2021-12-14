import { Customer } from './Customer';
import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Transaction } from './Transaction';
import { Expose } from 'class-transformer';
import { Item } from './Item';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
@Expose()
export class Appointment extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  scheduledAt!: Date;

  @Field()
  @Column({ default: '', nullable: true })
  title: string;

  @Field((type) => [Customer])
  @ManyToMany(() => Customer, (customer) => customer.appointments)
  customers: Customer[];

  @Field((type) => [Transaction])
  @OneToMany(() => Transaction, (transaction) => transaction.appointment)
  transactions: Transaction[];

  @Field((type) => [Item])
  @OneToMany(() => Item, (item) => item.appointment)
  items: Item[];

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  modifiedOn: Date;
}
