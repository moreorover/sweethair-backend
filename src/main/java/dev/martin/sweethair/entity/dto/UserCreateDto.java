package dev.martin.sweethair.entity.dto;

import dev.martin.sweethair.entity.Role;

import java.io.Serializable;
import java.util.Optional;
import java.util.Set;

/**
 * A DTO for the {@link dev.martin.sweethair.entity.User} entity
 */
public record UserCreateDto(String fullName, String emailAddress, Optional<String> password, Optional<Set<Role>> roles) implements Serializable {
}