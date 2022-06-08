package sweethair.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import sweethair.backend.model.Response;
import sweethair.backend.model.User;
import sweethair.backend.service.CognitoService;

import java.security.Principal;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private CognitoService cognitoService;

    @PostMapping("/signup")
    public Response createUser(@RequestBody User user) {
        Response response = new Response();
        response.setData(cognitoService.createUser(user.getEmail(), user.getType(), null));
        return response;
    }


    @GetMapping
    public Mono<Response> get(Principal user) {

        return Mono.just(Response.builder().data(user.getName()).build());
    }

    @GetMapping("/adminType")
//    @PreAuthorize("hasAuthority('ADMIN')")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Response getAdminUser(Principal user) {
        Response response = new Response();
        response.setData("User with Admin Type");
        return response;
    }

    @GetMapping("/userType")
//    @PreAuthorize("hasAuthority('USER')")
    @PreAuthorize("hasAuthority('USER')")
    public Response getUser(Principal user) {
        Response response = new Response();
        response.setData("User With User Type");
        return response;
    }

    @GetMapping("/userOrAdminType")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public Response getUserorAdmin(Principal user) {
        Response response = new Response();
        response.setData("User either With User Type or Admin Type");
        return response;
    }
}