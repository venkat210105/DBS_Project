package com.dbs.feedback.controller;

import com.dbs.feedback.model.Feedback;
import com.dbs.feedback.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(
    origins = {"http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"},
    allowCredentials = "true",
    maxAge = 3600
)
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Submit feedback with sentiment analysis
    @PostMapping("/submit")
    public Feedback submitFeedback(@Valid @RequestBody Feedback feedback) {
        return feedbackService.saveFeedback(feedback);
    }

    // Get all feedbacks including sentiment
    @GetMapping("/all")
    public List<Feedback> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }

    // Delete feedback
    @DeleteMapping("/{id}")
    public String deleteFeedback(@PathVariable Long id) {
        boolean deleted = feedbackService.deleteFeedbackById(id);
        return deleted ? "Deleted successfully" : "Feedback not found";
    }

    // Update feedback and re-analyze sentiment if comment changes
    @PutMapping("/{id}")
    public Feedback updateFeedback(@PathVariable Long id, @RequestBody Feedback feedback) {
        return feedbackService.updateFeedback(id, feedback);
    }
}
