package com.bookstore.backend.Services;

import com.bookstore.backend.DTO.UpdateRequestDTO;
import com.bookstore.backend.DTO.UserDTO;
import com.bookstore.backend.Models.User;
import com.bookstore.backend.Repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User save(User user){
        logger.info("Saving user {}", user.getId());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean checkPassword(User user, String rawPassword){
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    public Optional<User> findByEmail(String email){
        logger.info("Finding user by email {}", email);
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Integer id){
        logger.info("Finding user by id {}", id);
        return userRepository.findById(id);
    }

    public List<User> findAll(){
        logger.info("Finding all users");
        return userRepository.findAll();
    }


    public boolean deleteById(Integer id) {
        logger.info("Deleting user {}", id);
        return userRepository.findById(id)
                .map(user -> {
                    userRepository.delete(user);
                    return true;
                })
                .orElse(false);
    }


    public Optional<User> updateUser(Integer id, UpdateRequestDTO requestDTO) {
        logger.info("Updating user {}", id);
        return userRepository.findById(id)
                .map(user -> {

                    if (requestDTO.getUsername() != null) {
                        user.setUsername(requestDTO.getUsername());
                    }

                    if (requestDTO.getEmail() != null) {
                        user.setEmail(requestDTO.getEmail());
                    }

                    // Temporary without bcrypt
                    if (requestDTO.getPassword() != null) {
                        user.setPassword(requestDTO.getPassword());
                    }

                    return userRepository.save(user);
                });
    }

    public UserDTO mapToDTO(User user){
        logger.info("Mapping user {}", user.getId());
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
