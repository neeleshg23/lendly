package com.example.backend;

import java.util.List;

public interface UserRepository {
    List<User> findAll();
}
