package dev.martin.sweethair.service;

import dev.martin.sweethair.entity.Appointment;
import dev.martin.sweethair.entity.dto.AppointmentCreateDto;
import dev.martin.sweethair.repository.AppointmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    Logger logger = LoggerFactory.getLogger(AppointmentService.class);

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public Appointment create(AppointmentCreateDto appointmentCreateDto) {
        this.logger.info(String.format("RoleCreateDto scheduledDate: %s", appointmentCreateDto.scheduledDate()));
        Appointment appointment = new Appointment();
        appointment.setScheduledTime(appointmentCreateDto.scheduledDate());

        try {
            this.appointmentRepository.save(appointment);
            this.logger.info(String.format("Appointment created: %s", appointment));
            return appointment;
        } catch (Exception e) {
            this.logger.info(String.format("Failed to create Appointment: %s", appointmentCreateDto));
            return null;
        }
    }
}
