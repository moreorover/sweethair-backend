import { AppointmentCreateDto } from './../controllers/dtos/appointment/appointment-create.dto';
import { Appointment } from './../entity/hair/Appointment';
import { AbstractService } from './abstract.service';

export class AppointmentService extends AbstractService<
  Appointment,
  AppointmentCreateDto
> {}
