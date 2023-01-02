package dev.martin.sweethair.controller;

import dev.martin.sweethair.entity.User;
import dev.martin.sweethair.repository.UserRepository;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class UserGraphController {

    private final UserRepository userRepository;

    public UserGraphController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @QueryMapping
    public User user(@AuthenticationPrincipal Principal principal) {
        return userRepository.findByEmailAddress(principal.getName()).get();
    }
}
