package com.bookstore.backend.Controllers;

import com.bookstore.backend.DTO.LoginRequestDTO;
import com.bookstore.backend.DTO.RegisterRequestDTO;
import com.bookstore.backend.Models.User;
import com.bookstore.backend.Services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication Controller", description = "Controller for registration and login")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;

    }

    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Method creates a new account for user")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO regDTO) {
        if(userService.findByEmail(regDTO.getEmail()).isPresent()){
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = User.builder()
                .username(regDTO.getUsername())
                .email(regDTO.getEmail())
                .password(regDTO.getPassword())
                .role("ROLE_USER")
                .build();

        userService.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    @Operation(summary = "User login", description = "Method allows user to log in")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO loginDTO) {

        return userService.findByEmail(loginDTO.getEmail())
                .map( user -> {
                    if(user.getPassword().equals(loginDTO.getPassword())){
                        return ResponseEntity.ok("Logged in successfully");
                    } else{
                        return ResponseEntity.badRequest().body("Wrong password");
                    }
                }).orElse(ResponseEntity.badRequest().body("Wrong password or email"));
    }
}
