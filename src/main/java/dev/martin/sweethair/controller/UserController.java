package dev.martin.sweethair.controller;

import dev.martin.sweethair.entity.User;
import dev.martin.sweethair.entity.dto.UserCreateDto;
import dev.martin.sweethair.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_Admin', 'SCOPE_Manager')")
    @GetMapping("/users")
    @ResponseStatus(HttpStatus.OK)
    public List<User> users(Principal principal) {
        this.logger.info(String.format("User %s viewing all users.", principal.getName()));
        return this.userService.findAll();
    }

    @PreAuthorize("hasAnyAuthority('Admin')")
    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(Principal principal, @RequestBody UserCreateDto userCreateDto) {
        this.logger.info(String.format("User %s trying to create user", principal.getName()));

        User newUser = this.userService.createUser(userCreateDto);

        if (newUser == null) {
            throw new RecordAlreadyExist();
        }
        return newUser;
    }
}
