import { Customer } from './../../entity/hair/Customer';
import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CustomerCreate implements Partial<Customer> {
  @Field({ nullable: false })
  fullName!: string;

  @Field({ defaultValue: '', nullable: true })
  location: string;

  @Field({ defaultValue: '', nullable: true })
  about?: string;

  @Field({ defaultValue: null, nullable: true })
  email?: string;

  @Field({ defaultValue: null, nullable: true })
  instagram?: string;
}

@InputType()
export class CustomerUpdate implements Partial<Customer> {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: false })
  fullName!: string;

  @Field({ defaultValue: '', nullable: true })
  location: string;

  @Field({ defaultValue: '', nullable: true })
  about?: string;

  @Field({ defaultValue: null, nullable: true })
  email?: string;

  @Field({ defaultValue: null, nullable: true })
  instagram?: string;
}
