package dev.martin.sweethair.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.martin.sweethair.entity.dto.AppointmentCreateDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
class AppointmentControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    ObjectMapper objectMapper;

    public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), StandardCharsets.UTF_8);

    @Test
    void rootWhenUnauthenticatedThen401() throws Exception {
        this.mvc.perform(get("/appointments"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void createAppointmentWhenAdmin() throws Exception {
        MvcResult result = this.mvc.perform(post("/token")
                        .with(httpBasic("admin@gmail.com", "password1")))
                .andExpect(status().isOk())
                .andReturn();

        String token = result.getResponse().getContentAsString();

        String r = objectMapper.writeValueAsString(new AppointmentCreateDto(new Date()));

        MvcResult result2 = this.mvc.perform(post("/appointments").contentType(APPLICATION_JSON_UTF8)
                        .header("Authorization", "Bearer " + token)
                        .content(r))
                .andExpect(status().isCreated())
                .andReturn();
        String newAppointment = result2.getResponse().getContentAsString();

        assertTrue(newAppointment.contains("\"scheduledDate\":"));
        assertTrue(newAppointment.contains("\"id\":"));
        assertTrue(newAppointment.contains("\"createDate\":"));
        assertTrue(newAppointment.contains("\"modifyDate\":"));
    }

    @Test
    void createAppointmentWhenManager() throws Exception {
        MvcResult result = this.mvc.perform(post("/token")
                        .with(httpBasic("manager@gmail.com", "password2")))
                .andExpect(status().isOk())
                .andReturn();

        String token = result.getResponse().getContentAsString();

        String r = objectMapper.writeValueAsString(new AppointmentCreateDto(new Date()));

        MvcResult result2 = this.mvc.perform(post("/appointments").contentType(APPLICATION_JSON_UTF8)
                        .header("Authorization", "Bearer " + token)
                        .content(r))
                .andExpect(status().isCreated())
                .andReturn();
        String newAppointment = result2.getResponse().getContentAsString();

        assertTrue(newAppointment.contains("\"scheduledDate\":"));
        assertTrue(newAppointment.contains("\"id\":"));
        assertTrue(newAppointment.contains("\"createDate\":"));
        assertTrue(newAppointment.contains("\"modifyDate\":"));
    }

    @Test
    void createAppointmentWhenAssistant() throws Exception {
        MvcResult result = this.mvc.perform(post("/token")
                        .with(httpBasic("assistant@gmail.com", "password3")))
                .andExpect(status().isOk())
                .andReturn();

        String token = result.getResponse().getContentAsString();

        String r = objectMapper.writeValueAsString(new AppointmentCreateDto(new Date()));

        this.mvc.perform(post("/appointments").contentType(APPLICATION_JSON_UTF8)
                        .header("Authorization", "Bearer " + token)
                        .content(r))
                .andExpect(status().isForbidden());
    }

    @Test
    void createAppointmentWhenUser() throws Exception {
        MvcResult result = this.mvc.perform(post("/token")
                        .with(httpBasic("user@gmail.com", "password4")))
                .andExpect(status().isOk())
                .andReturn();

        String token = result.getResponse().getContentAsString();

        String r = objectMapper.writeValueAsString(new AppointmentCreateDto(new Date()));

        this.mvc.perform(post("/appointments").contentType(APPLICATION_JSON_UTF8)
                        .header("Authorization", "Bearer " + token)
                        .content(r))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "admin@gmail.com", password = "password1", authorities = {"SCOPE_Admin"})
    public void rootWithMockUserStatusIsOK() throws Exception {
        this.mvc.perform(get("/")).andExpect(status().isOk());
    }
}