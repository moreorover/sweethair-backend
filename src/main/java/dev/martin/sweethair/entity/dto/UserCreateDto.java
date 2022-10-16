package dev.martin.sweethair.entity.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link dev.martin.sweethair.entity.User} entity
 */
public record UserCreateDto(String fullName, String emailAddress) implements Serializable {
}