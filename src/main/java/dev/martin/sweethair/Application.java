package dev.martin.sweethair;

import dev.martin.sweethair.config.RsaKeyProperties;
import dev.martin.sweethair.entity.Role;
import dev.martin.sweethair.entity.dto.RoleCreateDto;
import dev.martin.sweethair.entity.dto.UserCreateDto;
import dev.martin.sweethair.service.RoleService;
import dev.martin.sweethair.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Profile("test")
    @Bean
    CommandLineRunner commandLineRunner(UserService userService, RoleService roleService) {
        return args -> {
            Role adminRole = roleService.createRole(new RoleCreateDto("Admin"));
            Role managerRole = roleService.createRole(new RoleCreateDto("Manager"));
            Role assistantRole = roleService.createRole(new RoleCreateDto("Assistant"));
            Role userRole = roleService.createRole(new RoleCreateDto("User"));
            userService.createUser(new UserCreateDto("Admin", "admin@gmail.com", Optional.of("password"), Optional.of(new HashSet<>(Arrays.asList(adminRole, managerRole, assistantRole, userRole)))));
            userService.createUser(new UserCreateDto("Manager", "manager@gmail.com", Optional.of("password"), Optional.of(new HashSet<>(Arrays.asList(managerRole, assistantRole, userRole)))));
            userService.createUser(new UserCreateDto("Assistant", "assistant@gmail.com", Optional.of("password"), Optional.of(new HashSet<>(Arrays.asList(assistantRole, userRole)))));
            userService.createUser(new UserCreateDto("User", "user@gmail.com", Optional.of("password"), Optional.of(new HashSet<>(Arrays.asList(userRole)))));
        };
    }

}
