package com.dbs.feedback.service;

import com.dbs.feedback.model.Feedback;
import com.dbs.feedback.repository.FeedbackRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class FeedbackServiceTest {

    @Mock
    private FeedbackRepository feedbackRepository;

    @InjectMocks
    private FeedbackService feedbackService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveFeedback() {
        Feedback feedback = new Feedback("Alice", "Great!", 5);

        when(feedbackRepository.save(feedback)).thenReturn(feedback);

        Feedback saved = feedbackService.saveFeedback(feedback);

        assertEquals("Alice", saved.getCustomerName());
        assertEquals("Great!", saved.getComment());
        assertEquals(5, saved.getRating());

        verify(feedbackRepository, times(1)).save(feedback);
    }

    @Test
    void testGetAllFeedback() {
        Feedback f1 = new Feedback("Bob", "Good", 4);
        Feedback f2 = new Feedback("Carol", "Average", 3);

        when(feedbackRepository.findAll()).thenReturn(Arrays.asList(f1, f2));

        List<Feedback> allFeedback = feedbackService.getAllFeedback();

        assertEquals(2, allFeedback.size());
        assertEquals("Bob", allFeedback.get(0).getCustomerName());
        assertEquals("Carol", allFeedback.get(1).getCustomerName());

        verify(feedbackRepository, times(1)).findAll();
    }
}
