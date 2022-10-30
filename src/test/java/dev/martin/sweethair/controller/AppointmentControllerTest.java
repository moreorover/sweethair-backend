package dev.martin.sweethair.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.martin.sweethair.entity.dto.AppointmentCreateDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
class AppointmentControllerTest {

    @Autowired
    MockMvc mvc;

    ObjectMapper objectMapper;

    @Test
    void rootWhenUnauthenticatedThen401() throws Exception {
        this.mvc.perform(get("/appointments"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void createAppointmentWhenAdmin() throws Exception {
        MvcResult result = this.mvc.perform(post("/token")
                        .with(httpBasic("admin@gmail.com", "password")))
                .andExpect(status().isOk())
                .andReturn();

        String token = result.getResponse().getContentAsString();

        MvcResult result2 = this.mvc.perform(get("/appointments")
                        .header("Authorization", "Bearer " + token)
                        .content(objectMapper.writeValueAsString(new AppointmentCreateDto(new Date()))))
                .andExpect(status().isCreated())
                .andReturn();
        String newAppointment = result2.getResponse().getContentAsString();

        assertTrue(newAppointment.contains("\"scheduledDate\":"));
        assertTrue(newAppointment.contains("\"id\":"));
        assertTrue(newAppointment.contains("\"createDate\":"));
        assertTrue(newAppointment.contains("\"modifyDate\":"));
    }

    @Test
    @WithMockUser
    public void rootWithMockUserStatusIsOK() throws Exception {
        this.mvc.perform(get("/")).andExpect(status().isOk());
    }
}