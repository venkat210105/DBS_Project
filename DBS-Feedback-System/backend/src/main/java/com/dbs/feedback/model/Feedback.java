package com.dbs.feedback.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Entity
public class Feedback {

     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Customer name cannot be empty")
    private String customerName;

    @NotBlank(message = "Comment cannot be empty")
    private String comment;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private int rating;
   
    // Constructors
    public Feedback() {}
    public Feedback(String customerName, String comment, int rating) {
        this.customerName = customerName;
        this.comment = comment;
        this.rating = rating;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
}
