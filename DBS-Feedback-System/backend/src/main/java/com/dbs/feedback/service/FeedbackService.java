package com.dbs.feedback.service;

import com.dbs.feedback.model.Feedback;
import com.dbs.feedback.repository.FeedbackRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FeedbackService {

    private final FeedbackRepository repository;
    private final RestTemplate restTemplate;

    private final String ML_URL = "http://localhost:5000/analyze";

    public FeedbackService(FeedbackRepository repository) {
        this.repository = repository;
        this.restTemplate = new RestTemplate();
    }

    // Save feedback with sentiment analysis
    public Feedback saveFeedback(Feedback feedback) {
        analyzeAndSetSentiment(feedback);
        return repository.save(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return repository.findAll();
    }

    public Feedback updateFeedback(Long id, Feedback updated) {
        Feedback existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));

        existing.setCustomerName(updated.getCustomerName());
        existing.setComment(updated.getComment());
        existing.setRating(updated.getRating());
        existing.setUserName(updated.getUserName());
        existing.setUserEmail(updated.getUserEmail());
        existing.setProductId(updated.getProductId());

        // Re-analyze sentiment if comment is updated
        if (updated.getComment() != null && !updated.getComment().isEmpty()) {
            analyzeAndSetSentiment(existing);
        }

        return repository.save(existing);
    }

    public boolean deleteFeedbackById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    // Call ML service and set sentiment
    private void analyzeAndSetSentiment(Feedback feedback) {
        try {
            Map<String, String> request = new HashMap<>();
            request.put("text", feedback.getComment());

            Map<String, Object> response = restTemplate.postForObject(ML_URL, request, Map.class);
            if (response != null) {
                feedback.setSentimentLabel((String) response.get("label"));
                feedback.setSentimentScore(Double.valueOf(response.get("score").toString()));
            }
        } catch (Exception e) {
            System.out.println("Sentiment analysis failed: " + e.getMessage());
            feedback.setSentimentLabel("UNKNOWN");
            feedback.setSentimentScore(0.0);
        }
    }
}
