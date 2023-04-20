package com.lendly.backend;

import com.google.gson.Gson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lendly.backend.model.Item;
import com.lendly.backend.model.User;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://frontend-dot-lendly-383321.wl.r.appspot.com", "https://frontend-dot-lendly-383321.wl.r.appspot.com"})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private final Gson gson = new Gson();

    @GetMapping(produces = "application/json")
    public String getAllUsers() {
        List<User> users = userRepository.findAll();
        return gson.toJson(users);
    }

    @GetMapping(value = "/{email}", produces = "application/json")
    public ResponseEntity<String> getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email)
                .map(user -> ResponseEntity.ok(gson.toJson(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(gson.toJson(savedUser));
    }

    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User user) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    user.setId(existingUser.getId());
                    User updatedUser = userRepository.save(user);
                    return ResponseEntity.ok(gson.toJson(updatedUser));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    userRepository.deleteById(id);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(value = "/{id}/owned-items", produces = "application/json")
    public ResponseEntity<String> getOwnedItemsByUserId(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    List<Item> ownedItems = userRepository.findOwnedItems(id);
                    return ResponseEntity.ok(gson.toJson(ownedItems));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(value = "/{id}/borrowed-items", produces = "application/json")
    public ResponseEntity<String> getBorrowedItemsByUserId(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    List<Item> borrowedItems = userRepository.findBorrowedItems(id);
                    return ResponseEntity.ok(gson.toJson(borrowedItems));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}