package com.bookstore.backend.Controllers;

import com.bookstore.backend.DTO.UpdateRequestDTO;
import com.bookstore.backend.DTO.UserDTO;
import com.bookstore.backend.Services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
@Tag(name = "User Controller", description = "API for user management")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get")
    @Operation(summary = "Get all users", description = "Method returns list with all users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {

        List<UserDTO> user = userService.findAll()
                .stream()
                .map(userService::mapToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(user);
    }

    @GetMapping("/get/{id}")
    @Operation(summary = "Get user by ID", description = "Method returns a specific user by its ID")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Integer id) {

        return userService.findById(id)
                .map(userService::mapToDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    @Operation(summary = "Update book", description = "Method updates an existing book by ID")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Integer id,
                                              @RequestBody UpdateRequestDTO updateRequestDTO) {

        return userService.updateUser(id, updateRequestDTO)
                .map(userService::mapToDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete user", description = "Method deletes a specific user by its ID")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {

        if(userService.findById(id).isPresent()) {
            userService.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        }

        return ResponseEntity.notFound().build();
    }
}
