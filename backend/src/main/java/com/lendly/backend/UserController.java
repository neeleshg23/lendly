package com.lendly.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
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
import java.util.concurrent.CompletableFuture;

@RestController
@EnableAsync
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://frontend-dot-lendly-383321.wl.r.appspot.com", "https://frontend-dot-lendly-383321.wl.r.appspot.com"})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    @Async
    public CompletableFuture<List<User>> getAllUsers() {
        return CompletableFuture.completedFuture(userRepository.findAll());
    }

    @GetMapping("/{email}")
    @Async
    public CompletableFuture<ResponseEntity<User>> getUserByEmail(@PathVariable String email) {
        return CompletableFuture.completedFuture(
                userRepository.findByEmail(email)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build())
        );
    }

    @GetMapping("/userid/{email}")
    @Async
    public CompletableFuture<Integer> getUserIdByEmail(@PathVariable String email) {
        return CompletableFuture.completedFuture(userRepository.findUserIdByEmail(email));
    }

    @GetMapping("/userbyid/{userID}")
    @Async
    public CompletableFuture<ResponseEntity<User>> getUserByID(@PathVariable Long userID) {
        return CompletableFuture.completedFuture(
                userRepository.findById(userID)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build())
        );
    }

    @PostMapping
    @Async
    public CompletableFuture<ResponseEntity<User>> createUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return CompletableFuture.completedFuture(ResponseEntity.ok(savedUser));
    }

    @PutMapping("/{id}")
    @Async
    public CompletableFuture<ResponseEntity<User>> updateUser(@PathVariable Long id, @RequestBody User user) {
        return CompletableFuture.completedFuture(
                userRepository.findById(id)
                    .map(existingUser -> {
                        user.setId(existingUser.getId());
                        User updatedUser = userRepository.save(user);
                        return ResponseEntity.ok(updatedUser);
                    })
                    .orElse(ResponseEntity.notFound().build())
        );
    }

    @DeleteMapping("/{id}")
    @Async
    public CompletableFuture<ResponseEntity<Object>> deleteUser(@PathVariable Long id) {
        return CompletableFuture.completedFuture(
                userRepository.findById(id)
                    .map(existingUser -> {
                        userRepository.deleteById(id);
                        return ResponseEntity.noContent().build();
                    })
                    .orElse(ResponseEntity.notFound().build())
        );
    }

    @GetMapping("/{id}/owned-items")
    @Async
    public CompletableFuture<ResponseEntity<List<Item>>> getOwnedItemsByUserId(@PathVariable Long id) {
        return CompletableFuture.completedFuture(
                userRepository.findById(id)
                    .map(user -> {
                        List<Item> ownedItems = userRepository.findOwnedItems(id);
                        return ResponseEntity.ok(ownedItems);
                    })
                    .orElse(ResponseEntity.notFound().build())
        );
    }

    @GetMapping("/{id}/borrowed-items")
    @Async
    public CompletableFuture<ResponseEntity<List<Item>>> getBorrowedItemsByUserId(@PathVariable Long id) {
        return CompletableFuture.completedFuture(
                userRepository.findById(id)
                    .map(user -> {
                        List<Item> borrowedItems = userRepository.findBorrowedItems(id);
                        return ResponseEntity.ok(borrowedItems);
                    })
                    .orElse(ResponseEntity.notFound().build())
        );
    }
}
