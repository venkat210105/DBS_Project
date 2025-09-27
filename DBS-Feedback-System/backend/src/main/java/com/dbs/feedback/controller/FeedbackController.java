package com.dbs.feedback.controller;

import com.dbs.feedback.model.Feedback;
import com.dbs.feedback.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"}, 
             allowCredentials = "true",
             maxAge = 3600)
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/submit")
    public Feedback submitFeedback(@Valid @RequestBody Feedback feedback) {
        return feedbackService.saveFeedback(feedback);
    }

    @PostMapping("/submit-fast")
    public Feedback submitFeedbackFast(@Valid @RequestBody Feedback feedback) {
        return feedbackService.saveFeedbackWithTimeoutControl(feedback);
    }

    @GetMapping("/ml-status")
    public Map<String, Object> getMLServiceStatus() {
        Map<String, Object> status = new HashMap<>();
        boolean available = feedbackService.isMLServiceAvailable();
        status.put("mlServiceAvailable", available);
        status.put("message", available ? "ML service is running" : "ML service is not available");
        return status;
    }

    @GetMapping("/all")
    public List<Feedback> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }

    @DeleteMapping("/{id}")
    public String deleteFeedback(@PathVariable Long id) {
        boolean deleted = feedbackService.deleteFeedbackById(id);
        return deleted ? "Deleted successfully" : "Feedback not found";
    }

    @PutMapping("/{id}")
    public Feedback updateFeedback(@PathVariable Long id, @RequestBody Feedback feedback) {
        return feedbackService.updateFeedback(id, feedback);
    }

}
