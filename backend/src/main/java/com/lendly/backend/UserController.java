package com.lendly.backend;

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

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    
    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/userid/{email}")
    public int getUserIdByEmail(@PathVariable String email) {
        return userRepository.findUserIdByEmail(email);
    }

    // added new User findUserByID(int userID)

    @GetMapping("/userbyid/{userID}")
    public ResponseEntity<User> getUserByID(@PathVariable Long userID) {
        return userRepository.findById(userID)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
        //return fetchedUser;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    user.setId(existingUser.getId());
                    User updatedUser = userRepository.save(user);
                    return ResponseEntity.ok(updatedUser);
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

    @GetMapping("/{id}/owned-items")
    public ResponseEntity<List<Item>> getOwnedItemsByUserId(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    List<Item> ownedItems = userRepository.findOwnedItems(id);
                    return ResponseEntity.ok(ownedItems);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/borrowed-items")
    public ResponseEntity<List<Item>> getBorrowedItemsByUserId(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    List<Item> borrowedItems = userRepository.findBorrowedItems(id);
                    return ResponseEntity.ok(borrowedItems);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}