package dev.martin.sweethair.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(value = "/", produces = "application/json")
public class HomeController {

    @PreAuthorize("hasAnyAuthority('SCOPE_Admin', 'SCOPE_Manager', 'SCOPE_Assistant', 'SCOPE_User')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public String home(Principal principal) {
        return "Hello, " + principal.getName();
    }

    @PreAuthorize("hasAuthority('SCOPE_Admin')")
    @GetMapping("/secure")
    public String secure() {
        return "This is secured!";
    }
}
