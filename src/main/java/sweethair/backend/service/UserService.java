package sweethair.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sweethair.backend.config.JwtTokenProvider;
import sweethair.backend.controller.NewUserDto;
import sweethair.backend.entity.User;
import sweethair.backend.exception.CustomException;
import sweethair.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    public String signup(NewUserDto userDto) {

        if (!userRepository.existsByUsername(userDto.username())) {
            User user = new User();
            user.setFullName(userDto.username());
            user.setUsername(userDto.username());
            user.setPassword(passwordEncoder.encode(userDto.password()));
            userRepository.save(user);
            return jwtTokenProvider.createToken(user.getUsername(), user.getAuthorities().stream().toList());
        } else {
            throw new CustomException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    public String signin(String username, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            return jwtTokenProvider.createToken(username, userRepository.findByUsername(username).getAuthorities().stream().toList());
        } catch (AuthenticationException e) {
            throw new CustomException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
