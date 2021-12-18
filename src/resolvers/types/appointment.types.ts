import { Appointment } from './../../entity/hair/Appointment';
import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class AppointmentCreate implements Partial<Appointment> {
  @Field()
  scheduledAt!: Date;

  @Field()
  title!: string;
}

@InputType()
export class AppointmentUpdate implements Partial<Appointment> {
  @Field((type) => Int)
  id: number;

  @Field()
  scheduledAt: Date;

  @Field()
  title: string;
}
