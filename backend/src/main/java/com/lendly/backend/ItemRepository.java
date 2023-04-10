package com.lendly.backend;

import java.util.List;
import java.util.Optional;

import com.lendly.backend.model.Item;

public interface ItemRepository {
    List<Item> findAll();
    Optional<Item> findById(Long id);
    Item save(Item item);
    void deleteById(Long id);
}
