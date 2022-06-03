package sweethair.backend.controller;

import java.io.Serializable;

public record RegistrationDto(String username, String password, String fullName) implements Serializable {
}