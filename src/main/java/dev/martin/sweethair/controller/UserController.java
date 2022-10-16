package dev.martin.sweethair.controller;

import dev.martin.sweethair.entity.User;
import dev.martin.sweethair.entity.dto.UserCreateDto;
import dev.martin.sweethair.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasAuthority('SCOPE_read')")
    @GetMapping("/users")
    public List<User> users() {
        return userRepository.findAll();
    }

    @PreAuthorize("hasAuthority('SCOPE_read')")
    @PostMapping("/users")
    public User createUser(@RequestBody UserCreateDto userCreateDto) {
        User newUser = new User();
        newUser.setEmailAddress(userCreateDto.emailAddress());
        newUser.setFullName(userCreateDto.fullName());
        this.userRepository.save(newUser);

        return newUser;
    }
}
