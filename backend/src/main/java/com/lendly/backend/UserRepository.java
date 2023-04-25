package com.lendly.backend;

import java.util.List;
import java.util.Optional;

import com.lendly.backend.model.Item;
import com.lendly.backend.model.User;

public interface UserRepository {
    List<User> findAll();
    Optional<User> findByEmail(String email);
    int findUserIdByEmail(String email);
    User save(User user);
    Optional<User> findById(Long id);
    void deleteById(Long id);
    List<Item> findOwnedItems(Long id);
    List<Item> findBorrowedItems(Long id);
}
