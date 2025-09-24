package com.dbs.feedback.repository;

import com.dbs.feedback.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    // Spring Data JPA automatically provides CRUD methods
}
