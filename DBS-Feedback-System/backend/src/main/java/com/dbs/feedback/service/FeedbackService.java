package com.dbs.feedback.service;

import com.dbs.feedback.model.Feedback;
import com.dbs.feedback.repository.FeedbackRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository repository;

    public FeedbackService(FeedbackRepository repository) {
        this.repository = repository;
    }

    public Feedback saveFeedback(Feedback feedback) {
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

        return repository.save(existing);
    }

    public boolean deleteFeedbackById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
