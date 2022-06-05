package sweethair.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import sweethair.backend.service.UserService;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

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

    @PostMapping(consumes="application/json", path = "/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public String save(@RequestBody NewUserDto newUserDto){
        return this.userService.signup(newUserDto);
    }

    @PostMapping(consumes="application/json", path = "/signin")
    @ResponseStatus(HttpStatus.CREATED)
    public String signin(@RequestBody NewUserDto newUserDto){
        return this.userService.signin(newUserDto.username(), newUserDto.password());
    }

}
