package com.bookstore.backend.Services;

import com.bookstore.backend.Models.User;
import com.bookstore.backend.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User save(User user){
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Integer id){
        return userRepository.findById(id);
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public void deleteById(Integer id){
        userRepository.deleteById(id);
    }

    public Optional<User> updateUser(Integer id, User updatedUser) {
        return userRepository.findById(id)
                .map(existingUser -> {

                    existingUser.setUsername(updatedUser.getUsername());
                    existingUser.setEmail(updatedUser.getEmail());

                    //temporary before BCrypt
                    if (updatedUser.getPassword() != null) {
                        existingUser.setPassword(updatedUser.getPassword());
                    }

                    //temporary before admin panel
                    if (updatedUser.getRole() != null) {
                        existingUser.setRole(updatedUser.getRole());
                    }

                    return userRepository.save(existingUser);
                });
    }
}
