package dev.martin.sweethair.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import org.springframework.test.web.servlet.MvcResult;

/**
* AuthController Tester. 
* 
* @author <Authors name> 
* @since <pre>Oct 27, 2022</pre> 
* @version 1.0 
*/
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void tokenToReturnToken() throws Exception {
        MvcResult result = this.mockMvc.perform(post("/token")
                        .with(httpBasic("admin@gmail.com", "password")))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn();

        String token = result.getResponse().getContentAsString();

        assertNotNull(token);
        assertTrue(!token.isEmpty());
        assertTrue(!token.isBlank());
        assertTrue(token.contains("."));
    }

    @Test
    void tokenToNotReturnToken() throws Exception {
        MvcResult result = this.mockMvc.perform(post("/token")
                        .with(httpBasic("admin@gmail.com", "password11")))
                .andExpect(status().isUnauthorized())
                .andDo(print())
                .andReturn();

        String token = result.getResponse().getContentAsString();

        assertNotNull(token);
        assertTrue(token.isEmpty());
        assertTrue(token.isBlank());
        assertFalse(token.contains("."));
    }
} 
