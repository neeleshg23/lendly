package com.lendly.backend.model;

public class Item {
    private Long id;
    private String category;
    private double insurancePrice;
    private boolean status;
    private long ownerId;
    private long borrowerId;

    public Item(){

    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public double getInsurancePrice() {
        return insurancePrice;
    }
    public void setInsurancePrice(double insurancePrice) {
        this.insurancePrice = insurancePrice;
    }
    public boolean isStatus() {
        return status;
    }
    public void setStatus(boolean status) {
        this.status = status;
    }
    public long getOwnerId() {
        return ownerId;
    }
    public void setOwnerId(long ownerId) {
        this.ownerId = ownerId;
    }
    public long getBorrowerId() {
        return borrowerId;
    }
    public void setBorrowerId(long borrowerId) {
        this.borrowerId = borrowerId;
    }
}
