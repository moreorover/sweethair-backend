import { Appointment } from './../entity/hair/Appointment';
import { AppointmentService } from './../services/appointment.service';
import { Resolver, Query, UseMiddleware } from 'type-graphql';
import { isAuth } from '../middleware/isAUth';

@Resolver()
export class AppointmentResolver {
  @Query(() => [Appointment])
  @UseMiddleware(isAuth)
  appointments() {
    const service: AppointmentService = new AppointmentService(Appointment);
    return service.all();
  }
}
