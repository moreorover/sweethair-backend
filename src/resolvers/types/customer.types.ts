import { InputType, Field, ID, Int } from 'type-graphql';

@InputType()
export class CustomerInput {
  //   @Field((type) => ID)
  //   recipeId: string;

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
