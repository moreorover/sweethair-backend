package sweethair.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import sweethair.backend.entity.User;
import sweethair.backend.repository.UserRepository;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

//    private UserRepository userRepo;
//    private PasswordEncoder passwordEncoder;
//
//    public AuthController(
//            UserRepository userRepo, PasswordEncoder passwordEncoder) {
//        this.userRepo = userRepo;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    @GetMapping("/me")
//    public ResponseEntity<String> me(){
//        return ResponseEntity.ok().body("Me");
//    }
//
//    @PostMapping("/")
//    public ResponseEntity<User> processRegistration(@RequestBody RegistrationDto form) {
//        User user = new User();
//        user.setPassword(this.passwordEncoder.encode(form.password()));
//        user.setFullName(form.fullName());
//        user.setUsername(form.username());
//        User savedUser = userRepo.save(user);
//
//        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
//                .path("/api/v1/users/{id}")
//                .buildAndExpand(savedUser.getId())
//                .toUri();
//        return ResponseEntity.created(uri).body(savedUser);
//    }

}
