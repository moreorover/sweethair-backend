package dev.martin.sweethair.service;

import dev.martin.sweethair.entity.Role;
import dev.martin.sweethair.entity.dto.RoleCreateDto;
import dev.martin.sweethair.repository.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    Logger logger = LoggerFactory.getLogger(RoleService.class);

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role createRole(RoleCreateDto roleCreateDto) {
        this.logger.info(String.format("RoleCreateDto name: %s", roleCreateDto.name()));
        Role newRole = new Role();
        newRole.setName(roleCreateDto.name());

        try {
            this.roleRepository.save(newRole);
            this.logger.info(String.format("Role created: %s", newRole));
            return newRole;
        } catch (Exception e) {
            this.logger.info(String.format("Failed to create Role: %s", roleCreateDto));
            return null;
        }
    }
}
