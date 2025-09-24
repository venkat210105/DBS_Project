package com.dbs.feedback.model;
import org.junit.jupiter.api.Test;



import static org.junit.jupiter.api.Assertions.*;

class FeedbackTest {

    @Test
    void testFeedbackCreation() {
        Feedback feedback = new Feedback("Alice", "Great!", 5);

        assertEquals("Alice", feedback.getCustomerName());
        assertEquals("Great!", feedback.getComment());
        assertEquals(5, feedback.getRating());
        if(feedback.getRating() < 1 || feedback.getRating() > 5) {
            fail("Rating should be between 1 and 5");
        }
    }
}
