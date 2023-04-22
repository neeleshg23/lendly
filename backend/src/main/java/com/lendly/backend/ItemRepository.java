package com.lendly.backend;

import java.util.List;
import java.util.Optional;

import com.lendly.backend.model.Item;

public interface ItemRepository {
    List<Item> findAll();
    Optional<Item> findById(Long id);
<<<<<<< HEAD
    List<Item> findItemsByName(String id);
=======
    Optional<Item> getItemsByName(String id);
>>>>>>> d0114ee57e52aca3b36ea57fbe39b21cc00f762b
    Item save(Item item);
    void deleteById(Long id);
}
