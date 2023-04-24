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

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@EnableAsync
@RequestMapping("/api/items")
@CrossOrigin(origins = {"http://frontend-dot-lendly-383321.wl.r.appspot.com", "https://frontend-dot-lendly-383321.wl.r.appspot.com"})
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    @Async
    public CompletableFuture<List<Item>> getAllItems() {
        return CompletableFuture.completedFuture(itemRepository.findAll());
    }

    @GetMapping("/{id}")
    @Async
    public CompletableFuture<ResponseEntity<Item>> getItemById(@PathVariable Long id) {
        return CompletableFuture.completedFuture(
                itemRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build())
        );
    }

    @GetMapping("/name/{id}")
    @Async
    public CompletableFuture<List<Item>> getItemsByName(@PathVariable String id) {
        return CompletableFuture.completedFuture(itemRepository.findItemsByName(id));
    }

    @PostMapping
    @Async
    public CompletableFuture<ResponseEntity<Item>> createItem(@RequestBody Item item) {
        Item savedItem = itemRepository.save(item);
        return CompletableFuture.completedFuture(ResponseEntity.ok(savedItem));
    }

    @PutMapping("/{id}")
    @Async
    public CompletableFuture<ResponseEntity<Item>> updateItem(@PathVariable Long id, @RequestBody Item item) {
        return CompletableFuture.completedFuture(
                itemRepository.findById(id)
                    .map(existingItem -> {
                        item.setId(existingItem.getId());
                        Item updatedItem = itemRepository.save(item);
                        return ResponseEntity.ok(updatedItem);
                    })
                    .orElse(ResponseEntity.notFound().build())
        );
    }

    @DeleteMapping("/{id}")
    @Async
    public CompletableFuture<ResponseEntity<Object>> deleteItem(@PathVariable Long id) {
        return CompletableFuture.completedFuture(
                itemRepository.findById(id)
                    .map(existingItem -> {
                        itemRepository.deleteById(id);
                        return ResponseEntity.noContent().build();
                    })
                    .orElse(ResponseEntity.notFound().build())
        );
    }
}