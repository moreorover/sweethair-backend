import { Item } from './Item';
import { Transaction } from './Transaction';
import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ObjectType, Field, Float, Int } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@ObjectType()
@Entity()
@Expose()
export class Invoice extends BaseEntity {
  @Field((_type) => Int)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field((_type) => Float)
  @Column('float', { precision: 11, scale: 2 })
  total!: number;

  @Field()
  @Column({ default: false, type: 'boolean' })
  isReceived!: boolean;

  @Field()
  @Column({ default: false, type: 'boolean' })
  isPaid!: boolean;

  @Field()
  @Column({ default: null })
  scheduledAt!: Date;

  @Field((type) => [Transaction])
  @TypeormLoader()
  @OneToMany(() => Transaction, (transaction) => transaction.invoice, {
    cascade: true,
  })
  transactions: Transaction[];

  @Field((type) => [Item])
  @TypeormLoader()
  @OneToMany(() => Item, (item) => item.invoice)
  items: Item[];

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  modifiedOn: Date;
}
