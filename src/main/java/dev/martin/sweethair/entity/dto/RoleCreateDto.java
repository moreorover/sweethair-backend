package dev.martin.sweethair.entity.dto;

public record RoleCreateDto(String name) {

    @Override
    public String toString() {
        return "RoleCreateDto{" +
                "name='" + name + '\'' +
                '}';
    }
}
