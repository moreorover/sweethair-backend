import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class AppointmentCreate {
  @Field()
  scheduledAt!: Date;

  @Field()
  title!: string;
}

@InputType()
export class AppointmentUpdate {
  @Field()
  scheduledAt?: Date;

  @Field()
  title?: string;
}

@InputType()
export class AppointmentCustomersUpdate {
  @Field()
  appointmentId!: number;

  //   @Field((type) => [ID!]!)
  //   customers!: number[];
}
