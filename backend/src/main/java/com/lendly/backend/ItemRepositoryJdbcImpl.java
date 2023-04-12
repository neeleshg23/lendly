package com.lendly.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.lendly.backend.model.Item;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class ItemRepositoryJdbcImpl implements ItemRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final RowMapper<Item> ITEM_ROW_MAPPER = new RowMapper<Item>() {
        @Override
        public Item mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            Item item = new Item();
            item.setId(resultSet.getLong("ItemID"));
            item.setCategory(resultSet.getString("Category"));
            item.setInsurancePrice(resultSet.getDouble("InsurancePrice"));
            item.setStatus(resultSet.getBoolean("Status"));
            item.setOwnerId(resultSet.getLong("OwnerID"));
            item.setBorrowerId(resultSet.getLong("BorrowerID"));
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
    public Item save(Item item) {
        if (item.getId() == null) {
            // Update existing item
            String sql = "UPDATE Items SET Category = ?, InsurancePrice = ?, Status = ?, OwnerID = ?, BorrowerID = ?, Name = ? WHERE ItemID = ?";
            jdbcTemplate.update(sql, item.getCategory(), item.getInsurancePrice(), item.isStatus(), item.getOwnerId(), item.getBorrowerId(), item.getId(), item.getName());
        } else {
            // Insert new item
            String sql = "INSERT INTO Items (Category, InsurancePrice, Status, OwnerID, BorrowerID, Name) VALUES (?, ?, ?, ?, ?, ?)";
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                    PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                    ps.setString(1, item.getCategory());
                    ps.setDouble(2, item.getInsurancePrice());
                    ps.setBoolean(3, item.isStatus());
                    ps.setLong(4, item.getOwnerId());
                    if (item.getBorrowerId() != 0) {
                        ps.setLong(5, item.getBorrowerId());
                    } else {
                        ps.setNull(5, java.sql.Types.BIGINT);
                    }
                    ps.setString(6, item.getName());
                    return ps;
                }
            }, keyHolder);
            long generatedId = keyHolder.getKey().longValue();
            item.setId(generatedId);
        }
        return findById(item.getId()).orElse(null);
    }



    @Override
    public void deleteById(Long id) {
        String sql = "DELETE FROM Items WHERE ItemID = ?";
        jdbcTemplate.update(sql, id);
    }
}
