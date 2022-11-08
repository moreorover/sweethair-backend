package dev.martin.sweethair.controller;

import dev.martin.sweethair.entity.Appointment;
import dev.martin.sweethair.entity.dto.AppointmentCreateDto;
import dev.martin.sweethair.model.RecordAlreadyExist;
import dev.martin.sweethair.model.RecordDoesNotExist;
import dev.martin.sweethair.service.AppointmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "/appointments", produces = "application/json")
public class AppointmentController {

    private static final Logger LOG = LoggerFactory.getLogger(AuthController.class);

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_Admin', 'SCOPE_Manager')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Appointment> findAll(Principal principal) {
        LOG.info(String.format("User %s viewing all appointments.", principal.getName()));
        return this.appointmentService.findAll();
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_Admin', 'SCOPE_Manager')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Appointment create(Principal principal, @RequestBody AppointmentCreateDto dto) {
        LOG.info(String.format("User %s trying to create appointment", principal.getName()));

        Appointment appointment = this.appointmentService.create(dto);

        if (appointment == null) {
            throw new RecordAlreadyExist();
        }
        return appointment;
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_Admin', 'SCOPE_Manager')")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(Principal principal, @PathVariable("id") long id, @RequestBody AppointmentCreateDto dto) {
        LOG.info(String.format("User %s trying to create appointment", principal.getName()));

        this.appointmentService.update(id, dto);
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_Admin', 'SCOPE_Manager')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(Principal principal, @PathVariable("id") long id) {
        LOG.info(String.format("User %s trying to delete appointment.", principal.getName()));
        try {
            this.appointmentService.delete(id);
        } catch (Exception e) {
            throw new RecordDoesNotExist();
        }
    }
}
