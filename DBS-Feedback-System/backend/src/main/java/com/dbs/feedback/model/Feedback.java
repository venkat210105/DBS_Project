package com.dbs.feedback.model;

import jakarta.persistence.*;
import java.sql.Timestamp;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(nullable = false)
    private int rating;

    @Column(length = 255, nullable = false)
    private String comment;

    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    // Constructors
    public Feedback() {}

    public Feedback(String userName, String userEmail, Long productId, int rating, String comment, String customerName) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.productId = productId;
        this.rating = rating;
        this.comment = comment;
        this.customerName = customerName;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public Timestamp getCreatedAt() { return createdAt; }
    public Timestamp getUpdatedAt() { return updatedAt; }

    
}
