package com.lendly.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.lendly.backend.model.Item;
import com.lendly.backend.model.User;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepositoryJdbcImpl implements UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    static final RowMapper<User> USER_ROW_MAPPER = new RowMapper<User>() {
        @Override
        public User mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            User user = new User();
            user.setId(resultSet.getLong("UserID"));
            user.setEmail(resultSet.getString("Email"));
            user.setPassword(resultSet.getString("Password"));
            user.setDisplayName(resultSet.getString("Username"));
            user.setLocation(resultSet.getString("Location"));
            user.setRating(resultSet.getDouble("Rating"));
            return user;
        }
    };

    @Override
    public List<User> findAll() {
        String sql = "SELECT * FROM Users";
        return jdbcTemplate.query(sql, USER_ROW_MAPPER);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        String sql = "SELECT * FROM Users WHERE Email = ?";
        try {
            User user = jdbcTemplate.queryForObject(sql, USER_ROW_MAPPER, email);
            return Optional.ofNullable(user);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public User save(User user) {
        if (user.getId() == null) {
            // Insert new user
            String sql = "INSERT INTO Users (Email, Password, Username, Location, Rating) VALUES (?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql, user.getEmail(), user.getPassword(), user.getDisplayName(), user.getLocation(), user.getRating());
        } else {
            // Update existing user
            String sql = "UPDATE Users SET Email = ?, Password = ?, Username = ?, Location = ?, Rating = ? WHERE UserID = ?";
            jdbcTemplate.update(sql, user.getEmail(), user.getPassword(), user.getDisplayName(), user.getLocation(), user.getRating(), user.getId());
        }
        return findByEmail(user.getEmail()).orElse(null);
    }

    @Override
    public Optional<User> findById(Long id) {
        String sql = "SELECT * FROM Users WHERE UserID = ?";
        try {
            User user = jdbcTemplate.queryForObject(sql, USER_ROW_MAPPER, id);
            return Optional.ofNullable(user);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    // @Override
    // public int findUserIdByEmail(String email) {
    //     String sql = "SELECT id FROM Users WHERE UserID = ?";
    //     // try {
    //         int userID = jdbcTemplate.query(sql, USER_ROW_MAPPER, email);
    //         return userID;
    //     // } catch (EmptyResultDataAccessException e) {
    //     //     return Optional.empty();
    //     // }
    // }

    @Override
    public int findUserIdByEmail(String email) {
        String sql = "SELECT UserID FROM Users WHERE Email = ?";
        return jdbcTemplate.queryForObject(sql, Integer.class, email);
    }

    @Override
    public void deleteById(Long id) {
        String sql = "DELETE FROM Users WHERE UserID = ?";
        jdbcTemplate.update(sql, id);
    }

    @Override
    public List<Item> findOwnedItems(Long id) {
        String sql = "SELECT * FROM Items WHERE OwnerID = ?";
        return jdbcTemplate.query(sql, ItemRepositoryJdbcImpl.ITEM_ROW_MAPPER, id);
    }

    @Override
    public List<Item> findBorrowedItems(Long id) {
        String sql = "SELECT * FROM Items WHERE BorrowerID = ?";
        return jdbcTemplate.query(sql, ItemRepositoryJdbcImpl.ITEM_ROW_MAPPER, id);
    }
}
