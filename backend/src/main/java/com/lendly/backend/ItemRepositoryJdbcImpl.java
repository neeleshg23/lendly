package com.lendly.backend;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.lendly.backend.model.Item;

@Repository
public class ItemRepositoryJdbcImpl implements ItemRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    static final RowMapper<Item> ITEM_ROW_MAPPER = new RowMapper<Item>() {
        @Override
        public Item mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            Item item = new Item();
            item.setId(resultSet.getLong("ItemID"));
            item.setCategory(resultSet.getString("Category"));
            item.setDescription(resultSet.getString("Description"));
            item.setInsurancePrice(resultSet.getDouble("InsurancePrice"));
            item.setStatus(resultSet.getBoolean("Status"));
            item.setOwnerId(resultSet.getLong("OwnerID"));
            item.setBorrowerId(resultSet.getLong("BorrowerID"));
            item.setName(resultSet.getString("Name"));
            return item;
        }
    };


    @Override
    public List<Item> findAll() {
        String sql = "SELECT * FROM Items";
        return jdbcTemplate.query(sql, ITEM_ROW_MAPPER);
    }

    @Override
    public Optional<Item> findById(Long id) {
        String sql = "SELECT * FROM Items WHERE ItemID = ?";
        try {
            Item item = jdbcTemplate.queryForObject(sql, ITEM_ROW_MAPPER, id);
            return Optional.ofNullable(item);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public List<Item> findItemsByName(String id){
        String sql = "SELECT * FROM Items WHERE name LIKE ?";
        return jdbcTemplate.query(sql, ITEM_ROW_MAPPER, "%"+id+"%"); 
    }

    @Override
    public Item save(Item item) {
        if (item.getId() == null) {
            // Update existing item
            String sql = "INSERT INTO Items (Category, InsurancePrice, Status, OwnerID, BorrowerID, Name, Description) VALUES (?, ?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql, item.getCategory(), item.getInsurancePrice(), item.isStatus(), item.getOwnerId(), item.getBorrowerId(), item.getName(), item.getDescription());
        } else {
            // Insert new item
            String sql = "UPDATE Items SET Category = ?, InsurancePrice = ?, Status = ?, OwnerID = ?, BorrowerID = ?, Name = ?, Description = ? WHERE ItemID = ?";
            jdbcTemplate.update(sql, item.getCategory(), item.getInsurancePrice(), item.isStatus(), item.getOwnerId(), item.getBorrowerId(), item.getName(), item.getDescription(), item.getId());
        }
        return findById(item.getId()).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        String sql = "DELETE FROM Items WHERE ItemID = ?";
        jdbcTemplate.update(sql, id);
    }
}
