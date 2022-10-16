package dev.martin.sweethair.service;

import dev.martin.sweethair.controller.UserController;
import dev.martin.sweethair.entity.User;
import dev.martin.sweethair.entity.dto.UserCreateDto;
import dev.martin.sweethair.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    Logger logger = LoggerFactory.getLogger(UserService.class);

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    public User createUser(UserCreateDto userCreateDto) {
        this.logger.info(String.format("UserCreateDto fullName: %s email: %s", userCreateDto.fullName(), userCreateDto.emailAddress()));
        User newUser = new User();
        newUser.setFullName(userCreateDto.fullName());
        newUser.setEmailAddress(userCreateDto.emailAddress());

        try {
            this.userRepository.save(newUser);
            this.logger.info(String.format("User created: %s", newUser));
            return newUser;
        } catch (Exception e) {
            this.logger.info(String.format("Failed to create User with for: UserCreateDto fullName: %s email: %s", userCreateDto.fullName(), userCreateDto.emailAddress()));
            return null;
        }
    }
}
