import { InputType, Field } from 'type-graphql';

@InputType()
export class CustomerInput {
  @Field()
  fullName!: string;

  @Field()
  location?: string;

  @Field()
  about?: string;

  @Field()
  email?: string;

  @Field()
  instagram?: string;
}
