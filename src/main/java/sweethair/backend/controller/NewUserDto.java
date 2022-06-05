package sweethair.backend.controller;

import java.io.Serializable;

public record NewUserDto(String username, String password) implements Serializable {
}
