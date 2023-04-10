package com.example.backend;

import java.util.List;
import java.util.Optional;

import com.example.backend.model.User;

public interface UserRepository {
    List<User> findAll();
    Optional<User> findByEmail(String email);
    User save(User user);
    Optional<User> findById(Long id);
    void deleteById(Long id);
}
